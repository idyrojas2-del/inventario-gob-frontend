import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import NewEquipmentModal from './NewEquipmentModal';
import ExportPDFModal from './ExportPDFModal';
import { showAlert, showConfirm } from '../utils/Alerts';

// Data exclusiva del departamento de Soporte Técnico
const EQUIPOS_DATA_SOPORTE = [
  { id: 'HW-008', tipo: 'PC Escritorio', marca: 'HP ProDesk 400 G7', serial: 'HPQ-6624-PD', depto: 'Soporte Técnico', responsable: 'Juan Martínez', estado: 'En Reparación', fecha: '2024-02-10' },
  { id: 'HW-015', tipo: 'Laptop', marca: 'Lenovo ThinkPad X1', serial: 'LNV-8888-XX', depto: 'Soporte Técnico', responsable: 'Carlos Gómez', estado: 'Operativo', fecha: '2024-02-28' },
  { id: 'HW-016', tipo: 'Monitor', marca: 'Dell UltraSharp 27"', serial: 'DLL-7777-US', depto: 'Soporte Técnico', responsable: 'Juan Martínez', estado: 'Operativo', fecha: '2024-03-05' },
];

const NEXT_SORT = { none: 'asc', asc: 'desc', desc: 'none' };

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

const TABLE_MIN_WIDTH = COLUMNS.reduce((sum, c) => sum + c.minWidth, 0) + 40;

export default function InventarioSoporteTable() {
  const [equipos, setEquipos] = useState(EQUIPOS_DATA_SOPORTE);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });

  const handleExportar = (periodo) => {
    showAlert('Reporte PDF', `Generando reporte PDF de Soporte Técnico para: ${periodo}`, 'info');
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
    const nextNum = equipos.length + 200;
    const newId = `HW-${String(nextNum).padStart(3, '0')}`;
    const newEquipo = {
      id: newId,
      tipo: formData.tipo,
      marca: formData.marca,
      serial: formData.serial,
      depto: 'Soporte Técnico', // Forzamos el modulo
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

      <View style={styles.tableCard}>

        <View style={styles.headerRow1}>
          <Text style={styles.title}>💻 Inventario de Soporte Técnico</Text>
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

        <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.horizontalScroll} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ minWidth: TABLE_MIN_WIDTH, width: '100%' }}>

            <View style={styles.tableHeader}>
              {COLUMNS.map((col) => {
                const isActive = sortConfig.key === col.key && sortConfig.direction !== 'none';
                if (col.sortable) {
                  return (
                    <TouchableOpacity
                      key={col.key}
                      style={[styles.colHeaderBtn, { minWidth: col.minWidth, flex: 1 }, isActive && styles.colHeaderBtnActive]}
                      onPress={() => handleSort(col.key)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.colHeaderText, isActive && styles.colHeaderTextActive]} numberOfLines={1}>{col.label}</Text>
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
        fixedDepto="Soporte Técnico"
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
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { flexGrow: 1, minWidth: 140, width: '23%', backgroundColor: 'white', borderRadius: 10, padding: 18, borderLeftWidth: 4, borderWidth: 1, borderColor: '#e2e8f0' },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: '#002750', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: '600' },
  tableCard: { backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
  headerRow1: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingBottom: 10, gap: 12, flexWrap: 'wrap' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', flexShrink: 0 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e2e8f0', flex: 1, minWidth: 150, height: 40 },
  lupaIcon: { fontSize: 18, color: '#94a3b8', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#334155', outlineStyle: 'none' },
  headerRow2: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 15, flexWrap: 'wrap', gap: 10, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  headerRow2Left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerRow2Right: { flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  resultCountText: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  clearSortBtn: { paddingHorizontal: 12, paddingVertical: 7, backgroundColor: '#fee2e2', borderRadius: 6 },
  clearSortText: { fontSize: 12, color: '#991b1b', fontWeight: '600' },
  exportBtn: { backgroundColor: '#002750', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  exportBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  addBtn: { backgroundColor: '#E12F40', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  addBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  horizontalScroll: { flex: 1 },
  tableHeader: { flexDirection: 'row', paddingHorizontal: 20, backgroundColor: '#f8fafc', borderBottomWidth: 2, borderBottomColor: '#e2e8f0' },
  colHeaderBtn: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingVertical: 12, paddingRight: 8, borderBottomWidth: 3, borderBottomColor: 'transparent', cursor: 'pointer' },
  colHeaderBtnActive: { borderBottomColor: '#002750', backgroundColor: '#eff6ff' },
  colHeaderStatic: { paddingVertical: 12, paddingRight: 8, justifyContent: 'center' },
  colHeaderText: { fontWeight: '700', color: '#94a3b8', fontSize: 11, textTransform: 'uppercase', userSelect: 'none' },
  colHeaderTextActive: { color: '#002750' },
  sortIndicator: { alignItems: 'center', justifyContent: 'center', marginLeft: 2 },
  sortArrow: { fontSize: 7, color: '#cbd5e1', lineHeight: 9 },
  sortArrowActive: { color: '#002750', fontSize: 9 },
  tableBody: { maxHeight: 500 },
  row: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  cell: { fontSize: 13, color: '#334155', paddingRight: 8, flex: 1 },
  cellId: { fontWeight: 'bold', color: '#002750' },
  cellSerial: { fontFamily: 'monospace', fontSize: 12, color: '#64748b' },
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  actionsCell: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  btnEdit: { color: '#002750', fontSize: 18, fontWeight: 'bold' },
  btnDelete: { color: '#E12F40', fontSize: 18, fontWeight: 'bold' },
  emptyState: { padding: 60, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 18 },
  emptyBtn: { backgroundColor: '#002750', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  emptyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
});
