import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { config } from '../../config';
import { RootState } from '../store';
import api from '@/api/axiosInstance';

// Define the auth state type
interface TransactionState {
    transactions: any[]
    loadedPages: number[];
    
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    loadedPages: [],
    loading: false,
    error: null,
};
export const getTransactions = createAsyncThunk(
    'transaction/get',
    async (page: number, { rejectWithValue }) => {
        try {
            
            const response = await api.get(`/transaction/list?page=${page}`);
            response.data.page = page;
            return response.data; // Expecting { user: string, token: string }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
export const createTransaction = createAsyncThunk('transaction/create', async (data: {amount: number, description: string, transactionDate: Date, currency: string}, {rejectWithValue}) => {
    try {
        const response = await api.post(`$/transaction/create`, data);
        return response.data; // Expecting { user: string, token: string }
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }

});

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactions.fulfilled, (state, action: PayloadAction<{ transactions: any[], page: number}>) => {
                state.loading = false;
                state.loadedPages.push(action.payload.page);
                console.log(action.payload.transactions);
                state.transactions = state.transactions.concat(action.payload.transactions);
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Logout User
            // .addCase(logoutUser.fulfilled, (state) => {
            //     state.user = null;
            //     state.token = null;
            //     state.isAuthenticated = false;
            // });
    }
});

export default transactionSlice.reducer;
export const selectTransactions = (state: RootState) => state.transaction.transactions;