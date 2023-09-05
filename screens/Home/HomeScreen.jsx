import { StyleSheet, Text, ActivityIndicator, View,SafeAreaView, Button } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { ThemeContext } from '../../components/ThemeProvider';
import { useDispatch,useSelector } from 'react-redux';
import { verifyToken,logout } from '../../redux/actions/authActions';
import GetLocation from 'react-native-get-location'
import UserList from './UserList'
import { getCredentials } from '../../utils/mmkvStorage';
import notifee from '@notifee/react-native';
import  ButtonPrimary  from '../../components/ButtonPrimary';
const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const credentials = getCredentials();
  const requestLocation = () => {
    setLoading(true);
    setLocation(null);
    setError(null);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        setLoading(false);
        setLocation(newLocation);
      })
      .catch(ex => {
        if (ex instanceof LocationError) {
          const {code, message} = ex;
          console.warn(code, message);
          setError(code);
        } else {
          console.warn(ex);
        }
        setLoading(false);
        setLocation(null);
      });
  };
  const themeColors = useContext(ThemeContext);
 const fetchUsers = async () => {
    
    setUsersLoading(true);
   await fetch('http://192.168.225.88/api/fetchUsers', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${credentials.token}`,
            },
          })
          .then(response => {
            const serverStatus = response.status;
            console.log('USERS TDD',serverStatus);
                    return response.json()
              .then(data => {
                return { serverStatus, data };
              });
          })
          .then(({ serverStatus, data }) => {
            // const message = data.message;
            // setErrors({apiError:message});
            console.log('USERS TE',serverStatus, data);

            if(!data.status){
              console.log('USERS',serverStatus, data);
              
            }else{
              setUsers(data.users);
            }
            setUsersLoading(false);
            
          })
          .catch(error => {
            setUsersLoading(false);
            // console.error('TC Err THIS');

          });
           
};
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    // await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Gurinder Sarai',
      body: 'Hey< Whatsup?',
      android: {
        channelId,
        smallIcon: 'notification_icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        largeIcon: 'notification_icon',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  
const handleLogOut = () => {
  console.log('lo');
  dispatch(logout());
}
  useEffect(() => {
    dispatch(verifyToken());
    // requestLocation();
    fetchUsers();
  }, []);
  
  
  return (
    <SafeAreaView >
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>People Nearby</Text>
      {/* {loading ? <ActivityIndicator /> : null}
      {location ? (
        <Text style={{color: '#f60',
        marginBottom: 5,}}>{JSON.stringify(location, null, 2)}</Text>
      ) : null}
      {error ? <Text style={{color: '#f60',
    marginBottom: 5,}}>Error: {error}</Text> : null} */}
      <ButtonPrimary title="Log out" onPress={handleLogOut} />
      {usersLoading ? <View><Text>Users Loading <ActivityIndicator /></Text></View> : <UserList users={users}/>}
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding:10,
    height:'100%',
    backgroundColor:'#000'
  },
    title: {
        fontSize: 32,
      },
})