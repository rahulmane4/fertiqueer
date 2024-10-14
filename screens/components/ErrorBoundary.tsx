// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ErrorBoundary = ({ children }) => {
//   const [hasError, setHasError] = useState(false);

//   // Simulate componentDidCatch using a custom hook
//   useEffect(() => {
//     const errorHandler = (error, errorInfo) => {
//       // You can log the error to an error reporting service here
//       console.log(error, errorInfo);
//       setHasError(true);
//     };

//     // Add global error listener
//     const errorListener = (event) => {
//       errorHandler(event.error);
//     };

//     window.addEventListener('error', errorListener);

//     // Cleanup the event listener on unmount
//     return () => {
//       window.removeEventListener('error', errorListener);
//     };
//   }, []);

//   if (hasError) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Something went wrong.</Text>
//       </View>
//     );
//   }

//   return children;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//   },
// });

// export default ErrorBoundary;
