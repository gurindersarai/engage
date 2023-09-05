import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
          placeholder="Type here..."
        />
        <Button title="Submit" onPress={() => console.log('Submit button pressed')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
});

export default App;
