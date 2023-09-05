import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const UserList = ({ users }) => {
  return (
    <View style={styles.container}>
      {users.map(user => (
        <View style={styles.card} key={user.id}>
          <Image source={{ uri: user.profileImage ? user.profileImage : 'https://i.pravatar.cc/150?img='+user.id+'' }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.location}>{user.location ?? user.email}</Text>
          </View>
          <Text style={styles.distance}>{user.distance ?? user.id} km</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    marginTop:20
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
});

export default UserList;
