import { configureStore } from '@reduxjs/toolkit'
import checkBalance from './slices/checkBalance'
import userSlice from './slices/userSlice'
import detailSlice from './slices/detailSlice'
import promptSlice from './slices/promptSlice'

export const store = configureStore({
    reducer: {
        checkBalance: checkBalance,
        user: userSlice,
        paymentDetails: detailSlice,
        prompt: promptSlice,
    }


})