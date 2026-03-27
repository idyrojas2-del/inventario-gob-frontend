import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DepartmentDetails({ deptName }) {
  // Configured dummy data responsive to the selected department
  const isRedes = deptName === 'Redes';
  const isSoporte = deptName === 'Soporte Técnico';
  const isDev = deptName === 'Desarrollo';

  const funcionales = isRedes ? 130 : isSoporte ? 55 : isDev ? 110 : 65;
  const enReparacion = isRedes ? 25 : isSoporte ? 18 : isDev ? 12 : 15;
  const danados = isRedes ? 11 : isSoporte ? 12 : isDev ? 5 : 7;
  const total = funcionales + enReparacion + danados;

  const pcPercent = Math.floor(funcionales * 0.45);
  const laptopPercent = Math.floor(funcionales * 0.35);
  const othersPercent = funcionales - pcPercent - laptopPercent;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Estadísticas - {deptName}</Text>
      
      {/* Sub-Stats Row */}
      <View style={styles.statsRow}>
        <DetailStat label="Operativos" value={funcionales} color="#10b981" />
        <DetailStat label="En Reparación" value={enReparacion} color="#f59e0b" />
        <DetailStat label="Inoperativos" value={danados} color="#E12F40" />
      </View>

      {/* Distribution "Graph" */}
      <View style={styles.graphCard}>
        <Text style={styles.graphTitle}>Distribución de Hardware Operativo ({funcionales} total en {deptName})</Text>
        
        <View style={styles.barContainer}>
          <View style={[styles.barSegment, { flex: pcPercent, backgroundColor: '#002750' }]} />
          <View style={[styles.barSegment, { flex: laptopPercent, backgroundColor: '#3b82f6' }]} />
          <View style={[styles.barSegment, { flex: othersPercent, backgroundColor: '#94a3b8' }]} />
        </View>
        
        <View style={styles.legendRow}>
          <LegendItem color="#002750" label={`PCs Escritorio (${pcPercent})`} />
          <LegendItem color="#3b82f6" label={`Laptops (${laptopPercent})`} />
          <LegendItem color="#94a3b8" label={`Periféricos (${othersPercent})`} />
        </View>
      </View>
    </View>
  );
}

const DetailStat = ({ label, value, color }) => (
  <View style={styles.detailCard}>
    <Text style={[styles.detailValue, { color }]}>{value}</Text>
    <Text style={styles.detailLabel}>{label}</Text>
  </View>
);

const LegendItem = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f8fafc', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderTopWidth: 0, 
    borderBottomLeftRadius: 14, 
    borderBottomRightRadius: 14,
    marginBottom: 15, 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15 },
  statsRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 25, justifyContent: 'space-between' },
  detailCard: { flexGrow: 1, minWidth: 90, width: '30%', backgroundColor: 'white', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  detailValue: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  detailLabel: { fontSize: 13, color: '#64748b', fontWeight: '600', textAlign: 'center' },
  
  graphCard: { backgroundColor: 'white', padding: 25, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  graphTitle: { fontSize: 15, fontWeight: 'bold', color: '#334155', marginBottom: 20 },
  barContainer: { height: 25, borderRadius: 12, flexDirection: 'row', overflow: 'hidden', marginBottom: 20 },
  barSegment: { height: '100%' },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 13, color: '#64748b', fontWeight: '500' }
});
