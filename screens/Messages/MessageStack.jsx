import React from 'react'
import Index from './Index';
import MessageList from './MessageList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

const MessageStack = () => {
  return (
    <View style= { { flex: 1, backgroundColor: '#000' }}>

    <Stack.Navigator
    screenOptions={({ route }) => ({ 
      title: route.params?.user.name || 'Messages', // Set the header title to the user's name
      headerStyle: {
      backgroundColor: 'black', // Set the background color for the header
    },
    headerTintColor: 'white', // Set the text color for the header title and back button
    headerTitleStyle: {
      fontWeight: 'bold', // Adjust the styles for the header title if needed
    },
  })
  
  }
    >

        <Stack.Screen name="Messages" component={Index} />
        <Stack.Screen name="MessageList" component={MessageList} />

  </Stack.Navigator>
  </View>
  )
}

export default MessageStack