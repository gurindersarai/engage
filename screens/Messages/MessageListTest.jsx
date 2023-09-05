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
import { appendMessage,setStart } from '../../redux/slices/messageSlice';

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Please enter your Message")
});

const MessageListTest = () => {
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  // const { user: uto } =  2;
  const to = 2;
  const {user} = useSelector((state) => state.auth);
  const {messages,pagination,isLoading,apiError} = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const credentials = getCredentials();
  const navigation = useNavigation();
  const themeColors = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
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



  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) =>{
    const paddingToTop = 80;
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }
  useEffect(() => {
    dispatch(setStart());
    dispatch(fetchMessages(to));
    if(messages != null){console.log(messages);}
  },[]);
  return (
    <View style={{ backgroundColor: "#000000", flex: 1 }}>

    { messages && <GiftedChat
    style={{color:'#222'}}
      messages={messages}
      user={{ _id: user.id }}
      isLoadingEarlier ={isLoadingEarlier}
      loadEarlier={true}
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

export default MessageListTest;
