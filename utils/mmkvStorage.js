import { MMKV } from 'react-native-mmkv';
// const userId = 1;
export const storage = new MMKV({
  id: `user-storage`,
  encryptionKey: 'hunter2'
});
// console.log(storage.getString('user.names')) // 'Marc'

export const storeCredentials = (user, token) => {
  storage.set('user',  JSON.stringify(user));
  storage.set('token', token);
};

export const getCredentials = () => {
  let unparsedUser = storage.getString('user');
  const user = unparsedUser &&  JSON.parse(unparsedUser);
  const token = storage.getString('token');
  return { user, token };
};

export const clearCredentials = () => {
  storage.delete('user');
  storage.delete('token');
};
