import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Platform, useWindowDimensions } from 'react-native';
import { showAlert } from '../utils/Alerts';

const TIPOS = ['PC Escritorio', 'Laptop', 'Impresora', 'Monitor', 'Switch', 'UPS', 'Servidor', 'Router', 'Teléfono VoIP', 'Scanner'];
const ESTADOS = ['Operativo', 'En Reparación', 'Dañado'];
const DEPTOS = ['Recursos Humanos', 'Despacho', 'Administración', 'Desarrollo', 'Site Principal', 'Soporte Técnico', 'Redes'];

export default function NewEquipmentModal({ visible, onClose, onSave, customEstados, fixedDepto }) {
  const { width: windowWidth } = useWindowDimensions();
  const isMobile = windowWidth < 768;

  const [formData, setFormData] = useState({
    tipo: '',
    tipoCustom: '',
    marca: '',
    serial: '',
    depto: fixedDepto || '',
    responsable: '',
    estado: 'Operativo',
    observaciones: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const finalTipo = formData.tipo === 'Otro...' ? formData.tipoCustom : formData.tipo;
    if (!finalTipo || !formData.marca || !formData.serial || !formData.depto || !formData.responsable) {
      showAlert('⚠️ Error', 'Por favor complete todos los campos obligatorios.', 'error');
      return;
    }
    const finalData = { ...formData, tipo: finalTipo, depto: fixedDepto || formData.depto };
    onSave(finalData);
    setFormData({ tipo: '', tipoCustom: '', marca: '', serial: '', depto: fixedDepto || '', responsable: '', estado: 'Operativo', observaciones: '' });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ tipo: '', tipoCustom: '', marca: '', serial: '', depto: fixedDepto || '', responsable: '', estado: 'Operativo', observaciones: '' });
    onClose();
  };

  // Dynamic Styles
  const dynamicStyles = {
    overlay: {
      padding: isMobile ? 5 : 20,
    },
    modalContainer: {
      width: isMobile ? '98%' : 620,
      maxHeight: isMobile ? '98%' : '85%',
    },
    modalHeader: {
      padding: isMobile ? 15 : 24,
    },
    title: {
      fontSize: isMobile ? 18 : 20,
    },
    formBody: {
      padding: isMobile ? 12 : 24,
    },
    formRow: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 8 : 16,
      marginBottom: isMobile ? 8 : 18,
    },
    fieldHalf: {
      width: isMobile ? '100%' : '48%',
    },
    fieldFull: {
      marginBottom: isMobile ? 8 : 18,
    },
    input: {
      padding: isMobile ? 8 : 10,
    },
    selectInput: {
      padding: isMobile ? '8px' : '10px',
    },
    footerRow: {
      padding: isMobile ? 12 : 20,
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={handleCancel}>
      <View style={[styles.overlay, dynamicStyles.overlay]}>
        <TouchableOpacity style={styles.backdropPress} activeOpacity={1} onPress={handleCancel} />
        <View style={[styles.modalContainer, dynamicStyles.modalContainer]}>
          <View style={[styles.modalHeader, dynamicStyles.modalHeader]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, dynamicStyles.title]}>➕ Anexar Nuevo Equipo</Text>
              <Text style={styles.subtitle} numberOfLines={1}>Complete los datos del equipo.</Text>
            </View>
            <TouchableOpacity onPress={handleCancel} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={true} style={[styles.formBody, dynamicStyles.formBody]}>
            <View style={dynamicStyles.formRow}>
              <View style={dynamicStyles.fieldHalf}>
                <Text style={styles.label}>Tipo de Equipo <Text style={styles.required}>*</Text></Text>
                <select
                  style={{ ...styles.selectInput, ...dynamicStyles.selectInput }}
                  value={formData.tipo}
                  onChange={(e) => handleChange('tipo', e.target.value)}
                >
                  <option value="">Seleccione tipo...</option>
                  {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                  <option value="Otro...">Otro... (Especificar)</option>
                </select>
                
                {formData.tipo === 'Otro...' && (
                  <TextInput
                    style={[styles.input, dynamicStyles.input, { marginTop: 8 }]}
                    placeholder="Especifique tipo..."
                    placeholderTextColor="#94a3b8"
                    value={formData.tipoCustom}
                    onChangeText={(v) => handleChange('tipoCustom', v)}
                  />
                )}
              </View>

              <View style={dynamicStyles.fieldHalf}>
                <Text style={styles.label}>Marca / Modelo <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  placeholder="Ej: Dell OptiPlex 7090"
                  placeholderTextColor="#94a3b8"
                  value={formData.marca}
                  onChangeText={(v) => handleChange('marca', v)}
                />
              </View>
            </View>

            <View style={dynamicStyles.formRow}>
              <View style={dynamicStyles.fieldHalf}>
                <Text style={styles.label}>Número de Serial <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  placeholder="Ej: DLL-4829-XK"
                  placeholderTextColor="#94a3b8"
                  value={formData.serial}
                  onChangeText={(v) => handleChange('serial', v)}
                />
              </View>

              <View style={dynamicStyles.fieldHalf}>
                <Text style={styles.label}>Estado Inicial</Text>
                <select
                  style={{ ...styles.selectInput, ...dynamicStyles.selectInput }}
                  value={formData.estado}
                  onChange={(e) => handleChange('estado', e.target.value)}
                >
                  {(customEstados || ESTADOS).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </View>
            </View>

            <View style={dynamicStyles.formRow}>
              <View style={dynamicStyles.fieldHalf}>
                <Text style={styles.label}>Departamento <Text style={styles.required}>*</Text></Text>
                {fixedDepto ? (
                  <TextInput
                    style={[styles.input, dynamicStyles.input, { backgroundColor: '#f1f5f9', color: '#64748b' }]}
                    value={fixedDepto}
                    editable={false}
                  />
                ) : (
                  <select
                    style={{ ...styles.selectInput, ...dynamicStyles.selectInput }}
                    value={formData.depto}
                    onChange={(e) => handleChange('depto', e.target.value)}
                  >
                    <option value="">Seleccione departamento...</option>
                    {DEPTOS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                )}
              </View>

              <View style={dynamicStyles.fieldHalf}>
                <Text style={styles.label}>Responsable <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  placeholder="Nombre del responsable"
                  placeholderTextColor="#94a3b8"
                  value={formData.responsable}
                  onChangeText={(v) => handleChange('responsable', v)}
                />
              </View>
            </View>

            <View style={dynamicStyles.fieldFull}>
              <Text style={styles.label}>Observaciones</Text>
              <TextInput
                style={[styles.input, dynamicStyles.input, { height: 60, textAlignVertical: 'top' }]}
                placeholder="Detalles adicionales..."
                placeholderTextColor="#94a3b8"
                multiline
                value={formData.observaciones}
                onChangeText={(v) => handleChange('observaciones', v)}
              />
            </View>
          </ScrollView>

          <View style={[styles.footerRow, dynamicStyles.footerRow]}>
            <Text style={styles.requiredNote}>* Requeridos</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>💾 Registrar</Text>
              </TouchableOpacity>
            </View>
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
    maxWidth: 620,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    flexShrink: 1,
    zIndex: 1001,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  title: { fontWeight: 'bold', color: '#002750' },
  subtitle: { fontSize: 12, color: '#64748b' },
  closeBtn: { padding: 4 },
  closeBtnText: { fontSize: 20, color: '#94a3b8', fontWeight: 'bold' },

  formBody: { flex: 1 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  required: { color: '#ef4444' },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#fafbfc',
    color: '#334155',
  },
  selectInput: {
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#fafbfc',
    fontSize: '14px',
    color: '#334155',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  requiredNote: { fontSize: 11, color: '#94a3b8' },
  buttonRow: { flexDirection: 'row', gap: 8 },
  cancelBtn: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  cancelBtnText: { color: '#64748b', fontWeight: 'bold', fontSize: 13 },
  saveBtn: { backgroundColor: '#002750', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  saveBtnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
});
