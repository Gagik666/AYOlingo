import React from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../core/constants';

const { height, width } = Dimensions.get('window');

export default function Loader() {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator color={COLORS.purple} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, .3)',
    width,
    height: height,
    left: 0,
    top: 0,
    zIndex: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});