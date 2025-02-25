import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/axiosInstance';


// Define the auth state type
interface AuthState {
    user: string | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
};
export const registerAccount = createAsyncThunk(
    'auth/registerAccount',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/register`, { email, password });
            return response.data; // Expecting { user: string, token: string }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ firstName }: { firstName: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/user/register`, { firstName });
            return response.data; // Expecting { user: string, token: string }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
export const loginAccount = createAsyncThunk(
    'auth/loginAccount',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/login`, { email, password });
            return response.data; // Expecting { user: string, token: string }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
export const logoutAccount = createAsyncThunk('auth/logoutAccount', async () => {
    localStorage.removeItem('token');
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //#region register user

            //#endregion
            //#region register
            .addCase(registerAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAccount.fulfilled, (state, action: PayloadAction<{accessToken: string }>) => {
                state.loading = false;
                state.token = action.payload.accessToken;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(registerAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion
            //#region login
            .addCase(loginAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAccount.fulfilled, (state, action: PayloadAction<{accessToken: string }>) => {
                state.loading = false;
                state.token = action.payload.accessToken;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.accessToken);
            })
            .addCase(loginAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion
            //#region logout
            .addCase(logoutAccount.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
            //#endregion
    }
});

export default authSlice.reducer;
