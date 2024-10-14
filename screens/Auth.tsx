// // Auth.js
// import React, { useEffect } from 'react';
// import { View, Button, Alert } from 'react-native'; 
// import * as Google from 'expo-auth-session/providers/google';

 

// const [request, response, promptAsync] = Google.useAuthRequest({
//   clientId: '8518678380-56ml695ects1h19hbk35cvf2l7oh6ajp.apps.googleusercontent.com',
// });

// useEffect(() => {
//   if (response?.type === 'success') {
//     const { authentication } = response;
//     // Handle Google sign-in success
//     Alert.alert(authentication+' Successfully Login');
//   }
// }, [response]);

// // Auth Component
// const Auth = () => {
//   return (
//     <View>
      
//       <Button
//     disabled={!request}
//     title="Login with Google"
//     onPress={() => {
//       promptAsync();
//     }}
//   />
//     </View>
//   );
// };

// export default Auth;
