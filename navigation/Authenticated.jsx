import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CameraScreen from '../screens/Camera/CameraScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import MessageStack from '../screens/Messages/MessageStack';
import MessageListTest from '../screens/Messages/MessageListTest';
import CameraPermissionsScreen from '../screens/Camera/CameraPermissionsScreen';
import Header from '../components/Header';
import { Text } from 'react-native';
import { ThemeContext } from '..//components/ThemeProvider';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import React, { useEffect, useState,useContext } from 'react';
import {Svg, SvgUri, Circle,Ellipse,Line, G,Rect, Path,Polyline,Polygon,getUriFromSource} from 'react-native-svg';
import { useDispatch,useSelector } from 'react-redux';
import { setWebSocket } from '../redux/slices/websocketSlice';
import { getCredentials } from '../utils/mmkvStorage';

const Tab = createBottomTabNavigator();

const Authenticated = () => {
  const credentials = getCredentials();
  const dispatch = useDispatch();
  const ws = useSelector((state) => state.websocket.ws);
  
  useEffect(() => {
    if (!ws) {
      const newWebSocket = new WebSocket(`ws://192.168.225.88:6001?token=${encodeURIComponent(credentials.token)}`);
      console.log('NEW',newWebSocket);
      dispatch(setWebSocket(newWebSocket));
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws, dispatch]);
    const themeColors = useContext(ThemeContext);
    const [cameraPermission, setCameraPermission] = useState(CameraPermissionStatus);
    const [microphonePermission, setMicrophonePermission] = useState(CameraPermissionStatus);
  
    useEffect(() => {
      Camera.getCameraPermissionStatus().then(setCameraPermission);
      Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
    }, []);
    console.log(`Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`);

    if (cameraPermission == null || microphonePermission == null) {
      // still loading
      return null;
    }
    const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';
  return (
    <Tab.Navigator
    initialRouteName={showPermissionsPage ? 'CameraPermissionsScreen' : 'HomeScreen'}
      screenOptions={({ route }) => ({
        cardStyle: { backgroundColor: 'black' },
        tabBarShowLabel:false,
        tabBarIcon: ({ focused, color }) => {
          let icon;

          if (route.name === 'Home') {
            icon =
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={focused ? themeColors.primary: 'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><Polyline points="9 22 9 12 15 12 15 22"/></Svg>
            ;
          } else if (route.name === 'Map') {
            icon = 
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={focused ? themeColors.primary: 'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map"><Polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><Line x1="8" y1="2" x2="8" y2="18"/><Line x1="16" y1="6" x2="16" y2="22"/></Svg>
            ;
          }else if (route.name === 'Profile') {
            icon = 
            <Svg  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={focused ? themeColors.primary: 'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><Circle cx="12" cy="7" r="4"/></Svg>
            ;
          } else if (route.name === 'Settings') {
            icon = focused ? '⛭' : '⛭';
          }
           else if (route.name === 'Camera') {
            icon = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={focused ? themeColors.primary: 'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera"><Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><Circle cx="12" cy="13" r="4"/></Svg>
          ;
          }
           else if (route.name === 'MessageStack' || route.name === 'MessageTest') {
            icon = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={focused ? themeColors.primary: 'white'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Svg>
          ;
          }

          return <Text style={{ color ,fontSize:24}}>{icon}</Text>;
        },
        tabBarStyle: {
            backgroundColor: themeColors.background,
            borderTopColor:themeColors.background
          },
        header: () => <Header />,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      {/* <Tab.Screen name="CameraPermissions" component={CameraPermissionsScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="MessageTest" component={MessageListTest} />

      <Tab.Screen name="MessageStack" component={MessageStack} options={{headerShown: false }}/>
      {/* <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      {/* Add more tab screens */}
    </Tab.Navigator>
  );
};
export default Authenticated;