import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DeptListItem({ title, value, iconText, isActive, onPress }) {
  const bgColor = isActive ? '#002750' : '#ffffff';
  const textColor = isActive ? '#ffffff' : '#1e293b';
  const subtextColor = isActive ? '#94a3b8' : '#64748b';
  const arrowColor = isActive ? '#ffffff' : '#cbd5e1';

  // Make the bottom corners flat when active so it connects cleanly to the accordion
  const borderStyles = isActive 
    ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, marginBottom: 0 }
    : {};

  return (
    <TouchableOpacity 
       style={[styles.item, { backgroundColor: bgColor, borderColor: isActive ? '#002750' : '#e2e8f0' }, borderStyles]} 
       onPress={onPress}
       activeOpacity={0.8}
    >
      <View style={[styles.iconContainer, { backgroundColor: isActive ? '#003a7a' : '#f1f5f9' }]}>
        <Text style={[styles.icon, { color: isActive ? '#ffffff' : '#475569' }]}>{iconText || '🏢'}</Text>
      </View>
      
      <View style={styles.textStack}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.subtext, { color: subtextColor }]}>Centro operativo</Text>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={[styles.value, { color: textColor }]}>{value}</Text>
        <Text style={[styles.arrow, { color: arrowColor }]}>{isActive ? '▼' : '›'}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  icon: { fontSize: 20, textAlign: 'center', textAlignVertical: 'center', lineHeight: 26, includeFontPadding: false },
  textStack: { flex: 1, paddingRight: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  subtext: { fontSize: 13, fontWeight: '500' },
  rightContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  value: { fontSize: 22, fontWeight: 'bold' },
  arrow: { fontSize: 22, paddingBottom: 2, paddingRight: 5 }
});
