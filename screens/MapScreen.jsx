import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../components/ThemeProvider';

const MapScreen = () => {
  const themeColors = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>MapScreen</Text>
    </View>
  )
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    padding:10,
    height:'100%'
  },
    title: {
        color: 'black',
        fontSize: 32,
      },
})