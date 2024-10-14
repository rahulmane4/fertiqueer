import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGOUT, LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERROR } from '../actions/actions_types';
const user = AsyncStorage.getItem('user');
// const initialState = {
//     isAuthenticated: false,
//     user: null,
//     error: null,
// };
const initialState = user ?
    {
        isAuthenticated: true,
        isLoggedIn: true,
        user,
        error: null,
    } :
    {
        isAuthenticated: false,
        isLoggedIn: false,
        user: null,
        error: null,
    };
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, user: action.payload };
        case LOGOUT:
            return { ...state, isAuthenticated: false, user: null };
        case REGISTER_SUCCESS:
            return { ...state, user: action.payload };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
export default authReducer;