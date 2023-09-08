import { TextInput,StyleSheet, Text, View,SafeAreaView,SectionList,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useCallback,useState,useRef } from 'react'
import { ThemeContext } from '../../components/ThemeProvider';
// import UserList from '../Home/UserList'
import { useNavigation } from '@react-navigation/native';
import { getCredentials } from '../../utils/mmkvStorage';
import { Formik,useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch,useSelector } from 'react-redux';
import { commonColors } from '../../styles/index';
// import MessageSendForm from './MessageSendForm';
import { fetchMessages } from '../../redux/actions/messageActions.js';
import { appendMessage,prependSingleMessage,prependMessage,setStart } from '../../redux/slices/messageSlice';
import { GiftedChat,Send } from 'react-native-gifted-chat';
import {Svg, SvgUri, Circle,Ellipse,Line, G,Rect, Path,Polyline,Polygon,getUriFromSource} from 'react-native-svg';

import Message from './Message';

const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required("Please enter your Message")
  });

const MessageList = ({ route }) => {
  const sectionListRef = useRef(null); // Create a ref for the FlatList
  const lastCallTimeRef = useRef(0);

    const { user: uto } = route.params;
    const to = parseInt(uto.id);
    const {user} = useSelector((state) => state.auth);
    const ws = useSelector((state) => state.websocket.ws);
    const {messages,pagination,isLoading,apiError} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    console.log('isLoading',isLoading);
    // console.log('U',route)
    const [isEndReached, setIsEndReached] = useState(false);

  const credentials = getCredentials();
  const navigation = useNavigation();
  const themeColors = useContext(ThemeContext);
  const [usersLoading, setUsersLoading] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);
  const [currentPage, setCurrentPage] = useState(1);
  const handleUserSelect = (user) => {
    navigation.navigate('MessageList', { user });
  };
  let typingTimer;
  const TYPING_DELAY = 500; // Adjust
  
  const { setFieldValue,touched, handleSubmit, resetForm, values, errors,setErrors,dirty } = useFormik({
    initialValues: {
      content: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('VV',values);
      sendMessage();
      resetForm();
    },
  });
  const tEle = (name,isTyping) => {
    return <View><Text style={{color:'#fff',fontWeight: 'bold',fontSize:20}}>{name}</Text>{ isTyping && <Text style={{color:'#70d6ff',fontStyle: 'italic',fontSize:14}}>is Typing..</Text>}</View>;
  }
  const wsConnect = async () => {
    if(!credentials.token){
      return false;
    }
    ws.onopen = (e) => {
    console.log("ws connected!",ws);
    setWs(ws);
  }
  ws.onmessage = function (event) {
    console.log('onMessage',event);
    const data = JSON.parse(event.data);
    navigation.setOptions({ headerTitle:() => ( tEle(uto.name,data.isTyping) ) });
    if(data._id && data.content){
      // GiftedChat.append();
    dispatch(prependSingleMessage(data));
    }
  };

  ws.onerror = function (event) {
    console.log('WebSocket error:', event);
  };
  }
  ws.onclose = function (event) {
    console.log('WebSocket connection closed:', event);
  };
  const sendMessage = useCallback((fmessages = []) => {
    const msgData = {
      _id:Date.now(),
      from:user.user.id,
      to:to,
        content: fmessages[0].text,
        text: fmessages[0].text,
        createdAt:new Date(),
        user:{_id:user.user.id},
        isTyping:false,
    }
      console.log("ws Send!",msgData);
      
      ws.send(JSON.stringify(msgData));     
      const gf =  GiftedChat.append(messages,fmessages);
      dispatch(prependSingleMessage(...fmessages));
      console.log('FsSSS',...fmessages);
      console.log('GF',gf);

  }, []);
const onTyping = () => {
  
  clearTimeout(typingTimer);
   ws.send(JSON.stringify({
    from:user.user.id,
    to:to,
      content: false,
      isTyping:true,
  }));
  console.log('Typing..');
  typingTimer = setTimeout(() => {
    console.log('Set TimeOut Typing..');

    ws.send(JSON.stringify({
      from:user.user.id,
      to:to,
        content: false,
        isTyping:false,
    }));
      }, TYPING_DELAY);
}

