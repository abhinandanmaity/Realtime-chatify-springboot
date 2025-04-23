
import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    value: [],
}

export const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms: (state, action) => {

            state.value = action.payload
        },
        updateRoom: (state, action) => {
            state.value = state.value.map(room =>
                room.id === action.payload.id ? action.payload : room
            );
        },
        deleteRoom: (state, action) => {
            state.value = state.value.filter(room => room.users[0].id !== action.payload);
        },
        updateLastMessageRoom: (state, action) => {

            // console.log("Reducer Called: updateLastMessageRoom", action.payload); // Debugging Log


            state.value = state.value.map(room =>
                room.id === Number(action.payload.convid)
                    ? {
                        ...room,
                        lastMessage: action.payload.lastMessage,
                    }
                    : room
            );
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRooms, updateRoom, deleteRoom, updateLastMessageRoom } = roomSlice.actions

export default roomSlice.reducer