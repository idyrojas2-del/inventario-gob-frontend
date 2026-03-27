import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import InventarioSoporteTable from './InventarioSoporteTable';
import InventarioReparacionesTable from './InventarioReparacionesTable';

export default function SoporteTecnicoView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const navigateTo = (index) => {
    setActiveIndex(index);
    Animated.timing(slideAnim, {
      toValue: index,
      duration: 350,
      useNativeDriver: false, // transform to negative values via state layout width works better on Web without native driver issues
    }).start();
  };

  // Only animate if we have a known width
  const translateX = containerWidth > 0 ? slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -containerWidth]
  }) : 0;

  return (
    <View style={styles.container} onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      
      {/* HEADER CONTROLS (TABS & ARROWS) */}
      <View style={styles.headerControl}>
        
        {/* VIEW TABS */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeIndex === 0 && styles.tabBtnActive]}
            onPress={() => navigateTo(0)}
          >
            <Text style={[styles.tabText, activeIndex === 0 && styles.tabTextActive]}>
              💻 Inventario
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, activeIndex === 1 && styles.tabBtnActive]}
            onPress={() => navigateTo(1)}
          >
            <Text style={[styles.tabText, activeIndex === 1 && styles.tabTextActive]}>
              🛠️ Reparaciones
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* HORIZONTAL CAROUSEL FRAME */}
      <View style={styles.carouselFrame}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
          <View style={{ width: containerWidth }}>
            <InventarioSoporteTable />
          </View>
          <View style={{ width: containerWidth }}>
            <InventarioReparacionesTable />
          </View>
        </Animated.View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  headerControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  tabBtnActive: {
    backgroundColor: '#002750',
  },
  tabText: {
    color: '#64748b',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabTextActive: {
    color: 'white',
  },
  carouselFrame: {
    flex: 1,
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
    width: '200%', // Contains 2 tables
  }
});
