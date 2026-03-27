import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import NewEquipmentModal from './NewEquipmentModal';
import ExportPDFModal from './ExportPDFModal';
import { showAlert, showConfirm } from '../utils/Alerts';

// Data exclusiva del departamento de Desarrollo
const EQUIPOS_DATA_DESARROLLO = [
  { id: 'HW-004', tipo: 'Monitor', marca: 'Samsung 24" LF24T35', serial: 'SSG-5501-MN', depto: 'Desarrollo', responsable: 'María Silva', estado: 'Operativo', fecha: '2024-06-01' },
  { id: 'HW-011', tipo: 'PC Escritorio', marca: 'Dell OptiPlex 7090', serial: 'DLL-9921-XD', depto: 'Desarrollo', responsable: 'Jorge Pérez', estado: 'Operativo', fecha: '2023-11-15' },
  { id: 'HW-012', tipo: 'Laptop', marca: 'MacBook Pro M2', serial: 'MAC-3301-PR', depto: 'Desarrollo', responsable: 'Luisa Fernanda', estado: 'En Reparación', fecha: '2024-01-10' },
  { id: 'HW-013', tipo: 'Monitor', marca: 'LG Ultrawide 29"', serial: 'LLG-7822-UW', depto: 'Desarrollo', responsable: 'Jorge Pérez', estado: 'Operativo', fecha: '2023-11-20' },
  { id: 'HW-014', tipo: 'Servidor', marca: 'Local Dev Server HP', serial: 'HPQ-1002-LD', depto: 'Desarrollo', responsable: 'María Silva', estado: 'Dañado', fecha: '2022-08-05' },
];

const NEXT_SORT = { none: 'asc', asc: 'desc', desc: 'none' };

// Minimum width per column to prevent overlap
const COLUMNS = [
  { key: 'id',           label: 'ID',              minWidth: 80,  sortable: true },
  { key: 'tipo',         label: 'Tipo',            minWidth: 110, sortable: true },
  { key: 'marca',        label: 'Marca / Modelo',  minWidth: 170, sortable: true },
  { key: 'serial',       label: 'Serial',          minWidth: 120, sortable: true },
  { key: 'depto',        label: 'Departamento',    minWidth: 130, sortable: true },
  { key: 'responsable',  label: 'Responsable',     minWidth: 130, sortable: true },
  { key: 'estado',       label: 'Estado',          minWidth: 100, sortable: true },
  { key: 'acciones',     label: 'Acciones',        minWidth: 90,  sortable: false, alignRight: true },
];

// Total min width for horizontal scroll trigger
const TABLE_MIN_WIDTH = COLUMNS.reduce((sum, c) => sum + c.minWidth, 0) + 40; // +40 for padding

