import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isPromptOpen: false
}

export const promptSlice = createSlice({
    name: 'prompt',
    initialState,
    reducers: {
        setPrompt: function (state, action) {
            state.paymentDetails = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setPrompt, } = promptSlice.actions

export default promptSlice.reducer