import { StyleSheet, View, Text, TextInput, Image } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../components/ThemeProvider';
import  ButtonPrimary  from '../../components/ButtonPrimary';
import  Link  from '../../components/Link';
import  EtextInput  from '../../components/EtextInput';
import { Formik,useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import {  register } from '../../redux/actions/authActions.js';
import { useNavigation } from '@react-navigation/native';

// Define a validation schema for the form inputs
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters")
});
const LoginScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { isLoading, apiError } = useSelector((state) => state.auth);

  const themeColors = useContext(ThemeContext);
    // Use useFormik hook to handle form state and submission
    const { handleChange,touched, handleSubmit, values, errors,setErrors,dirty } = useFormik({
      initialValues: {
        name:"",
        username: "",
        email: "",
        password: ""
      },
      validationSchema,
      onSubmit: async (values) => {
       dispatch(register(values));
      },
    });

  return (
    <View style={[styles.container, { paddingHorizontal: 20,backgroundColor: themeColors.background}]}>
      <View style={[ {alignItems:'center',marginVertical:50 }]}>
      {/* <Text style={[styles.title, { color: themeColors.text }]}>Engage</Text> */}
      <Image
      source={require('../../assets/logo.jpeg')}
      style={{ width: 122, height: 122}}
    />
      </View>
      
      <Text style={[ {fontSize: 24, color: themeColors.text,marginBottom:10 }]}>Create your account</Text>

      <View style={{ marginTop: 20,marginBottom:20}}>
      <EtextInput
       value={values.name}
       onChangeText={handleChange("name")}
       placeholder="Enter your Name"
       label="Name"
       error={touched.name && errors.name}
     />
     <EtextInput
       value={values.username}
       onChangeText={handleChange("username")}
       placeholder="Enter your Username"
       label="Username"
       error={touched.username && errors.username}
     />
     <EtextInput
       value={values.email}
       onChangeText={handleChange("email")}
       placeholder="Enter your Email"
       label="Email"
       error={touched.email && errors.email}
     />
    
     <EtextInput
       value={values.password}
       onChangeText={handleChange("password")}
       placeholder="Enter your password"
       secureTextEntry
       label="Password"
       error={touched.password && errors.password}
     />
     </View>
     <View >
     {apiError != null && 
     <View style={{marginBottom:10 }}>
     <Text style={{ color: themeColors.error,marginTop:2 }}>{apiError}</Text>
     </View>
     }
     <ButtonPrimary title="Sign up" onPress={handleSubmit} disabled={isLoading || !dirty} isLoading = {isLoading}/>

     <View style={{flexDirection:'row',marginTop:20}}>
      <Text>Already have an account?</Text>  
      <Link title='Login here' onPress={()=> navigation.navigate('Login')} />
      </View>
     </View>
     
    
   </View>
  )
}

export default LoginScreen;

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