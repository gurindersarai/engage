import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const convertTimestampToTime = (timestamp) => {
  var hours = timestamp.getHours();
var minutes = timestamp.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+minutes : minutes;
var strTime = hours + ':' + minutes + ' ' + ampm;
return strTime;
}
const Message = ({ message, user }) => {
    // console.log('usr',user);
    // console.log('mess.frm',message.sent_at);
  const isCurrentUser = message.from === user;
  
  const formattedTime = convertTimestampToTime(new Date(message.sent_at));
  return (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
          backgroundColor: isCurrentUser ? '#444' : 'blue',
        },
      ]}
    >
      <Text style={styles.messageText}>{message.content}</Text>
      <Text 
        style={[
          styles.messageTime,
          {
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
          },
        ]}      
      >{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  messageText: {
    color: 'white',
  },
  messageTime: {
    fontStyle: 'italic',
    fontSize: 6,
  },
});

export default React.memo(Message);
