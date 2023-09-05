import { StyleSheet, SafeAreaView ,View,Button, Text, TextInput, Image } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../components/ThemeProvider';
import  ButtonPrimary  from '../../components/ButtonPrimary';
import  Link  from '../../components/Link';
import  EtextInput  from '../../components/EtextInput';
import { Formik,useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions.js';
import { useNavigation } from '@react-navigation/native';

// Define a validation schema for the form inputs
const validationSchema = Yup.object().shape({
  emailUsername: Yup.string()
    .required('Email or username is required')
    .test('emailUsername', 'Invalid email or username', (value) => {
      // Regular expression to check if the input is a valid email or a valid username
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const usernameRegex = /^[A-Z0-9_-]{3,15}$/i;

      return emailRegex.test(value) || usernameRegex.test(value);
    }),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters")
});
const RegisterScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { isLoading, apiError } = useSelector((state) => state.auth);

  const themeColors = useContext(ThemeContext);
    // Use useFormik hook to handle form state and submission
    const { handleChange,touched, handleSubmit, values, errors,setErrors,dirty } = useFormik({
      initialValues: {
        emailUsername: "",
        password: ""
      },
      validationSchema,
      onSubmit: async (values,{resetForm}) => {
        console.log('VV',values);
       dispatch(login(values));
       resetForm();
      },
    });

  return (
    <SafeAreaView style={[styles.container, { paddingHorizontal: 20,backgroundColor: themeColors.background}]}>
      <View style={[ {alignItems:'center',marginVertical:50 }]}>
      {/* <Text style={[styles.title, { color: themeColors.text }]}>Engage</Text> */}
      <Image
      source={require('../../assets/logo.jpeg')}
      style={{ width: 122, height: 122}}
    />
      </View>
      
      <Text style={[ {fontSize: 24, color: themeColors.text,marginBottom:10 }]}>Login to your account</Text>

      <View style={{ marginTop: 20,marginBottom:20}}>
     <EtextInput
       value={values.emailUsername}
       onChangeText={handleChange("emailUsername")}
       placeholder="Enter your Email or Username"
       label="Email/Username"
       error={touched.emailUsername && errors.emailUsername}
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
     <ButtonPrimary title="Log in" onPress={handleSubmit} disabled={isLoading || !dirty} isLoading = {isLoading}/>

     <View style={{flexDirection:'row',marginTop:20}}>
      <Text>Don't have an account?</Text>  
      <Link title='Register here' onPress={()=> navigation.navigate('Register')} />
      </View>
     </View>
     
    
   </SafeAreaView >
  )
}

export default RegisterScreen;

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