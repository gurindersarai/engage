import { Image, StyleSheet, Text, View,FlatList,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { ThemeContext } from '../../components/ThemeProvider';
// import UserList from '../Home/UserList'
import { useNavigation } from '@react-navigation/native';
import { getCredentials } from '../../utils/mmkvStorage';

const Index = () => {
  const credentials = getCredentials();
  const navigation = useNavigation();
  const themeColors = useContext(ThemeContext);
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const handleUserSelect = (user) => {
    console.log('user',user);
    navigation.navigate('MessageList', { user });
  };
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
const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => handleUserSelect(item)}>
    <View style={styles.card} key={item.id}>
          <Image source={{ uri: item.profileImage ? item.profileImage : 'https://i.pravatar.cc/150?img='+item.id+'' }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{item.name}</Text>
            <Text style={styles.location}>{item.location ?? item.email}</Text>
          </View>
          <Text style={styles.distance}>{item.distance ?? item.id} km</Text>
        </View>
  </TouchableOpacity>
);
useEffect(() => {
  fetchUsers();
}, []);
  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* <Text style={[styles.title, { color: themeColors.text }]}>Users</Text> */}
      {usersLoading ? <View><Text>Users Loading <ActivityIndicator /></Text></View> :  <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(user) => user.id.toString()}
    />}
     
    </View>
  )
}

export default Index;

const styles = StyleSheet.create({
  container: {
    padding:10,
    height:'100%'
  },
    title: {
        color: 'black',
        fontSize: 32,
        marginBottom:20
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 20,
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      userInfo: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 10,
      },
      username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      location: {
        fontSize: 14,
        color: '#ddd',
      },
      distance: {
        fontSize: 14,
        fontWeight: 'bold',
      },
})