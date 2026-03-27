import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import NewUserModal from './NewUserModal'; 
import { showAlert, showConfirm } from '../utils/Alerts';

export default function UserManagementTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [usuarios] = useState([
    { id: 1, nombre: 'Naidy Rojas', correo: 'nrojas@aragua.gob.ve', rol: 'Super Admin', depto: 'Desarrollo' },
    { id: 2, nombre: 'Juan Pérez', correo: 'jperez@aragua.gob.ve', rol: 'Técnico', depto: 'Soporte' },
    { id: 3, nombre: 'Maria Silva', correo: 'msilva@aragua.gob.ve', rol: 'Analista', depto: 'Administración' },
  ]);

  const usuariosFiltrados = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(searchText.toLowerCase()) || 
    u.correo.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* RESPONSIVE HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Gestión de Personal</Text>
          <View style={styles.searchBox}>
            <Text style={styles.lupaIcon}>⌕</Text>
            <TextInput 
              style={styles.searchInput}
              placeholder="Buscar usuario..."
              placeholderTextColor="#94a3b8"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btnNuevo} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.btnText}>+ Crear Usuario</Text>
        </TouchableOpacity>
      </View>

      {/* HORIZONTAL SCROLL FOR TABLE ON SMALL SCREENS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.horizontalScroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ minWidth: 600, width: '100%' }}>
          
          <View style={styles.tableHeader}>
            <Text style={[styles.colHeader, { minWidth: 200, flex: 2 }]}>Usuario</Text>
            <Text style={[styles.colHeader, { minWidth: 120, flex: 1 }]}>Rol</Text>
            <Text style={[styles.colHeader, { minWidth: 150, flex: 1 }]}>Departamento</Text>
            <Text style={[styles.colHeader, { minWidth: 90, flex: 0.8, textAlign: 'right' }]}>Acciones</Text>
          </View>

          <ScrollView style={styles.tableBody} nestedScrollEnabled={true}>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((user) => (
                <View key={user.id} style={styles.row}>
                  
                  <View style={{ minWidth: 200, flex: 2, paddingRight: 15 }}>
                    <Text style={styles.userName} numberOfLines={1}>{user.nombre}</Text>
                    <Text style={styles.userEmail} numberOfLines={1}>{user.correo}</Text>
                  </View>
                  
                  <Text style={[styles.cell, { minWidth: 120, flex: 1, paddingRight: 10 }]} numberOfLines={1}>{user.rol}</Text>
                  <Text style={[styles.cell, { minWidth: 150, flex: 1, paddingRight: 10 }]} numberOfLines={1}>{user.depto}</Text>
                  
                  <View style={[styles.actions, { minWidth: 90, flex: 0.8 }]}>
                    <TouchableOpacity onPress={() => showAlert('Editar', '✎ Editando', 'info')}><Text style={styles.editIcon}>✎</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => showConfirm('Eliminar', '¿Estás seguro de que deseas eliminar este elemento?', () => showAlert('Eliminado', '🗑 Eliminando', 'success'))}><Text style={styles.deleteIcon}>🗑</Text></TouchableOpacity>
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
  container: { backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', flex: 1, overflow: 'hidden' },
  
  // Responsive Header Elements
  header: { 
    flexDirection: 'row', justifyContent: 'space-between', padding: 20, 
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center',
    flexWrap: 'wrap', gap: 15
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 15, flex: 1, minWidth: 260, flexWrap: 'wrap' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#002750' },
  searchBox: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', 
    borderRadius: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#e2e8f0', 
    flex: 1, height: 40, minWidth: 200 
  },
  lupaIcon: { fontSize: 20, color: '#94a3b8', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#334155', outlineStyle: 'none' },
  btnNuevo: { backgroundColor: '#002750', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  
  // Responsive Table Elements
  horizontalScroll: { flex: 1 },
  tableBody: { maxHeight: 500 },
  tableHeader: { 
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, 
    backgroundColor: '#f8fafc', borderBottomWidth: 2, borderBottomColor: '#e2e8f0' 
  },
  colHeader: { fontWeight: 'bold', color: '#64748b', fontSize: 12, textTransform: 'uppercase', paddingRight: 8 },
  row: { 
    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15, 
    borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' 
  },
  userName: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
  userEmail: { fontSize: 12, color: '#64748b' },
  cell: { fontSize: 14, color: '#334155' },
  
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  editIcon: { fontSize: 18, color: '#002750' },
  deleteIcon: { fontSize: 18, color: '#E12F40' },

  noResult: { padding: 40, alignItems: 'center' },
  noResultText: { color: '#94a3b8', fontStyle: 'italic' }
});