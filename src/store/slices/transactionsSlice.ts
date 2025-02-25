import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from '../../config';

// Define the auth state type
interface TransactionState {
    transactions: []
    
    
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    
    loading: false,
    error: null,
};
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${config.API_BASE_URL}/auth/login`, { email, password });
            return response.data; // Expecting { user: string, token: string }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: string; token: string }>) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Logout User
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    }
});

export default authSlice.reducer;
