import {NavigationContainer} from '@react-navigation/native';
import {useEffect,useState} from 'react';
import { ThemeProvider } from '../components/ThemeProvider';
import { useDispatch, useSelector  } from 'react-redux';
import { clearCredentials, getCredentials } from '../utils/mmkvStorage';
import { tempAuthValidation } from '../redux/actions/authActions';
import Authenticated from './Authenticated';
import Auth from './Auth';
import { Settings } from 'react-native';


const Navigation = () => {
  const dispatch = useDispatch();
  let credentials = getCredentials();
  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {

    // clearCredentials();
    if(credentials.token != undefined){
    dispatch(tempAuthValidation(credentials));
    }
  }, []);

  // console.log('gg',getCredentials());

  return (
    <ThemeProvider>
    <NavigationContainer>
    {isAuthenticated ? 
    <Authenticated />
    :<Auth/> }
   
  </NavigationContainer>
  </ThemeProvider>

  )
}

export default Navigation
