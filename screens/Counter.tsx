import React, { useReducer } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
const initialState = { count: 0 };

const reducer=(state,action)=>{
switch (action.type){
    case 'INCREMENT':
        return { count:state.count+1};
    case 'DECREMENT':
        return {count:state.count-1};
        default :
        return state;
}
}
const Counter = () => {
    const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <View style={styles.container}>
    <Text style={styles.countText}>Count: {state.count}</Text>
    <View style={styles.buttonContainer}>
      <Button title="Increment" onPress={() => dispatch({ type: 'INCREMENT' })} />
      <Button title="Decrement" onPress={() => dispatch({ type: 'DECREMENT' })} />
    </View>
  </View>
);  
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
},
countText: {
  fontSize: 32,
  marginBottom: 20,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '60%',
},
});

export default Counter;