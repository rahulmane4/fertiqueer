import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS,AUTH_ERROR } from '../actions/actions_types';

// Action to register a user
export const register = (email, password) => {
    return async (dispatch) => {
        // Simulate registration logic here (e.g., API call)
        
        // Save to AsyncStorage
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);
        
        dispatch({ type: REGISTER_SUCCESS, payload: { email, password } });
    };
};

// Action to login a user
export const loginCall = (email:string, password:string) => {
    return async (dispatch) => {
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPassword = await AsyncStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                dispatch({ type: LOGIN_SUCCESS, payload: { email } });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload: error.message });
        }
    };
};

// Action to logout
export const logout = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userPassword');
        dispatch({ type: LOGOUT });
    };
};
