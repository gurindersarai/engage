import React from 'react'
import SettingsScreen from '../screens/Settings/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const Settings = () => {
  return (
    <Stack.Navigator
    screenOptions={({ route }) => ({ 
        header: () => <Header />,
      })}
    >

        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false }} />

  </Stack.Navigator>
  )
}

export default Settings