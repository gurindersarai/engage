import {useEffect} from 'react';
import { Provider  } from 'react-redux';
import store from './redux/store/index.js';
import Navigation from './navigation/Navigation.jsx';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {

  
    useEffect( () => {
async function prepare(){
    try{
        // our api calls will be here.
        new Promise(resolve => setTimeout(resolve,5000)); // wait for 5 secs
    }catch(e){
        console.warn(e);
    }finally{
        SplashScreen.hide();
    }
}
prepare();
});
  return (
   <Provider store={store}>
     <GestureHandlerRootView style={{ flex: 1 }}>
     <Navigation />
        </GestureHandlerRootView>
    </Provider>

  );
};
export default App;
