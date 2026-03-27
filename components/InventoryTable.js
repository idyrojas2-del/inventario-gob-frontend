import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import NewUserModal from './NewUserModal';
import { showAlert, showConfirm } from '../utils/Alerts';

export default function InventoryTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); 

  const registrosOriginales = [
    { id: 'GOB-001', cat: 'Hardware', nombre: 'PC de Escritorio', depto: 'Recursos Humanos', estado: 'Activo' },
    { id: 'GOB-002', cat: 'Hardware', nombre: 'Impresora Multifuncional', depto: 'Administración', estado: 'En Reparación' },
    { id: 'GOB-003', cat: 'Hardware', nombre: 'Servidor Rack', depto: 'Site Principal', estado: 'Activo' },
    { id: 'GOB-004', cat: 'Hardware', nombre: 'Laptop ThinkPad', depto: 'Despacho', estado: 'Dañado' },
    { id: 'LIC-042', cat: 'Licencia', nombre: 'Odoo Enterprise', depto: 'Desarrollo', estado: 'Activo' },
  ];

  const registrosFiltrados = registrosOriginales.filter((item) => {
    const busqueda = searchText.toLowerCase();
    return (
      item.id.toLowerCase().includes(busqueda) ||
      item.nombre.toLowerCase().includes(busqueda) ||
      item.depto.toLowerCase().includes(busqueda)
    );
  });

  return (
    <View style={styles.container}>
      {/* RESPONSIVE HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Inventario Tecnológico</Text>
          <View style={styles.searchBox}>
            <Text style={styles.lupaIcon}>⌕</Text> 
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar por ID, nombre..."
              placeholderTextColor="#94a3b8"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.buttonText}>+ Nuevo Registro</Text>
        </TouchableOpacity>
      </View>

      {/* HORIZONTAL SCROLL FOR TABLE ON SMALL SCREENS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.horizontalScroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minWidth: 650, width: '100%' }}>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.columnText, { minWidth: 80, flex: 1 }]}>ID</Text>
            <Text style={[styles.columnText, { minWidth: 160, flex: 2 }]}>Recurso</Text>
            <Text style={[styles.columnText, { minWidth: 140, flex: 1.5 }]}>Ubicación</Text>
            <Text style={[styles.columnText, { minWidth: 100, flex: 1 }]}>Estado</Text>
            <Text style={[styles.columnText, { minWidth: 90, flex: 1, textAlign: 'right' }]}>Acciones</Text>
          </View>

          {/* TABLE BODY */}
          <ScrollView style={styles.tableBody} nestedScrollEnabled={true}>
            {registrosFiltrados.length > 0 ? (
              registrosFiltrados.map((item) => (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.cellText, { minWidth: 80, flex: 1, fontWeight: 'bold', color: '#002750' }]} numberOfLines={1}>{item.id}</Text>
                  
                  <View style={{ minWidth: 160, flex: 2, paddingRight: 10 }}>
                    <Text style={styles.cellText} numberOfLines={1}>{item.nombre}</Text>
                    <Text style={styles.subCellText} numberOfLines={1}>{item.cat}</Text>
                  </View>
                  
                  <Text style={[styles.cellText, { minWidth: 140, flex: 1.5, paddingRight: 10 }]} numberOfLines={1}>{item.depto}</Text>
                  
                  <View style={{ minWidth: 100, flex: 1 }}>
                    <View style={[styles.badge, item.estado === 'Activo' ? styles.bgSuccess : item.estado === 'Dañado' ? styles.bgDanger : styles.bgWarning]}>
                      <Text style={styles.badgeText} numberOfLines={1}>{item.estado}</Text>
                    </View>
                  </View>
                  
                  <View style={[styles.actionsContainer, { minWidth: 90, flex: 1 }]}>
                    <TouchableOpacity onPress={() => showAlert('Editar', 'Editando ' + item.id, 'info')}>
                      <Text style={styles.btnEdit}>✎</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showConfirm('Eliminar', '¿Estás seguro de que deseas eliminar este equipo?', () => showAlert('Eliminado', 'Eliminando ' + item.id, 'success'))}>
                      <Text style={styles.btnDelete}>🗑</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.noResult}><Text style={styles.noResultText}>No hay coincidencias.</Text></View>
            )}
          </ScrollView>

        </View>
      </ScrollView>

      <NewUserModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', borderRadius: 12, flex: 1, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
  
  // Responsive Header Elements
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', padding: 20, 
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center',
    flexWrap: 'wrap', gap: 15
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15, flex: 1, minWidth: 280, flexWrap: 'wrap' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  searchBox: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', 
    borderRadius: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#cbd5e1', 
    height: 40, flex: 1, minWidth: 200
  },
  lupaIcon: { fontSize: 20, color: '#64748b', marginRight: 5 },
  searchInput: { flex: 1, fontSize: 14, color: '#334155', outlineStyle: 'none' },
  button: { backgroundColor: '#E12F40', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  
  // Responsive Table Elements
  horizontalScroll: { flex: 1 },
  tableBody: { maxHeight: 500 },
  tableHeader: { 
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 14, 
    backgroundColor: '#f8fafc', borderBottomWidth: 2, borderBottomColor: '#e2e8f0' 
  },
  columnText: { fontWeight: '700', color: '#64748b', fontSize: 12, textTransform: 'uppercase', paddingRight: 8 },
  
  row: { 
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 16, 
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' 
  },
  cellText: { fontSize: 14, color: '#334155' },
  subCellText: { fontSize: 11, color: '#94a3b8' },
  
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  bgSuccess: { backgroundColor: '#dcfce7' },
  bgDanger: { backgroundColor: '#fee2e2' },
  bgWarning: { backgroundColor: '#fef3c7' },
  
  actionsContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  btnEdit: { color: '#002750', fontSize: 18, fontWeight: 'bold' },
  btnDelete: { color: '#E12F40', fontSize: 18, fontWeight: 'bold' },
  
  noResult: { padding: 40, alignItems: 'center' },
  noResultText: { color: '#94a3b8', fontStyle: 'italic' }
});