import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Image,
  KeyboardAvoidingView, 
  Platform,
  useWindowDimensions
} from 'react-native';
import { showAlert } from '../utils/Alerts';

export default function LoginScreen({ onLogin }) {
  const [prefix, setPrefix] = useState('V');
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleLogin = () => {
    if (cedula && password) {
      onLogin();
    } else {
      showAlert('Atención', 'Por favor ingrese sus credenciales.', 'warning');
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/login-bg.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={[styles.glassCard, { width: isMobile ? '92%' : 440 }]}>
          <View style={styles.logoBox}>
            <Image 
              source={require('../assets/logo-dgts.png')} 
              style={styles.logo} 
              resizeMode="contain" 
            />
          </View>
          <Text style={styles.title}>Sistema de Inventario</Text>
          <Text style={styles.subtitle}>Gobernación del Estado Aragua</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cédula de Identidad</Text>
            <View style={styles.cedulaRow}>
              <select 
                style={styles.prefixSelect}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
              >
                <option value="V">V</option>
                <option value="E">E</option>
              </select>
              <TextInput 
                style={styles.cedulaInput} 
                placeholder="12345678"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={cedula}
                onChangeText={(val) => setCedula(val.replace(/[^0-9]/g, ''))}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordRow}>
              <TextInput 
                style={styles.passwordInput} 
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                maxLength={8}
              />
              <TouchableOpacity 
                style={styles.eyeBtn} 
                onPress={() => setShowPassword(!showPassword)}
              >
                <View style={[styles.minimalEye, showPassword && styles.minimalEyeClosed]}>
                  <View style={styles.minimalPupil} />
                  {showPassword && <View style={styles.minimalSlash} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 35,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Platform.select({
      web: {
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)',
      },
    }),
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 280,
    height: 90,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 35,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cedulaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  prefixSelect: {
    backgroundColor: '#ffffff', // Fondo blanco solo para el prefijo como pidió
    color: '#002750',
    fontSize: 16,
    fontWeight: 'bold',
    borderWidth: 0,
    borderRightWidth: 1.5,
    borderRightColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    outlineWidth: 0,
    cursor: 'pointer',
    fontFamily: 'inherit',
    height: '100%',
  },
  cedulaInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#ffffff',
  },
  eyeBtn: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  minimalEye: {
    width: 20,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    opacity: 0.9,
  },
  minimalEyeClosed: {
    opacity: 0.6,
  },
  minimalPupil: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
  minimalSlash: {
    position: 'absolute',
    width: 20,
    height: 1.5,
    backgroundColor: '#ffffff',
    transform: [{ rotate: '45deg' }],
  },
  button: {
    backgroundColor: '#002750', 
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 6px 20px rgba(0, 39, 80, 0.4)',
      },
    }),
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