export default function DesarrolloTable() {
  const [equipos, setEquipos] = useState(EQUIPOS_DATA_DESARROLLO);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const handleExportar = (periodo) => {
    showAlert('Reporte PDF', `Generando reporte PDF de Desarrollo para: ${periodo}`, 'info');
  };

  const handleSort = (columnKey) => {
    setSortConfig(prev => {
      if (prev.key === columnKey) {
        const nextDir = NEXT_SORT[prev.direction];
        return nextDir === 'none' ? { key: null, direction: 'none' } : { key: columnKey, direction: nextDir };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const filtered = useMemo(() => {
    return equipos.filter((eq) => {
      const q = searchText.toLowerCase();
      return (
        eq.id.toLowerCase().includes(q) ||
        eq.tipo.toLowerCase().includes(q) ||
        eq.marca.toLowerCase().includes(q) ||
        eq.serial.toLowerCase().includes(q) ||
        eq.depto.toLowerCase().includes(q) ||
        eq.responsable.toLowerCase().includes(q) ||
        eq.estado.toLowerCase().includes(q)
      );
    });
  }, [equipos, searchText]);

  const sortedData = useMemo(() => {
    if (sortConfig.key === null || sortConfig.direction === 'none') return filtered;
    const sorted = [...filtered].sort((a, b) => {
      const valA = (a[sortConfig.key] || '').toLowerCase();
      const valB = (b[sortConfig.key] || '').toLowerCase();
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filtered, sortConfig]);

  const conteo = {
    total: equipos.length,
    operativo: equipos.filter(e => e.estado === 'Operativo').length,
    reparacion: equipos.filter(e => e.estado === 'En Reparación').length,
    danado: equipos.filter(e => e.estado === 'Dañado').length,
  };

  const handleAddEquipo = (formData) => {
    // Al anexar un equipo desde el modulo Desarrollo, forzamos que el departamento sea "Desarrollo"
    const nextNum = equipos.length + 100; // Offset id for visual distinction in demo
    const newId = `HW-${String(nextNum).padStart(3, '0')}`;
    const newEquipo = {
      id: newId,
      tipo: formData.tipo,
      marca: formData.marca,
      serial: formData.serial,
      depto: 'Desarrollo', // Forzamos el modulo
      responsable: formData.responsable,
      estado: formData.estado,
      fecha: new Date().toISOString().slice(0, 10),
    };
    setEquipos(prev => [newEquipo, ...prev]);
  };

  const clearSort = () => {
    setSortConfig({ key: null, direction: 'none' });
    setSearchText('');
  };

  const getBadgeStyle = (estado) => {
    switch (estado) {
      case 'Operativo': return { bg: '#dcfce7', text: '#166534' };
      case 'En Reparación': return { bg: '#fef3c7', text: '#92400e' };
      case 'Dañado': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const SortIndicator = ({ columnKey }) => {
    const isActive = sortConfig.key === columnKey;
    const dir = isActive ? sortConfig.direction : 'none';
    return (
      <View style={styles.sortIndicator}>
        <Text style={[styles.sortArrow, dir === 'asc' && styles.sortArrowActive]}>▲</Text>
        <Text style={[styles.sortArrow, dir === 'desc' && styles.sortArrowActive]}>▼</Text>
      </View>
    );
  };

  const hasSortActive = sortConfig.key !== null && sortConfig.direction !== 'none';

  return (
    <View style={styles.container}>

      {/* STAT CARDS ROW */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: '#002750' }]}>
          <Text style={styles.statNumber}>{conteo.total}</Text>
          <Text style={styles.statLabel}>Equipos Totales</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#10b981' }]}>
          <Text style={[styles.statNumber, { color: '#10b981' }]}>{conteo.operativo}</Text>
          <Text style={styles.statLabel}>Operativos</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#f59e0b' }]}>
          <Text style={[styles.statNumber, { color: '#f59e0b' }]}>{conteo.reparacion}</Text>
          <Text style={styles.statLabel}>En Reparación</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#ef4444' }]}>
          <Text style={[styles.statNumber, { color: '#ef4444' }]}>{conteo.danado}</Text>
          <Text style={styles.statLabel}>Dañados</Text>
        </View>
      </View>

      {/* TABLE CARD */}
      <View style={styles.tableCard}>

        {/* ROW 1: Title + Search */}
        <View style={styles.headerRow1}>
          <Text style={styles.title}>💻 Inventario de Desarrollo</Text>
          <View style={styles.searchBox}>
            <Text style={styles.lupaIcon}>⌕</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por ID, marca, serial, responsable..."
              placeholderTextColor="#94a3b8"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* ROW 2: Action buttons + Result count */}
        <View style={styles.headerRow2}>
          <View style={styles.headerRow2Left}>
            <Text style={styles.resultCountText}>{sortedData.length} resultado(s)</Text>
            {hasSortActive && (
              <TouchableOpacity style={styles.clearSortBtn} onPress={clearSort}>
                <Text style={styles.clearSortText}>✕ Limpiar orden</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.headerRow2Right}>
            <TouchableOpacity style={styles.addBtn} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.addBtnText}>➕ Anexar Equipo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exportBtn} onPress={() => setIsExportModalVisible(true)}>
              <Text style={styles.exportBtnText}>📄 Exportar PDF</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SCROLLABLE TABLE AREA with minWidth to prevent column overlap */}
        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.horizontalScroll} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ minWidth: TABLE_MIN_WIDTH, width: '100%' }}>

            {/* INTERACTIVE TABLE HEADER */}
            <View style={styles.tableHeader}>
              {COLUMNS.map((col) => {
                const isActive = sortConfig.key === col.key && sortConfig.direction !== 'none';
                if (col.sortable) {
                  return (
                    <TouchableOpacity
                      key={col.key}
                      style={[
                        styles.colHeaderBtn,
                        { minWidth: col.minWidth, flex: 1 },
                        isActive && styles.colHeaderBtnActive,
                      ]}
                      onPress={() => handleSort(col.key)}
                      activeOpacity={0.7}
                    >
                      <Text style={[
                        styles.colHeaderText,
                        isActive && styles.colHeaderTextActive,
                      ]} numberOfLines={1}>
                        {col.label}
                      </Text>
                      <SortIndicator columnKey={col.key} />
                    </TouchableOpacity>
                  );
                }
                return (
                  <View key={col.key} style={[styles.colHeaderStatic, { minWidth: col.minWidth, flex: 1 }]}>
                    <Text style={[styles.colHeaderText, { textAlign: 'right' }]} numberOfLines={1}>{col.label}</Text>
                  </View>
                );
              })}
            </View>

            {/* TABLE ROWS — internal scroll with maxHeight */}
            <ScrollView style={styles.tableBody} nestedScrollEnabled={true}>
              {sortedData.length > 0 ? (
                sortedData.map((eq) => {
                  const badgeColors = getBadgeStyle(eq.estado);
                  return (
                    <View key={eq.id} style={styles.row}>
                      <Text style={[styles.cell, styles.cellId, { minWidth: 80 }]} numberOfLines={1}>{eq.id}</Text>
                      <Text style={[styles.cell, { minWidth: 110, flex: 1 }]} numberOfLines={1}>{eq.tipo}</Text>
                      <Text style={[styles.cell, { minWidth: 170, flex: 1 }]} numberOfLines={1}>{eq.marca}</Text>
                      <Text style={[styles.cell, styles.cellSerial, { minWidth: 120, flex: 1 }]} numberOfLines={1}>{eq.serial}</Text>
                      <Text style={[styles.cell, { minWidth: 130, flex: 1 }]} numberOfLines={1}>{eq.depto}</Text>
                      <Text style={[styles.cell, { minWidth: 130, flex: 1 }]} numberOfLines={1}>{eq.responsable}</Text>
                      <View style={{ minWidth: 100, flex: 1 }}>
                        <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
                          <Text style={[styles.badgeText, { color: badgeColors.text }]} numberOfLines={1}>{eq.estado}</Text>
                        </View>
                      </View>
                      <View style={[styles.actionsCell, { minWidth: 90 }]}>
                        <TouchableOpacity onPress={() => showAlert('Editar', '📝 Editando ' + eq.id, 'info')}>
                          <Text style={styles.btnEdit}>✎</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showConfirm('Eliminar', '¿Estás seguro de que deseas eliminar este elemento?', () => showAlert('Eliminado', '🗑 Eliminando ' + eq.id, 'success'))}>
                          <Text style={styles.btnDelete}>🗑</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text style={styles.emptyTitle}>Sin resultados</Text>
                  <Text style={styles.emptySubtitle}>No se encontraron equipos con los criterios actuales.</Text>
                  <TouchableOpacity onPress={clearSort} style={styles.emptyBtn}>
                    <Text style={styles.emptyBtnText}>Limpiar búsqueda</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

          </View>
        </ScrollView>

      </View>

      <NewEquipmentModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddEquipo}
        customEstados={['Operativo', 'En Reparación', 'Esperando Repuestos', 'Dañado']}
        fixedDepto="Desarrollo"
      />
      <ExportPDFModal
        visible={isExportModalVisible}
        onClose={() => setIsExportModalVisible(false)}
        onExport={handleExportar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 30 },

  // Stat cards
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: {
    flexGrow: 1,
    minWidth: 140,
    width: '23%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 18,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: '#002750', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: '600' },

  // Table card
  tableCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },

  // Header Row 1: Title + Search
  headerRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 10,
    gap: 12,
    flexWrap: 'wrap',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', flexShrink: 0 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flex: 1,
    minWidth: 150,
    height: 40,
  },
  lupaIcon: { fontSize: 18, color: '#94a3b8', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#334155', outlineStyle: 'none' },

  // Header Row 2: Buttons + Count
  headerRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexWrap: 'wrap',
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerRow2Left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerRow2Right: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  resultCountText: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  clearSortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#fee2e2',
    borderRadius: 6,
  },
  clearSortText: { fontSize: 12, color: '#991b1b', fontWeight: '600' },
  exportBtn: {
    backgroundColor: '#002750',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  exportBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  addBtn: {
    backgroundColor: '#E12F40',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },

  // Horizontal scroll wrapper
  horizontalScroll: {
    flex: 1,
  },

  // Interactive Table Header
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
  },
  colHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 12,
    paddingRight: 8,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    cursor: 'pointer',
  },
  colHeaderBtnActive: {
    borderBottomColor: '#002750',
    backgroundColor: '#eff6ff',
  },
  colHeaderStatic: {
    paddingVertical: 12,
    paddingRight: 8,
    justifyContent: 'center',
  },
  colHeaderText: {
    fontWeight: '700',
    color: '#94a3b8',
    fontSize: 11,
    textTransform: 'uppercase',
    userSelect: 'none',
  },
  colHeaderTextActive: {
    color: '#002750',
  },

  // Sort arrows
  sortIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  sortArrow: {
    fontSize: 7,
    color: '#cbd5e1',
    lineHeight: 9,
  },
  sortArrowActive: {
    color: '#002750',
    fontSize: 9,
  },

  // Table body with max height for internal scroll
  tableBody: {
    maxHeight: 500,
  },

  // Table rows
  row: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    alignItems: 'center',
  },
  cell: { fontSize: 13, color: '#334155', paddingRight: 8, flex: 1 },
  cellId: { fontWeight: 'bold', color: '#002750' },
  cellSerial: { fontFamily: 'monospace', fontSize: 12, color: '#64748b' },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  actionsCell: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  btnEdit: { color: '#002750', fontSize: 18, fontWeight: 'bold' },
  btnDelete: { color: '#E12F40', fontSize: 18, fontWeight: 'bold' },

  // Empty state
  emptyState: { padding: 60, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 18 },
  emptyBtn: { backgroundColor: '#002750', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  emptyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
});
