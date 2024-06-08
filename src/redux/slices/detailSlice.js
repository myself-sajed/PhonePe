import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    paymentDetails: null
}

export const paymentDetailsSlice = createSlice({
    name: 'paymentDetails',
    initialState,
    reducers: {
        setPaymentDetails: function (state, action) {
            state.paymentDetails = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setPaymentDetails, } = paymentDetailsSlice.actions

export default paymentDetailsSlice.reducer