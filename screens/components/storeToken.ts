import * as Keychain from 'react-native-keychain';

// Storing a token
async function storeToken(token) {
  await Keychain.setGenericPassword('token', token);
}

// Retrieving a token
async function getToken() {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials.password;
  }
  return null;
}

// Deleting a token
async function deleteToken() {
  await Keychain.resetGenericPassword();
}