import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import ExportPDFModal from './ExportPDFModal';
import { showAlert, showConfirm } from '../utils/Alerts';

const HISTORIAL_DATA = [
  { id: 'LOG-1028', fecha: '2026-03-25 10:45 AM', depto: 'Soporte Técnico', accion: 'Modificación', descripcion: 'Cambio de estado a "Esperando Repuestos" en HW-003', usuario: 'Naidy Rojas' },
  { id: 'LOG-1027', fecha: '2026-03-25 09:12 AM', depto: 'Administración', accion: 'Alta', descripcion: 'Registro de nueva Impresora HP M404 (HW-011)', usuario: 'Luis Pérez' },
  { id: 'LOG-1026', fecha: '2026-03-24 04:30 PM', depto: 'Redes', accion: 'Baja', descripcion: 'Desincorporación de Switch Cisco obsoleto (HW-002)', usuario: 'Pedro Rojas' },
  { id: 'LOG-1025', fecha: '2026-03-24 11:15 AM', depto: 'Desarrollo', accion: 'Alta', descripcion: 'Asignación de Monitor LG 24" a María Silva (HW-004)', usuario: 'Naidy Rojas' },
  { id: 'LOG-1024', fecha: '2026-03-23 02:40 PM', depto: 'Redes', accion: 'Modificación', descripcion: 'Reporte de daño en UPS APC 1500 (HW-006)', usuario: 'Gabriela Torres' },
  { id: 'LOG-1023', fecha: '2026-03-22 08:00 AM', depto: 'Sistema', accion: 'Notificación', descripcion: 'Cierre general de auditoría semanal completado', usuario: 'Sistema Automático' },
  { id: 'LOG-1022', fecha: '2026-03-21 03:55 PM', depto: 'Soporte Técnico', accion: 'Modificación', descripcion: 'Reparación de PC escritorio HP ProDesk finalizada (HW-008)', usuario: 'Juan Martínez' },
];

const NEXT_SORT = { none: 'asc', asc: 'desc', desc: 'none' };

const COLUMNS = [
  { key: 'id',           label: 'ID LOG',          minWidth: 90,  sortable: true },
  { key: 'fecha',        label: 'FECHA Y HORA',    minWidth: 150, sortable: true },
  { key: 'depto',        label: 'DEPARTAMENTO',    minWidth: 130, sortable: true },
  { key: 'accion',       label: 'ACCIÓN',          minWidth: 120, sortable: true },
  { key: 'descripcion',  label: 'DESCRIPCIÓN DE EVENTO', minWidth: 280, sortable: true },
  { key: 'usuario',      label: 'USUARIO',         minWidth: 140, sortable: true },
];

const TABLE_MIN_WIDTH = COLUMNS.reduce((sum, c) => sum + c.minWidth, 0) + 40;

