import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, useWindowDimensions, ScrollView } from 'react-native';

export default function NewUserModal({ visible, onClose }) {
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;

  const dynamicStyles = {
    overlay: {
      padding: isMobile ? 5 : 15,
    },
    modalContainer: { 
      width: isMobile ? '98%' : 450, 
      maxHeight: isMobile ? '95%' : '85%', 
    },
    modalHeader: {
      padding: isMobile ? 20 : 25,
    },
    footerRow: { 
      padding: isMobile ? 15 : 20,
    },
    scrollBody: {
      padding: isMobile ? 20 : 25
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, dynamicStyles.overlay]}>
        <TouchableOpacity style={styles.backdropPress} activeOpacity={1} onPress={onClose} />
        <View style={[styles.modalContainer, dynamicStyles.modalContainer]}>
          <View style={[styles.modalHeader, dynamicStyles.modalHeader]}>
            <Text style={styles.title}>👤 Nuevo Usuario</Text>
            <Text style={styles.subtitle}>Complete los datos para registrar un nuevo integrante.</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={true} style={[{ flex: 1 }, dynamicStyles.scrollBody]}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre Completo</Text>
              <TextInput style={styles.input} placeholder="Ej: Juan Pérez" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Departamento</Text>
              <select style={styles.selectInput}>
                <option>Desarrollo</option>
                <option>Soporte Técnico</option>
                <option>Administración</option>
                <option>Redes</option>
              </select>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rol de Usuario</Text>
              <select style={styles.selectInput}>
                <option>Visualizador</option>
                <option>Operador</option>
                <option>Super Usuario</option>
              </select>
            </View>
          </ScrollView>

          <View style={[styles.footerRow, dynamicStyles.footerRow]}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={{color: '#64748b', fontWeight: 'bold'}}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.saveBtn}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Crear Usuario</Text>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    borderRadius: 15, 
    overflow: 'hidden',
    zIndex: 1001 
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#002750', marginBottom: 5 },
  subtitle: { fontSize: 13, color: '#64748b' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#1e293b', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#e2e8f0', padding: 10, borderRadius: 8, fontSize: 14 },
  selectInput: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 10, 
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  saveBtn: { backgroundColor: '#002750', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 15 }
});