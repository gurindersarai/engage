import { StyleSheet,View, Text,TouchableOpacity  } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../components/ThemeProvider';
import  Link  from '../components/Link';
import { useDispatch } from 'react-redux';
import { verifyToken,logout } from '../redux/actions/authActions';
import {Svg,Circle,Path} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
    const themeColors = useContext(ThemeContext);
    const dispatch = useDispatch();
    const handleLogOut = () => {
      console.log('lo');
      dispatch(logout());
    }
    const settingsSvg = <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><Circle cx="12" cy="12" r="3"/><Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></Svg>
    // console.log(themeColors);
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title, { color: themeColors.text }]}>Engage</Text>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Settings')}>
      {settingsSvg}
    </TouchableOpacity>
        </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal:10,
        paddingVertical:14,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#100',
        borderBottomColor:'#122',
        borderBottomWidth:1,
      },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
      },
});