import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transactionReducer from './slices/transactionsSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        transaction: transactionReducer
    },
    devTools: process.env.NODE_ENV !== "production", // Disable in production
});

// Infer RootState and AppDispatch from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
