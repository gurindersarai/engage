import { GiftedChat } from 'react-native-gifted-chat';
import { TextInput,StyleSheet, Text, View,SafeAreaView,SectionList,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useContext, useEffect,useCallback,useState,useRef } from 'react'
import { ThemeContext } from '../../components/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { getCredentials } from '../../utils/mmkvStorage';
import { Formik,useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch,useSelector } from 'react-redux';
import { commonColors } from '../../styles/index';
import { fetchMessages } from '../../redux/actions/messageActions.js';
import { appendMessage,prependMessage,setStart } from '../../redux/slices/messageSlice';

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Please enter your Message")
});

const MessageListTest = () => {
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const textInputRef = useRef(null);

  // const { user: uto } =  2;
  const uto = {name :' USER 2'} 
  const to = 2;
  const {user} = useSelector((state) => state.auth);
  const ws = useSelector((state) => state.websocket.ws);
  const {messages,pagination,isLoading,apiError} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const credentials = getCredentials();
  const navigation = useNavigation();
  const themeColors = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputHeight, setInputHeight] = useState(40);

  let typingTimer;
  const TYPING_DELAY = 500; // Adjust
  const { setFieldValue,touched, handleSubmit, resetForm, values, errors,setErrors,dirty } = useFormik({
    initialValues: {
      content: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('VV',values);
      sendMessage();
      resetForm();
    },
  });
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
  const sendMessage =() => {

    const msgData = {
      _id:Date.now(),
      from:user.user.id,
      to:to,
        content: values.content,
        text: values.content,
        user:{_id:user.user.id},
        isTyping:false,
    }
      console.log("ws Send!",msgData);
      
      ws.send(JSON.stringify(msgData));
      dispatch(prependMessage(msgData));

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
   
  }
  
}

const tEle = (name,isTyping) => {
  return <View><Text style={{color:'#fff',fontWeight: 'bold',fontSize:20}}>{name}</Text>{ isTyping && <Text style={{color:'#ddd',fontStyle: 'italic',fontSize:10}}>is Typing..</Text>}</View>;
}

  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) =>{
    const paddingToTop = 80;
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }
  const wsConnect = async () => {
    if(!credentials.token){
      return false;
    }
    ws.onopen = (e) => {
    console.log("ws connected!",ws);
  }
  ws.onmessage = function (event) {
    console.log('onMessage',event);
    const data = JSON.parse(event.data);
    navigation.setOptions({ headerTitle:() => ( tEle(uto.name,data.isTyping) ) });
    if(data.content){
    dispatch(prependMessage(data));
    }
  };

  ws.onerror = function (event) {
    console.log('WebSocket error:', event);
  };
  }
  ws.onclose = function (event) {
    console.log('WebSocket connection closed:', event);
  };
  useEffect(() => {
    wsConnect();

    dispatch(setStart());
    dispatch(fetchMessages(to));
    navigation.setOptions({ title: 'Updated!' });

    // console.log('user ',user);
    // if(messages != null){console.log(messages);}
  },[]);
  const handleContentSizeChange = (event) => {
    // Update the input's height based on the content height
    const { height } = event.nativeEvent.contentSize;
    setInputHeight(height < 40 ? 40 : height); // Set a minimum height of 40 (adjust as needed)
  };
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
  return (
    <View style={{ backgroundColor: "#000000", flex: 1 }}>
 {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    { messages && 
    <GiftedChat
    style={{color:'#222'}}
      messages={messages}
      user={{ _id: user.user.id }}
      // isLoadingEarlier ={isLoadingEarlier}
      // loadEarlier={true}
      onSend={messages => onSend(messages)}
      alwaysShowSend={true}
      // textInputProps={{
      //   onChangeText: (text) => setFieldValue('content',text),
      //   value: values.content,
      // }}
      renderComposer={renderCOM}
      textInputRef={textInputRef}
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
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    // height: 40,
    padding: 4,
    backgroundColor:'#121212',
    // borderRadius:8,
  },
  button: {
    padding: 15,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default MessageListTest;
