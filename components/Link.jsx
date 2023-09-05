import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { commonColors } from '../styles/index';

const Link = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text,{color:commonColors.primary}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        // backgroundColor: '#fff',
        marginLeft:4
      },
      text: {
        fontWeight: 'bold',
        padding:0,
        textDecorationLine: 'underline',
        }
});

export default Link;
