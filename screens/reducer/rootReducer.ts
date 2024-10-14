/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { landingPageApi } from '../apiEndPoints/apiEndPoints';
export const getUserList = createAsyncThunk('user/userList', async () => {
    const resultData = await landingPageApi();
    return resultData?.data?.data;
});


const user = createSlice({
    name: 'user',
    initialState: {
        data: [],
        error: null,
        isLoading: false,
        username: '',
    },
    reducers: {
        setusername: (state, action) => {
            state.username = action.payload;
        },
    },
    extraReducers: {
        [getUserList.pending]: (state, action) => {
            state.isLoading = true;

        },
        [getUserList.fulfilled]: (state, action) => {
            if (action?.payload.length > 1) { state.data = action.payload; }
            else { state.error = 'Received a differrent data type'; }
            state.isLoading = false;
        },
        [getUserList.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.message;
        },
    },
});
export default user;