export default function HistorialTable() {
  const [logs, setLogs] = useState(HISTORIAL_DATA);
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);

  const handleExportPDF = (periodo) => {
    showAlert('Reporte PDF', `Generando reporte PDF de Auditoría Semanal para: ${periodo}\nEl documento incluirá métricas de altas, bajas y modificaciones.`, 'info');
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
    return logs.filter((log) => {
      const q = searchText.toLowerCase();
      return (
        log.id.toLowerCase().includes(q) ||
        log.fecha.toLowerCase().includes(q) ||
        log.depto.toLowerCase().includes(q) ||
        log.accion.toLowerCase().includes(q) ||
        log.descripcion.toLowerCase().includes(q) ||
        log.usuario.toLowerCase().includes(q)
      );
    });
  }, [logs, searchText]);

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
    total: logs.length,
    altas: logs.filter(l => l.accion === 'Alta').length,
    mods: logs.filter(l => l.accion === 'Modificación').length,
    bajas: logs.filter(l => l.accion === 'Baja').length,
  };

  const clearSort = () => {
    setSortConfig({ key: null, direction: 'none' });
    setSearchText('');
  };

  const getBadgeStyle = (accion) => {
    switch (accion) {
      case 'Alta': return { bg: '#dcfce7', text: '#166534' }; // Verde vibrante
      case 'Modificación': return { bg: '#e0f2fe', text: '#0369a1' }; // Azul cielo/oscuro
      case 'Baja': return { bg: '#fee2e2', text: '#991b1b' }; // Rojo
      case 'Notificación': return { bg: '#f3f4f6', text: '#4b5563' }; // Gris
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

      {/* Tarjetas de Estadísticas (Específicas del Historial) */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: '#002750' }]}>
          <Text style={styles.statNumber}>{conteo.total}</Text>
          <Text style={styles.statLabel}>Registros Capturados</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#10b981' }]}>
          <Text style={[styles.statNumber, { color: '#10b981' }]}>{conteo.altas}</Text>
          <Text style={styles.statLabel}>Equipos Nuevos (Altas)</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#0ea5e9' }]}>
          <Text style={[styles.statNumber, { color: '#0ea5e9' }]}>{conteo.mods}</Text>
          <Text style={styles.statLabel}>Modificaciones Recientes</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: '#ef4444' }]}>
          <Text style={[styles.statNumber, { color: '#ef4444' }]}>{conteo.bajas}</Text>
          <Text style={styles.statLabel}>Desincorporaciones (Bajas)</Text>
        </View>
      </View>

      {/* Cuerpo Transaccional de Historial */}
      <View style={styles.tableCard}>

        <View style={styles.headerRow1}>
          <Text style={styles.title}>📋 Bitácora en Tiempo Real</Text>
          <View style={styles.searchBox}>
            <Text style={styles.lupaIcon}>⌕</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por ID, departamento, acción, descripción..."
              placeholderTextColor="#94a3b8"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <View style={styles.headerRow2}>
          <View style={styles.headerRow2Left}>
            <Text style={styles.resultCountText}>{sortedData.length} evento(s) encontrado(s)</Text>
            {hasSortActive && (
              <TouchableOpacity style={styles.clearSortBtn} onPress={clearSort}>
                <Text style={styles.clearSortText}>✕ Limpiar orden</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.headerRow2Right}>
             {/* Animación intermitente visual sencilla a futuro para "Live Server" */}
            <View style={styles.liveIndicator}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>Monitoreo Activo</Text>
            </View>
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
                return (
                  <TouchableOpacity
                    key={col.key}
                    style={[
                      styles.colHeaderBtn,
                      { minWidth: col.minWidth, flex: col.key === 'descripcion' ? 2 : 1 },
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
              })}
            </View>

            <ScrollView style={styles.tableBody} nestedScrollEnabled={true}>
              {sortedData.length > 0 ? (
                sortedData.map((log) => {
                  const badgeColors = getBadgeStyle(log.accion);
                  return (
                    <View key={log.id} style={styles.row}>
                      <Text style={[styles.cell, styles.cellId, { minWidth: 90 }]} numberOfLines={1}>{log.id}</Text>
                      <Text style={[styles.cell, styles.cellDate, { minWidth: 150, flex: 1 }]} numberOfLines={1}>{log.fecha}</Text>
                      <Text style={[styles.cell, { minWidth: 130, flex: 1 }]} numberOfLines={1}>{log.depto}</Text>
                      <View style={{ minWidth: 120, flex: 1 }}>
                        <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
                          <Text style={[styles.badgeText, { color: badgeColors.text }]} numberOfLines={1}>{log.accion}</Text>
                        </View>
                      </View>
                      <Text style={[styles.cell, { minWidth: 280, flex: 2 }]} numberOfLines={2}>{log.descripcion}</Text>
                      <Text style={[styles.cell, styles.cellUser, { minWidth: 140, flex: 1 }]} numberOfLines={1}>{log.usuario}</Text>
                    </View>
                  );
                })
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text style={styles.emptyTitle}>Sin eventos registrados</Text>
                  <Text style={styles.emptySubtitle}>No se encontraron movimientos en la bitácora bajo el criterio de búsqueda actual.</Text>
                  <TouchableOpacity onPress={clearSort} style={styles.emptyBtn}>
                    <Text style={styles.emptyBtnText}>Limpiar vista</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

          </View>
        </ScrollView>

      </View>

      <ExportPDFModal
        visible={isExportModalVisible}
        onClose={() => setIsExportModalVisible(false)}
        onExport={handleExportPDF}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 30 },
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
  statLabel: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: '700' },
  tableCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    gap: 6
  },
  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#22c55e',
    borderRadius: 4,
  },
  liveText: {
    fontSize: 12,
    color: '#166534',
    fontWeight: 'bold'
  },
  horizontalScroll: {
    flex: 1,
  },
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
  tableBody: {
    maxHeight: 500,
  },
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
  cellDate: { color: '#64748b', fontSize: 12 },
  cellUser: { fontWeight: '600', color: '#475569' },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  emptyState: { padding: 60, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 18 },
  emptyBtn: { backgroundColor: '#002750', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  emptyBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
});
