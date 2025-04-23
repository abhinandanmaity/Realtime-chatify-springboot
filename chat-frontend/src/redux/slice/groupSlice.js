
import { createSlice } from '@reduxjs/toolkit'


const initialState = {

    value: [],
}

export const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setGroups: (state, action) => {

            state.value = action.payload
        },
        updateGroup: (state, action) => {
            state.value = state.value.map(group =>
                group.id === action.payload.id ? action.payload : group
            );
        },
        deleteGroup: (state, action) => {
            state.value = state.value.filter(group => group.id !== action.payload);
        },
        addGroup: (state, action) => {
            state.value.push(action.payload);  // Add the new group to the array
        },
        updateLastMessageGroup: (state, action) => {
            state.value = state.value.map(group =>
                group.id === Number(action.payload.convid)
                    ? {
                        ...group,
                        lastMessagegroup: action.payload.lastMessagegroup,
                    }
                    : group
            );
        },
        
    },
})

// Action creators are generated for each case reducer function
export const { setGroups, updateGroup, deleteGroup, addGroup, updateLastMessageGroup } = groupSlice.actions

export default groupSlice.reducer