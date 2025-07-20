
import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    value: [],
}

export const messagesSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setMessages: (state, action) => {

            state.value = action.payload
        },
        clearMessages: (state) => {
            state.user = null; // Clear user data
        },
        // decrement: (state) => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setmessages } = messagesSlice.actions

export default messagesSlice.reducer