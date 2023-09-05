import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../components/ThemeProvider';

const ProfileScreen = () => {
  const themeColors = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen

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