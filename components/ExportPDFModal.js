import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, useWindowDimensions, ScrollView } from 'react-native';

export default function ExportPDFModal({ visible, onClose, onExport }) {
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;

  const [periodo, setPeriodo] = useState('Semana Actual (En curso)');

  const handleExport = () => {
    onExport(periodo);
    onClose();
  };

  const dynamicStyles = {
    overlay: {
      padding: isMobile ? 5 : 20,
    },
    modalContainer: {
      width: isMobile ? '98%' : 450,
      maxHeight: isMobile ? '95%' : '85%',
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, dynamicStyles.overlay]}>
        <TouchableOpacity style={styles.backdropPress} activeOpacity={1} onPress={onClose} />
        <View style={[styles.modalContainer, dynamicStyles.modalContainer]}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>📄 Exportar informe PDF</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}>
            <View style={styles.formBody}>
              <Text style={styles.label}>Seleccione el período del reporte:</Text>
              <select
                style={styles.selectInput}
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
              >
                <option value="Semana Actual (En curso)">Semana Actual (En curso)</option>
                <option value="Semana Pasada">Semana Pasada</option>
                <option value="Hace 2 Semanas">Hace 2 Semanas</option>
                <option value="Mes Completo (Histórico)">Mes Completo (Histórico)</option>
              </select>
              <Text style={styles.infoText}>
                Este reporte incluirá todos los registros del departamento correspondientes al período seleccionado.
              </Text>
            </View>
          </ScrollView>

          <View style={styles.footerRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleExport} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>📄 Confirmar y Descargar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropPress: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  modalContainer: {
    maxWidth: 450,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: 1001,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#002750' },
  closeBtn: { padding: 4 },
  closeBtnText: { fontSize: 20, color: '#94a3b8', fontWeight: 'bold' },
  formBody: { padding: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  selectInput: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fafbfc',
    fontSize: '14px',
    color: '#334155',
    marginBottom: 16,
  },
  infoText: { fontSize: 13, color: '#64748b', fontStyle: 'italic', lineHeight: 20 },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  cancelBtnText: { color: '#64748b', fontWeight: 'bold', fontSize: 13 },
  saveBtn: { backgroundColor: '#E12F40', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  saveBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
});
