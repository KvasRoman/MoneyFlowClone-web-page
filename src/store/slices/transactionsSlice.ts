import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit';
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
        const response = await api.post(`/transaction/create`, data);
        console.log(response);
        return response.data; // Expecting { user: string, token: string }
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }

});
export const editTransaction = createAsyncThunk('transaction/edit', async (data: {id: string, amount: number, description: string, transactionDate: Date, currency: string}, {rejectWithValue}) => {
    try {
        const response = await api.put(`/transaction/${data.id}`, data);
        console.log(response);
        return response.data; // Expecting { user: string, token: string }
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }

});
export const deleteTransaction = createAsyncThunk('transaction/delete', async (id: string, {rejectWithValue}) => {
    try {
        const response = await api.delete(`/transaction/${id}`);
        
        return {...response.data, id}; // Expecting { user: string, token: string }
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
            //#region get transactions
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
            //#endregion
            //#region create transaction
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action: PayloadAction<{ transaction: any}>) => {
                state.loading = false;
                console.log(action.payload);
                state.transactions.push(action.payload);
                state.transactions.sort((a, b) => a.transactionDate > b.transactionDate ? -1 : 1);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion 
            //#region edit transaction
            .addCase(editTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editTransaction.fulfilled, (state, action: PayloadAction<{ id: string}>) => {
                state.loading = false;
                
                const index = state.transactions.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
                state.transactions.sort((a, b) => a.transactionDate > b.transactionDate ? -1 : 1);
            })
            .addCase(editTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion
            //#region delete transaction
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<{ id: string}>) => {
                state.loading = false;
                
                const index = state.transactions.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.transactions.splice(index, 1);
                }
                
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //#endregion
        }
});

export default transactionSlice.reducer;
export const selectTransactions = (state: RootState) => state.transaction.transactions;