const handleContentSizeChange = (event) => {
  // Update the input's height based on the content height
  const { height } = event.nativeEvent.contentSize;
  setInputHeight(height < 40 ? 40 : height); // Set a minimum height of 40 (adjust as needed)
};
const handleLoadMoreMessages = () =>{
  // console.log('LOAD MEOR');
  // if (!isEndReached) {
    if(pagination?.current_page >= pagination?.last_page){
      return;
    }
    // console.log('LOAD MEOR',pagination.current_page);

  const nextPage = +pagination?.current_page + +1;
  if(!isLoading){
    console.log('Next Page ',to);
    console.log('pagination ',pagination);
    // console.log('messages ',JSON.stringify(messages));
    console.log('isLoading npage ',isLoading);
    dispatch(setStart());
    dispatch(fetchMessages(to,nextPage));
    // sectionListRef.current?.scrollToLocation({
    //     animated: false,
    //     sectionIndex: 2,
    //     itemIndex: 1,
    //     viewPosition: 0
    //   });
  }
  // setCurrentPage(nextPage);
  // setIsEndReached(true);
  // }
  
  
}
const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) =>{
  const paddingToTop = 80;
  return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
}
useEffect(() => {
    wsConnect();
    dispatch(setStart());
    // console.log('isLoading INSIDE',isLoading);

    dispatch(fetchMessages(to));
    

}, []);
const renderCOM = () => {
  return   <View style={[styles.input,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:6,width:'100%'}]}>
  {/* <View style={[{flexGrow:1,marginRight:4}]}> */}
  <TextInput
  style={[{fontSize:15,width:'84%'
}]}
multiline 
onContentSizeChange={handleContentSizeChange}
    placeholder='Enter your Message'
    onChangeText={(text) => {
      setFieldValue('content',text);
      onTyping();
    }}
    value={values.content}
  />
    <TouchableOpacity style={[styles.button,{backgroundColor:commonColors.primary}]} onPress={handleSubmit} >
        
        <Text style={[styles.buttonText,{ color:themeColors.text }]}> Send</Text>
      </TouchableOpacity>
  </View>;
}
const renderSendFunc = (props) =>{
    return (
      <Send
        {...props}
        containerStyle={{
          height: 60,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Svg  width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={themeColors.primary} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><Line x1="22" y1="2" x2="11" y2="13"/><Polygon points="22 2 15 22 11 13 2 9 22 2" /></Svg>
      </Send>
    );
}
const renderCustomActions = (props) => {
  return (
    <TouchableOpacity onPress={() => handleAttachFile()}>
      <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={commonColors.darkGreen} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><Path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></Svg>
    </TouchableOpacity>
  );
}
const handleAttachFile = () =>{
  console.log('Attch');
}
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {apiError ? <View><Text>{apiError}</Text></View>: null}
      {isLoading ? <View style={{alignSelf:'center'}}><Text> <ActivityIndicator /></Text></View> : null}
      { messages && 
    <GiftedChat
    style={{color:'#222'}}
      messages={messages}
      user={{ _id: user.user.id }}
      containerStyle={{
        backgroundColor: themeColors.background
      }}
      // isLoadingEarlier ={isLoadingEarlier}
      // loadEarlier={true}
      onSend={messages => sendMessage(messages)}
      // alwaysShowSend={true}
      // renderComposer={renderCOM}
      // textInputRef={textInputRef}
      onInputTextChanged={text => onTyping()}
      showUserAvatar={false}
      renderAvatar={null}
      renderSend ={renderSendFunc}
      renderActions={renderCustomActions}
      listViewProps={{
        scrollEventThrottle: 400,
        onScroll: ({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent)) {
            console.log('ENDDDD');

            handleLoadMoreMessages()
          }
        }
      }}
    /> }
  
    </SafeAreaView>
  )
}

export default MessageList;

const styles = StyleSheet.create({
  container: {
    padding:10,
    height:'100%',
    
  },
    title: {
        color: 'black',
        fontSize: 32,
      },
      button: {
        padding: 15,
        borderRadius: 6,
      },
      buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
      },
      input: {
        // height: 40,
        padding: 4,
        backgroundColor:'#121212',
        borderRadius:8,
      },
});