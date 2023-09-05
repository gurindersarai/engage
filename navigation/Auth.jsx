import React from 'react'
import LoginScreen from '../screens/Auth/LoginScreen';
import MessageListTest from '../screens/Messages/MessageListTest';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator>

        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false }}/>
        <Stack.Screen name="MessageListTest" component={MessageListTest} />


  </Stack.Navigator>
  )
}

export default Auth