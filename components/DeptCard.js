import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DeptCard({ title, value, subtext, isActive, onPress }) {
  // Use the reference design colors: solid dark green/blue when active, white when inactive
  const bgColor = isActive ? '#002750' : '#ffffff';
  const textColor = isActive ? '#ffffff' : '#1e293b';
  const subtextColor = isActive ? '#cbd5e1' : '#64748b';
  const iconBg = isActive ? '#003a7a' : '#ffffff'; // slightly lighter than bg
  const iconColor = isActive ? '#ffffff' : '#1e293b';
  const borderColor = isActive ? '#002750' : '#e2e8f0';

  return (
    <TouchableOpacity 
       style={[styles.card, { backgroundColor: bgColor, borderColor: borderColor }]} 
       onPress={onPress}
       activeOpacity={0.8}
    >
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>{title}</Text>
        <View style={[styles.arrowCircle, { backgroundColor: iconBg, borderColor: isActive ? 'transparent' : '#e2e8f0', borderWidth: isActive ? 0 : 1 }]}>
          <Text style={[styles.arrowIcon, { color: iconColor }]}>↗</Text>
        </View>
      </View>
      
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      
      <View style={styles.bottomRow}>
        <View style={[styles.subtextIconContainer, { borderColor: isActive ? '#cbd5e1' : '#cbd5e1' }]}>
          <Text style={[styles.subtextIcon, { color: subtextColor }]}>=</Text>
        </View>
        <Text style={[styles.subtext, { color: subtextColor }]}>{subtext}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    minWidth: 160,
    width: '47%',
    flexGrow: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 13, fontWeight: '700', flex: 1, marginRight: 10 },
  arrowCircle: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  arrowIcon: { fontSize: 14, fontWeight: 'bold' },
  value: { fontSize: 34, fontWeight: 'bold', marginBottom: 15 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  subtextIconContainer: { 
    borderWidth: 1, 
    borderRadius: 4, 
    width: 18, 
    height: 14, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  subtextIcon: { fontSize: 9, fontWeight: 'bold', lineHeight: 10 },
  subtext: { fontSize: 11, fontWeight: '500' }
});
