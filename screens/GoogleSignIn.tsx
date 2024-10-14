// import React, { useEffect } from 'react';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
// import { Button, View, Text, Platform } from 'react-native';

// const GoogleSignIn = () => {
//   useEffect(() => {
//     GoogleSignin.configure({
//    webClientId: '8518678380-56ml695ects1h19hbk35cvf2l7oh6ajp.apps.googleusercontent.com', // From Firebase console
//     //   webClientId: Platform.OS === "ios" ? "IOS CLIENT ID" : "8518678380-56ml695ects1h19hbk35cvf2l7oh6ajp.apps.googleusercontent.com", 
//     //   androidClientId: "ANDROID CLIENT ID",
//     //   iosClientId: "IOS CLIENT ID",
//     });
//   }, []);

//   const onGoogleButtonPress = async () => {
//     try {
//       // Get the user's ID token
//       const  idToken   = await GoogleSignin.signIn();

//       // Create a Google credential with the token
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//       // Sign-in the user with the credential
//       return auth().signInWithCredential(googleCredential);
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('User cancelled the sign-in process');
//       } else {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <View>
//       <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
//     </View>
//   );
// };

// export default GoogleSignIn;
