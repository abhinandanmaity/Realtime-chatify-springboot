// "use client"

import { configureStore } from '@reduxjs/toolkit'
import sessionSlice from './slice/user/sessionSlice'
import conversationidSlice from './slice/conversationidSlice'
import groupprofileSlice from './slice/groupprofileSlice'
import userprofileSlice from './slice/userprofileSlice'
import messagesSlice from './slice/messagesSlice'
import onlineuserSlice from './slice/onlineuserSlice'
import roomSlice from './slice/roomSlice'
import groupSlice from './slice/groupSlice'

const store = configureStore({
  reducer: {
    session: sessionSlice,
    currentchatid: conversationidSlice,
    groupprofile: groupprofileSlice,
    userprofile: userprofileSlice,
    messages: messagesSlice,
    onlineuser: onlineuserSlice,
    rooms: roomSlice,
    groups: groupSlice
  },
})

export default store;