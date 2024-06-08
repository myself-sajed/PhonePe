import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    component: 'banks',
    isBalanceModalOpen: false,
    isUPIModalOpen: false,
    details: null
}

export const checkBalanceSlice = createSlice({
    name: 'checkBalance',
    initialState,
    reducers: {
        setComponent: (state, action) => {
            state.component = action.payload
        },
        setIsBalanceModalOpen: (state, action) => {
            state.isBalanceModalOpen = action.payload
        },
        setIsUPIModalOpen: (state, action) => {
            state.isUPIModalOpen = action.payload
        },
        setDetails: (state, action) => {
            state.details = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setComponent, setIsBalanceModalOpen, setIsUPIModalOpen, setDetails } = checkBalanceSlice.actions

export default checkBalanceSlice.reducer