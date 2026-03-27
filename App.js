import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';

// Importación de componentes
import UnifiedStatPanel from './components/UnifiedStatPanel'; 
import InventoryTable from './components/InventoryTable'; 
import UserManagementTable from './components/UserManagementTable'; 
import SoporteTecnicoView from './components/SoporteTecnicoView';
import DesarrolloTable from './components/DesarrolloTable';
import RedesTable from './components/RedesTable';
import AdministracionTable from './components/AdministracionTable';
import HistorialTable from './components/HistorialTable';
import DeptListItem from './components/DeptListItem';
import DepartmentDetails from './components/DepartmentDetails';
import LoginScreen from './components/LoginScreen'; 


export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Breakpoint para pantallas pequeñas

  const [currentTab, setCurrentTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState('Redes');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const handleTabSelect = (tab) => {
    setCurrentTab(tab);
    if (isMobile) setIsSidebarOpen(false); // Auto close sidebar on mobile after selection
  };
  
  const contentStyle = [styles.content, { padding: isMobile ? 12 : 25 }];

  const renderContent = () => {
    switch(currentTab) {
      case 'Dashboard':
        const departmentsData = [
          { id: 'Redes', total: 166, icon: '🌐' },
          { id: 'Soporte Técnico', total: 85, icon: '🛠️' },
          { id: 'Desarrollo', total: 127, icon: '💻' },
          { id: 'Administración', total: 87, icon: '📁' }
        ];

        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true}>
            <Text style={styles.welcomeText}>Panel General de Infraestructura</Text>
            <UnifiedStatPanel />
            
            <Text style={styles.sectionTitle}>Análisis por Departamento</Text>
            <View style={styles.deptCardsContainer}>
              {departmentsData.map(dept => {
                const isActive = selectedDept === dept.id;
                return (
                  <View key={dept.id}>
                    <DeptListItem 
                      title={dept.id} 
                      value={dept.total} 
                      iconText={dept.icon}
                      isActive={isActive} 
                      onPress={() => setSelectedDept(isActive ? null : dept.id)} 
                    />
                    {isActive && (
                      <DepartmentDetails deptName={selectedDept} />
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        );
      case 'Redes':
        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true}>
            <Text style={styles.welcomeText}>Redes</Text>
            <Text style={styles.subtitle}>Inventario exclusivo de infraestructura y equipos del departamento de Redes.</Text>
            <RedesTable />
          </ScrollView>
        );
      case 'Historial':
        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true}>
            <Text style={styles.welcomeText}>Bitácora de Eventos</Text>
            <Text style={styles.subtitle}>Registro de movimientos e historial de cambios en todo el inventario.</Text>
            <HistorialTable />
          </ScrollView>
        );
      case 'Usuarios':
        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true}>
            <Text style={styles.welcomeText}>Gestión de Usuarios (Super Admin)</Text>
            <Text style={styles.subtitle}>Control de personal y accesos de la Gobernación.</Text>
            <UserManagementTable />
          </ScrollView>
        );
      case 'Soporte':
        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true} contentContainerStyle={{flexGrow: 1}}>
            <Text style={styles.welcomeText}>Soporte Técnico</Text>
            <Text style={styles.subtitle}>Gestión del inventario propio del departamento y registro de reparaciones.</Text>
            <SoporteTecnicoView />
          </ScrollView>
        );
      case 'Desarrollo':
        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true}>
            <Text style={styles.welcomeText}>Desarrollo</Text>
            <Text style={styles.subtitle}>Inventario exclusivo de equipos del departamento de Desarrollo.</Text>
            <DesarrolloTable />
          </ScrollView>
        );
      case 'Administración':
        return (
          <ScrollView style={contentStyle} showsVerticalScrollIndicator={true}>
            <Text style={styles.welcomeText}>Administración</Text>
            <Text style={styles.subtitle}>Inventario exclusivo de equipos y materiales del departamento de Administración.</Text>
            <AdministracionTable />
          </ScrollView>
        );
      default:
        return (
          <ScrollView style={contentStyle}>
            <Text style={styles.welcomeText}>{currentTab}</Text>
            <Text style={styles.subtitle}>Módulo en construcción.</Text>
            <View style={styles.placeholderBox}><Text style={{color: '#94a3b8'}}>Contenido en desarrollo...</Text></View>
          </ScrollView>
        );
    }
  };

  const SidebarContent = () => (
    <>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo-dgts.png')} style={styles.logoImage} resizeMode="contain" />
      </View>

      <ScrollView style={styles.menuContainer}>
        <MenuButton label="Dashboard" icon="📊" active={currentTab === 'Dashboard'} onPress={() => handleTabSelect('Dashboard')} />
        <MenuButton label="Redes" icon="🌐" active={currentTab === 'Redes'} onPress={() => handleTabSelect('Redes')} />
        <MenuButton label="Soporte Técnico" icon="🛠️" active={currentTab === 'Soporte'} onPress={() => handleTabSelect('Soporte')} />
        <MenuButton label="Desarrollo" icon="💻" active={currentTab === 'Desarrollo'} onPress={() => handleTabSelect('Desarrollo')} />
        <MenuButton label="Administración" icon="📁" active={currentTab === 'Administración'} onPress={() => handleTabSelect('Administración')} />
        <MenuButton label="Historial" icon="📋" active={currentTab === 'Historial'} onPress={() => handleTabSelect('Historial')} />
        
        <View style={styles.separator} />
        
        <MenuButton label="Usuarios" icon="👤" active={currentTab === 'Usuarios'} onPress={() => handleTabSelect('Usuarios')} />
      </ScrollView>

      <View style={styles.footerSidebar}>
        <Text style={styles.footerName}>Naidy Rojas</Text>
        <Text style={styles.footerRole}>Super Usuario</Text>
      </View>
    </>
  );

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* DESKTOP SIDEBAR */}
      {!isMobile && (
        <View style={styles.sidebarDesktop}>
          <SidebarContent />
        </View>
      )}

      {/* MOBILE SIDEBAR OVERLAY */}
      {isMobile && isSidebarOpen && (
        <View style={styles.sidebarOverlayContainer}>
          <TouchableOpacity style={styles.sidebarBackdrop} onPress={() => setIsSidebarOpen(false)} activeOpacity={1} />
          <View style={styles.sidebarMobile}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setIsSidebarOpen(false)}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
            <SidebarContent />
          </View>
        </View>
      )}

      {/* ÁREA PRINCIPAL */}
      <View style={styles.mainArea}>
        <View style={styles.navbar}>
          <View style={styles.navbarLeft}>
            {isMobile && (
              <TouchableOpacity style={styles.hamburgerBtn} onPress={() => setIsSidebarOpen(true)}>
                <Text style={styles.hamburgerIcon}>☰</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.navbarTitle}>DGTSP | {currentTab}</Text>
          </View>
          <View style={styles.userProfile}>
            <View style={styles.avatar}><Text style={styles.avatarText}>NR</Text></View>
            {!isMobile && <Text style={styles.userName}>Naidy Rojas</Text>}
          </View>
        </View>
        <ImageBackground 
          source={require('./assets/main-bg.png')} 
          style={styles.contentBackground}
          blurRadius={5}
          resizeMode="cover"
        >
          <View style={styles.contentOverlay}>
            {renderContent()}
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const MenuButton = ({ label, icon, active, onPress }) => (
  <TouchableOpacity style={[styles.menuItem, active && styles.menuItemActive]} onPress={onPress}>
    <Text style={[styles.menuText, active && styles.menuTextActive]}>{icon}  {label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#f3f4f6' },
  
  // Sidebar styles
  sidebarDesktop: { width: 260, backgroundColor: '#ffffff', borderRightWidth: 1, borderRightColor: '#e5e7eb', paddingTop: 20 },
  sidebarMobile: { 
    position: 'absolute', top: 0, bottom: 0, left: 0, width: 280, 
    backgroundColor: '#ffffff', zIndex: 100, paddingTop: 20,
    shadowColor: '#000', shadowOffset: { width: 2, height: 0 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 15
  },
  sidebarOverlayContainer: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 90 },
  sidebarBackdrop: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' },
  closeBtn: { position: 'absolute', top: 15, right: 15, zIndex: 110, padding: 5 },
  closeBtnText: { fontSize: 22, color: '#64748b', fontWeight: 'bold' },
  
  logoContainer: { alignItems: 'center', marginBottom: 20, height: 110, justifyContent: 'center', paddingHorizontal: 10 },
  logoImage: { width: 220, height: 90 },
  menuContainer: { paddingHorizontal: 15, gap: 8, flex: 1 },
  menuItem: { padding: 12, borderRadius: 10 },
  menuItemActive: { backgroundColor: '#eff6ff', borderWidth: 1, borderColor: '#bfdbfe' },
  menuText: { fontSize: 15, color: '#4b5563', fontWeight: '500' },
  menuTextActive: { color: '#002750', fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15, marginHorizontal: 10 },
  footerSidebar: { padding: 20, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  footerName: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
  footerRole: { fontSize: 12, color: '#64748b' },
  
  // Main area styles
  mainArea: { flex: 1 },
  navbar: { 
    height: 70, backgroundColor: '#ffffff', flexDirection: 'row', alignItems: 'center', 
    justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' 
  },
  navbarLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  hamburgerBtn: { padding: 5 },
  hamburgerIcon: { fontSize: 24, color: '#002750' },
  navbarTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  userProfile: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 35, height: 35, borderRadius: 18, backgroundColor: '#002750', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 },
  userName: { fontSize: 14, fontWeight: '600' },
  
  // Content styles
  contentBackground: { flex: 1 },
  contentOverlay: { flex: 1, backgroundColor: 'rgba(243, 244, 246, 0.75)' },
  content: { padding: 20, flex: 1 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#002750', marginBottom: 5 },
  subtitle: { fontSize: 16, color: '#64748b', marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 15, marginTop: 5 },
  
  // Wrap cards on mobile!
  cardsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 25, gap: 10, justifyContent: 'space-between' },
  deptCardsContainer: { flexDirection: 'column', gap: 0, marginBottom: 20 },
  
  placeholderBox: { flex: 1, backgroundColor: '#fff', borderRadius: 15, borderStyle: 'dashed', borderWidth: 2, borderColor: '#cbd5e1', justifyContent: 'center', alignItems: 'center', marginTop: 10, minHeight: 300 }
});