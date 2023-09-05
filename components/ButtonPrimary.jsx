import React, { useContext } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { commonColors } from '../styles/index';
import { ThemeContext } from '../components/ThemeProvider';

const ButtonPrimary = ({ title, onPress,isLoading =false}) => {
  const themeColors = useContext(ThemeContext);

    return (
      <TouchableOpacity style={[styles.button,{backgroundColor:commonColors.primary}]} onPress={onPress} disabled={isLoading}>
        
        <Text style={[styles.buttonText,{ color:themeColors.text }]}> {isLoading ? 'Loading...' : title}</Text>
      </TouchableOpacity>
    );
  };
  export default ButtonPrimary;
  const styles = StyleSheet.create({
    button: {
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
     
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
