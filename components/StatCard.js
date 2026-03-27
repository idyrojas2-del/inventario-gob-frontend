import { View, Text, StyleSheet } from 'react-native';

// Recibimos los datos (props) tal como lo hacíamos en la web
export default function StatCard({ title, value, icon, color }) {
  return (
    <View style={styles.card}>
      {/* Círculo de color dinámico para el ícono */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      
      {/* Textos */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // Sombras para iOS y Web
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // Sombra para Android
    elevation: 2,
    flexGrow: 1, // Allow cards to grow if there is extra space
    minWidth: 140, // Ensure logic holds, but add percentage basis
    width: '47%', // Take up roughly half the screen minus gap
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: 28, // Forces the emoji baseline to align nicely
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  }
});