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
import { appendMessage,setStart } from '../../redux/slices/messageSlice';

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
    return <View><Text style={{color:'#fff',fontWeight: 'bold',fontSize:20}}>{name}</Text>{ isTyping && <Text style={{color:'#ddd',fontStyle: 'italic',fontSize:10}}>is Typing..</Text>}</View>;
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
    if(data.content){
    dispatch(appendMessage(data));
    }
  };

  ws.onerror = function (event) {
    console.log('WebSocket error:', event);
  };
  }
  ws.onclose = function (event) {
    console.log('WebSocket connection closed:', event);
  };
  const sendMessage = async () => {
    const msgData = {
      from:user.user.id,
      to:to,
        content: values.content,
        isTyping:false,
    }
      console.log("ws Send!",msgData);
      
      ws.send(JSON.stringify(msgData));
      dispatch(appendMessage(msgData));

}
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

const handleContentSizeChangeList = () => {
  if (sectionListRef.current) {
    sectionListRef.current?.getScrollResponder()?.scrollTo({ y: 1755, animated: false });
  }
};
const handleScroll = useCallback((event) => {
  const currentTime = Date.now();
  if (currentTime - lastCallTimeRef.current > 100) {
    lastCallTimeRef.current = currentTime;

  const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

  // Calculate the distance from the top before calling loadMore
  const distanceFromTop = contentOffset.y;
 const contentSizeHeight = contentSize.height;
 const layoutMeasurementHeight = layoutMeasurement.height;
  // Adjust this value to trigger loadMore slightly before reaching the top.
  let triggerDistance = contentSizeHeight - layoutMeasurementHeight; // 50 pixels, adjust as needed
   triggerDistance = triggerDistance - 80; // 50 pixels, adjust as needed
  //  console.log('distanceFromTop: ',distanceFromTop);
  //  console.log('contentOffset: ',contentOffset);
   console.log('layoutMeasurement: ',layoutMeasurement);
   console.log('contentSize: ',contentSize);
   console.log('Distance check : '+distanceFromTop+' == '+triggerDistance+' ');
  if (distanceFromTop >= -30 && distanceFromTop <= 5 && !isLoading) {
    handleLoadMoreMessages();
    // setContentSize(conten);
  }
}
}, [pagination]);
useEffect(() => {
    wsConnect();
    dispatch(setStart());
    // console.log('isLoading INSIDE',isLoading);

    dispatch(fetchMessages(to));
    
    if(!isLoading && (messages != null)){
    
    const timeoutId = setTimeout(() => {
      sectionListRef.current?.getScrollResponder()?.scrollToEnd({ animated: false });

      if (sectionListRef.current) {
        sectionListRef.current.setNativeProps({
          style: { opacity: 1 }, // Replace 'relative' with your desired position value
        });
      }
      return () => clearTimeout(timeoutId);

    },800);
  }
}, []);
const renderitem = useCallback(
  ({ item }) => <Message message={item} user={user.user.id} />,[messages]
);
const keyextractor = useCallback(
 (item, index) => index.toString(),[messages]
);
const rendersectionHeader = useCallback(
 ({section: {date}}) => (
          <Text style={{textAlign:'center'}}>{date}</Text>
        ),[messages]
);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {apiError ? <View><Text>{apiError}</Text></View>: null}
      {isLoading ? <View style={{alignSelf:'center'}}><Text> <ActivityIndicator /></Text></View> : null}
       {messages == null ? null : 
       <SectionList
       ref={sectionListRef}
       sections={messages}
       keyExtractor={keyextractor}
       renderItem={renderitem}
        renderSectionHeader={rendersectionHeader}
       onScroll={handleScroll}
      // inverted
      //  style={{opacity:0}}
      //  onContentSizeChange={handleContentSizeChangeList}

      //  windowSize={10} 
        />}
  


    <View style={[styles.input,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:6,width:'100%'}]}>
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
     {/* {error && <Text style={{ color: themeColors.error,marginTop:2 }}>{error}</Text>} */}
    {/* </View> */}
     {/* <View style={{flexGrow:0}}> */}
      <TouchableOpacity style={[styles.button,{backgroundColor:commonColors.primary}]} onPress={handleSubmit} >
        
        <Text style={[styles.buttonText,{ color:themeColors.text }]}> Send</Text>
      </TouchableOpacity>
      {/* </View> */}
    </View>
    {/* <MessageSendForm /> */}
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