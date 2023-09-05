import React, { useContext } from 'react'
import { ThemeContext } from '../components/ThemeProvider';
import { TextInput, StyleSheet, Text,View } from 'react-native';

const EtextInput = ({style, placeholder,value, onChangeText, secureTextEntry ,label,error}) => {
    const themeColors = useContext(ThemeContext);

  return (
    <View style={[{marginBottom: 12},style]}>
    {label && <Text style={[ {marginLeft:4,marginBottom:4,fontSize: 12, color: themeColors.text }]}>{label}</Text>}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      value={value}
    />
     {error && <Text style={{ color: themeColors.error,marginTop:2 }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    // height: 40,
    padding: 12,
    backgroundColor:'#121211',
    borderRadius:8,
    fontSize:15
  },
});

export default EtextInput;
