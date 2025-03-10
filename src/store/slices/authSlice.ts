import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/axiosInstance';
import { useAppDispatch } from '../hooks';
import { RootState } from '../store';


// Define the auth state type
interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
};
export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/user/profile`);
            return response.data; // Expecting { user: string, token: string }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
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
export const changeUserInfo = createAsyncThunk(
    'auth/changeUserInfo',
    async ( {firstName}: {firstName: string}, {rejectWithValue}) => {
        try{
            const response =  await api.put('/user',{firstName: firstName});
            console.log(response);
            return response.data;
        } catch (error: any){
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
)
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
    reducers: {
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            console.log("getItem",localStorage.getItem('token'));
        }
    },
    extraReducers: (builder) => {
        builder
            //#region change first Name
            .addCase(changeUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changeUserInfo.fulfilled, (state, action: PayloadAction<{firstName: string }>) => {
                state.loading = false;
                state.user.firstName = action.payload.firstName;
                state.isAuthenticated = true;
            })
            .addCase(changeUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion
            //#region get profile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action: PayloadAction<{user: any}>) => {
                console.log(action.payload);
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion
            //#region register
            .addCase(registerAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAccount.fulfilled, (state, action: PayloadAction<{accessToken: string,user: any  }>) => {
                console.log(action.payload.user);
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
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
            .addCase(loginAccount.fulfilled, (state, action: PayloadAction<{accessToken: string, user: any }>) => {
                state.loading = false;
                // state.token = action.payload.accessToken;
                state.isAuthenticated = true;
                state.user = action.payload.user;
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

export const selectUser = (state: RootState) => state.auth.user;

export const { updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
