import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UnifiedStatPanel() {
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.row}>
        <View style={[styles.quadrant, styles.borderRight]}>
          <View style={[styles.iconBox, { backgroundColor: '#e0f2fe' }]}>
            <Text style={styles.icon}>💻</Text>
          </View>
          <View style={styles.textStack}>
            <Text style={styles.valueText}>1,248</Text>
            <Text style={styles.labelText}>Equipos Totales</Text>
          </View>
        </View>
        <View style={styles.quadrant}>
          <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
            <Text style={styles.icon}>✅</Text>
          </View>
          <View style={styles.textStack}>
            <Text style={styles.valueText}>885</Text>
            <Text style={styles.labelText}>Operativos</Text>
          </View>
        </View>
      </View>
      
      {/* Divider */}
      <View style={styles.hDivider} />
      
      {/* Bottom Row */}
      <View style={styles.row}>
        <View style={[styles.quadrant, styles.borderRight]}>
          <View style={[styles.iconBox, { backgroundColor: '#fef3c7' }]}>
            <Text style={styles.icon}>🔧</Text>
          </View>
          <View style={styles.textStack}>
            <Text style={styles.valueText}>340</Text>
            <Text style={styles.labelText}>En Reparación</Text>
          </View>
        </View>
        <View style={styles.quadrant}>
          <View style={[styles.iconBox, { backgroundColor: '#fee2e2' }]}>
            <Text style={styles.icon}>⚠️</Text>
          </View>
          <View style={styles.textStack}>
            <Text style={styles.valueText}>23</Text>
            <Text style={styles.labelText}>Dañados</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: { flexDirection: 'row' },
  hDivider: { height: 1, backgroundColor: '#f1f5f9' },
  borderRight: { borderRightWidth: 1, borderRightColor: '#f1f5f9' },
  quadrant: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 18, gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  icon: { fontSize: 20, textAlign: 'center', textAlignVertical: 'center', includeFontPadding: false, lineHeight: 26 },
  textStack: { flex: 1 },
  valueText: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 2 },
  labelText: { fontSize: 12, color: '#64748b', fontWeight: '600' }
});
