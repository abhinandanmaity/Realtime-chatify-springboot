import React, { useEffect, useState } from 'react'
import { MdAttachment } from 'react-icons/md'
import Avatar_ from './Avatar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { storeToken, getToken, storeUserDetails, getUserDetails } from '../../../config/SessionManagement'
import { useDispatch, useSelector } from 'react-redux'
import { setRooms } from '../../../redux/slice/roomSlice'
import { setGroups } from '../../../redux/slice/groupSlice'

const FriendList = () => {

    const dispatch = useDispatch()
    const groups = useSelector((state) => state.groups.value)
    const rooms = useSelector((state) => state.rooms.value)

    const [user, setUser] = useState(getUserDetails())

    const [room, setRoom] = useState()
    const [group, setGroup] = useState()
    const [user_search, setUser_search] = useState()
    const [group_search, setGroup_search] = useState()

    const [inputfieldsearch, setInputfieldsearch] = useState("")

    useEffect(() => {

        axios.get(`/api/rooms/user/${user?.id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((res) => {

                // return res.data
                // console.log("conversations")
                console.log(res.data)
                setRoom(res.data.room)
                dispatch(setRooms(res.data.room))
                setGroup(res.data.group)
                dispatch(setGroups(res.data.group))
                // setGroup(res.data.groups)
                // user.sort((a, b) => {
                //     return a.notification - b.notification;
                // })
                // group.sort((a, b) => {
                //     return a.notification - b.notification;
                // })
                // if (fetchnotification == "notnotification") {

                //     setFetchnotification("notification")
                // } else {
                //     setFetchnotification("notnotification")
                // }
            })
            .catch((callback) => {

                // console.log("callback")
            })

        //   return () => {}
    }, [])

    useEffect(() => {

        setGroup(() => groups)
        
        // console.log("groups set LastMessageGroup ")
        // console.log(groups)

    }, [groups])
    useEffect(() => {

        setRoom(() => rooms)
        // console.log("rooms set LastMessage ")
        // console.log(rooms)
    }, [rooms])


    const fetchUsers = async () => {

        if (inputfieldsearch?.trim().length <= 0) {
            setInputfieldsearch("");
            return;
        }

        const regexPattern = new RegExp(inputfieldsearch, 'i');
        const filteredNames = user.filter(name => regexPattern.test(name.name));
        // console.log(filteredNames)
        setUser_search(filteredNames)

        const filteredNames_group = group.filter(name => regexPattern.test(name.name));
        // console.log(filteredNames)
        setGroup_search(filteredNames_group)
        // setFriends(filteredNames)

        // group_search.sort((a, b) => {
        //     return a.notification - b.notification;
        // })
        // user_search.sort((a, b) => {
        //     return a.notification - b.notification;
        // })
    };

    useEffect(() => {

        fetchUsers();

    }, [inputfieldsearch])

    return (
        <>
            <div className="">
                <nav className="mt-4 flex flex-col justify-between
                z-10 ">
                    <ul role="list" className="flex flex-col items-stretch pl-1.5 pr=1">

                        {
                            (inputfieldsearch?.length <= 0 && room) && room.map((item) => {
                                return (
                                    // bg-cyan-700
                                    (
                                        <li className='w-full pl-1 pb-1' key={item._id}>

                                            <Link to={`/chat/conversation/${item.id}`}>
                                                <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                    bg-sky-800 hover:bg-sky-800
                    transition
                                ">

                                                    {item && item.users.map((user) => {
                                                        return (
                                                            <div className="flex flex-row justify-center items-center pl-1.5"
                                                                key={user.id}
                                                            >
                                                                <div className="">
                                                                    <Avatar_ className='' image={user.image} _id={user.id} />
                                                                </div>
                                                                <div className="">

                                                                    <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{user && user.name?.length > 19 ? (user.name).slice(0, 17) + " ..." : user.name}</div>
                                                                    {(item && item.lastMessage?.content) && <div className="text-xxs lmd:text-xs pl-3">{item.lastMessage?.content?.length > 26 ? (item.lastMessage?.content).slice(0, 25) + " ..." : item.lastMessage?.content}</div>}
                                                                    {(item && item.lastMessage?.attachments != "" && item.lastMessage?.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                                        <MdAttachment className="text-white text-lg " />
                                                                    </div> attachment</div>}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                    <div className="flex flex-col justify-center items-end">
                                                        <div className="text-xxxs lmd:text-xxs">
                                                            {/* {(item.lastMessage?.msgDateTime && Math.floor((new Date() - item.lastMessage?.msgDateTime) / 1000) > 202) ? "a few seconds" : item.lastMessage?.msgDateTime} */}
                                                            {(item.lastMessage?.msgDateTime && (Math.floor((new Date() - new Date(item.lastMessage?.msgDateTime)) / 1000) < 202
                                                                ? "a few seconds ago"
                                                                : new Date(item.lastMessage?.msgDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                                                            )}


                                                        </div>
                                                        {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                                        {/* {(notification && notification.has(item.chatid)) && <div className="">

                                                    <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                                </div>} */}

                                                    </div>

                                                </div>
                                            </Link>
                                        </li>
                                        // :
                                        //             <li className='w-full pl-2 pb-1 ' key={item._id}>
                                        //                 {
                                        //                 // (item.notification > 0) ?
                                        //                     <Link href={`/chat/conversation/${item.id}`}>
                                        //                         <div className="appearance-none relative px-3 py-3 mb-1 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                                        // bg-green-200 hover:bg-green-200
                                        // transition
                                        // ">

                                        //                             <div className="flex flex-row justify-center items-center pl-1.5">
                                        //                                 <div className="">
                                        //                                     <Avatar_ className='' image={item.image} _id={item.id} />
                                        //                                 </div>
                                        //                                 <div className="">

                                        //                                     <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item && item.users.name.length > 19 ? (item.users.name).slice(0, 17) + " ..." : item.users.name}</div>
                                        //                                     {(item && item.lastMessage.content) && <div className="text-xxs lmd:text-xs pl-3">{item.lastMessage.content.length > 26 ? (item.lastMessage.content).slice(0, 25) + " ..." : item.lastMessage.content}</div>}
                                        //                                     {(item && item.lastMessage.attachments != "" && item.lastMessage.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                        //                                         <MdAttachment className="text-black text-lg" />
                                        //                                     </div> attachment</div>}
                                        //                                 </div>
                                        //                             </div>
                                        //                             <div className="flex flex-col justify-center items-end">
                                        //                                 <div className="text-xxxs lmd:text-xxs">{(item.lastMessage.time && Math.floor((new Date() - item.lastMessage.msgDateTime) / 1000) < 202) ? "a few seconds" : item.lastMessage.msgDateTime}</div>
                                        //                                 {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                        //                                 {/* <div className="text-white pr-2">io</div> */}
                                        //                                 {/* {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                                        //                                             <Badge badgeContent={item.notification} color="success"
                                        //                                                 className=''
                                        //                                             />
                                        //                                         </div>} */}
                                        //                             </div>

                                        //                         </div>
                                        //                     </Link>
                                        //                     // :

                                        //     //                 <Link href={`/chat/conversation/${item.id}`}>
                                        //     //                     <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm  bg-slate-700 flex justify-between cursor-pointer
                                        //     // hover:bg-slate-600
                                        //     // transition
                                        //     // ">

                                        //     //                         <div className="flex flex-row justify-center items-center pl-1.5">
                                        //     //                             <div className="">
                                        //     //                                 <Avatar_ className='' image={item.image} _id={item.id} />
                                        //     //                             </div>
                                        //     //                             <div className="">

                                        //     //                                 <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                                        //     //                                 {(item && item.lastMessage.content) && <div className="text-xxs lmd:text-xs pl-3">{item.lastMessage.content.length > 26 ? (item.lastMessage.content).slice(0, 25) + " ..." : item.lastMessage.content}</div>}
                                        //     //                                 {(item && item.lastMessage.attachments != "" && item.lastMessage.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                        //     //                                     <MdAttachment className="text-white text-lg" />
                                        //     //                                 </div> attachment</div>}
                                        //     //                             </div>
                                        //     //                         </div>
                                        //     //                         <div className="flex flex-col justify-center items-end">
                                        //     //                             <div className="text-xxxs lmd:text-xxs">{(item.lastMessage.time && Math.floor((new Date() - item.lastMessage.msgDateTime) / 1000) > 202) ? "a few seconds" : item.lastMessage.msgDateTime}</div>
                                        //     //                             {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                        //     //                             {/* {(notification && notification.has(item.chatid)) && <div className="">

                                        //     //                             <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                        //     //                         </div>} */}

                                        //     //                         </div>

                                        //     //                     </div>
                                        //     //                 </Link>
                                        //                 }
                                        //             </li>
                                    )
                                )
                            })
                        }
                        {
                            //         (inputfieldsearch.length >= 1 && user_search) && user_search.map((item) => {
                            //             return (
                            //                 // bg-cyan-700
                            //                 (currentChat?.value == item.chatid ? <li className='w-full pl-2 pb-1' key={item._doc._id}>

                            //                     <Link href={`/chat/conversation/${item.id}`}>
                            //                         <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                            //     bg-sky-800 hover:bg-sky-800
                            //     transition
                            //     ">

                            //                             <div className="flex flex-row justify-center items-center pl-1.5">
                            //                                 <div className="">
                            //                                     <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                            //                                 </div>
                            //                                 <div className="">

                            //                                     <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                            //                                     {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                            //                                     {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                            //                                         <MdAttachment className="text-white text-lg" />
                            //                                     </div> attachment</div>}
                            //                                 </div>
                            //                             </div>
                            //                             <div className="flex flex-col justify-center items-end">
                            //                                 <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                            //                                 {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                            //                                 {/* {(notification && notification.has(item.chatid)) && <div className="">

                            //                         <Badge badgeContent={notification.get(item.chatid)} color="success" />
                            //                     </div>} */}

                            //                             </div>

                            //                         </div>
                            //                     </Link>
                            //                 </li>
                            //                     :
                            //                     <li className='w-full pl-2 pb-1 ' key={item._doc._id}>
                            //                         {(item.notification > 0) ?
                            //                             <Link href={`/chat/conversation/${item.id}`}>
                            //                                 <div className="appearance-none relative px-3 py-3 mb-1 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-green-700 focus:border-green-700 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                            // bg-green-200 hover:bg-green-200
                            // transition
                            // ">

                            //                                     <div className="flex flex-row justify-center items-center pl-1.5">
                            //                                         <div className="">
                            //                                             <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                            //                                         </div>
                            //                                         <div className="">

                            //                                             <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                            //                                             {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                            //                                             {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                            //                                                 <MdAttachment className="text-black text-lg" />
                            //                                             </div> attachment</div>}
                            //                                         </div>
                            //                                     </div>
                            //                                     <div className="flex flex-col justify-center items-end">
                            //                                         <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                            //                                         {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                            //                                         {/* <div className="text-white pr-2">io</div> */}
                            //                                         {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                            //                                             <Badge badgeContent={item.notification} color="success"
                            //                                                 className=''
                            //                                             />
                            //                                         </div>}
                            //                                     </div>

                            //                                 </div>
                            //                             </Link>
                            //                             :

                            //                             <Link href={`/chat/conversation/${item.id}`}>
                            //                                 <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm  bg-slate-700 flex justify-between cursor-pointer
                            //     hover:bg-slate-600
                            //     transition
                            //     ">

                            //                                     <div className="flex flex-row justify-center items-center pl-1.5">
                            //                                         <div className="">
                            //                                             <Avatar_ className='' image={item._doc.image} _id={item._doc._id} />
                            //                                         </div>
                            //                                         <div className="">

                            //                                             <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item && item._doc.length > 19 ? (item._doc.name).slice(0, 17) + " ..." : item._doc.name}</div>
                            //                                             {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                            //                                             {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                            //                                                 <MdAttachment className="text-white text-lg" />
                            //                                             </div> attachment</div>}
                            //                                         </div>
                            //                                     </div>
                            //                                     <div className="flex flex-col justify-center items-end">
                            //                                         <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                            //                                         {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                            //                                         {/* {(notification && notification.has(item.chatid)) && <div className="">

                            //                                 <Badge badgeContent={notification.get(item.chatid)} color="success" />
                            //                             </div>} */}

                            //                                     </div>

                            //                                 </div>
                            //                             </Link>
                            //                         }
                            //                     </li>)
                            //             )
                            //         })
                        }

                        {
                            (inputfieldsearch.length <= 0 && group) && group.map((item) => {
                                return (

                                    // (currentChat?.value == item.chatid ?
                                    <li className='w-full pl-2 pb-1' key={item._id}>

                                        <Link to={`/chat/conversation/${item.id}`}>
                                            <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                            bg-sky-800 hover:bg-sky-800
                            transition
                            ">

                                                <div className="flex flex-row justify-center items-center pl-1.5">
                                                    <div className="">
                                                        <Avatar_ className='' image={item.groupimage} />
                                                    </div>
                                                    <div className="">

                                                        <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.name}</div>
                                                        {(item && item.lastMessagegroup?.content) && <div className="text-xxs lmd:text-xs pl-3">{item.lastMessagegroup?.content?.length > 26 ? (item.lastMessagegroup?.content).slice(0, 25) + " ..." : item.lastMessagegroup?.content}</div>}
                                                        {(item && item.lastMessagegroup?.attachments != "" && item.lastMessagegroup?.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                                            <MdAttachment className="text-white  text-lg" />
                                                        </div> attachment</div>}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center items-end">
                                                    <div className="text-xxxs lmd:text-xxs">

                                                        {/* {(item.lastMessage?.msgDateTime && Math.floor((new Date() - item.lastMessage?.msgDateTime) / 1000) > 202) ? "a few seconds" : item.lastMessage?.msgDateTime} */}
                                                        {(item.lastMessagegroup?.msgDateTime && (Math.floor((new Date() - new Date(item.lastMessagegroup?.msgDateTime)) / 1000) < 202
                                                            ? "a few seconds ago"
                                                            : new Date(item.lastMessagegroup?.msgDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
                                                        )}

                                                    </div>
                                                    {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                                                    {/* {(notification && notification.has(item.chatid)) && <div className="">

                                                    <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                                </div>} */}

                                                </div>

                                            </div>
                                        </Link>
                                    </li>
                                    //                 :
                                    //                 <li className='w-full pl-2 pb-1' key={item._doc._id}>
                                    //                     {(item.notification > 0) ? <Link href={`/chat/conversation/${item.id}`}>
                                    //                         <div className="appearance-none relative px-3 py-3 mb-1 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-green-700 focus:z-10 placeholder:text-sm  bg-green-200 flex justify-between cursor-pointer
                                    // hover:bg-green-200
                                    // transition
                                    // ">

                                    //                             <div className="flex flex-row justify-center items-center pl-1.5">
                                    //                                 <div className="">
                                    //                                     <Avatar_ className='' image={item.Groupimage} />
                                    //                                 </div>
                                    //                                 <div className="">

                                    //                                     <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item.Groupname}</div>
                                    //                                     {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                    //                                     {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                    //                                         <MdAttachment className="text-black  text-lg" />
                                    //                                     </div>attachment</div>}
                                    //                                 </div>
                                    //                             </div>
                                    //                             <div className="flex flex-col justify-center items-end">
                                    //                                 <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                    //                                 {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                    //                                 {/* <div className="text-white">io</div> */}

                                    //                                 {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                                    //                                     <Badge badgeContent={item.notification} color="success"
                                    //                                         className=''
                                    //                                     />
                                    //                                 </div>}
                                    //                             </div>

                                    //                         </div>
                                    //                     </Link>
                                    //                         :
                                    //                         <Link href={`/chat/conversation/${item.id}`}>
                                    //                             <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm bg-slate-700  flex justify-between cursor-pointer
                                    // hover:bg-slate-600
                                    // transition
                                    // ">

                                    //                                 <div className="flex flex-row justify-center items-center pl-1.5">
                                    //                                     <div className="">
                                    //                                         <Avatar_ className='' image={item.Groupimage} />
                                    //                                     </div>
                                    //                                     <div className="">

                                    //                                         <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                                    //                                         {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                                    //                                         {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                                    //                                             <MdAttachment className="text-white text-lg" />
                                    //                                         </div> attachment</div>}
                                    //                                     </div>
                                    //                                 </div>
                                    //                                 <div className="flex flex-col justify-center items-end">
                                    //                                     <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                                    //                                     {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                                    //                                     {/* {(notification && notification.has(item.chatid)) && <div className="">

                                    //                             <Badge badgeContent={notification.get(item.chatid)} color="success" />
                                    //                         </div>} */}
                                    //                                 </div>

                                    //                             </div>
                                    //                         </Link>
                                    //                     }
                                    //                 </li>)
                                )
                            })
                        }
                        {
                            //     (inputfieldsearch.length >= 1 && group_search) && group_search.map((item) => {
                            //         return (

                            //             (currentChat?.value == item.chatid ?
                            //                 <li className='w-full pl-2 pb-1' key={item._doc._id}>

                            //                     <Link href={`/chat/conversation/${item.id}`}>
                            //                         <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
                            // bg-sky-800 hover:bg-sky-800
                            // transition
                            // ">

                            //                             <div className="flex flex-row justify-center items-center pl-1.5">
                            //                                 <div className="">
                            //                                     <Avatar_ className='' image={item.Groupimage} />
                            //                                 </div>
                            //                                 <div className="">

                            //                                     <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                            //                                     {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                            //                                     {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex ">
                            //                                         <div className='pr-1.5'>
                            //                                             <MdAttachment className="text-white text-lg" />
                            //                                         </div>
                            //                                         attachment</div>}
                            //                                 </div>
                            //                             </div>
                            //                             <div className="flex flex-col justify-center items-end">
                            //                                 <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                            //                                 {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

                            //                                 {/* {(notification && notification.has(item.chatid)) && <div className="">

                            //                         <Badge badgeContent={notification.get(item.chatid)} color="success" />
                            //                     </div>} */}

                            //                             </div>

                            //                         </div>
                            //                     </Link>
                            //                 </li>
                            //                 :
                            //                 <li className='w-full pl-2 pb-1' key={item._doc._id}>
                            //                     {(item.notification > 0) ? <Link href={`/chat/conversation/${item.id}`}>
                            //                         <div className="appearance-none relative px-3 py-3 mb-1 border-green-700 placeholder:slate-400 text-black rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-green-700 focus:z-10 placeholder:text-sm  bg-green-200 flex justify-between cursor-pointer
                            // hover:bg-green-200
                            // transition
                            // ">

                            //                             <div className="flex flex-row justify-center items-center pl-1.5">
                            //                                 <div className="">
                            //                                     <Avatar_ className='' image={item.Groupimage} />
                            //                                 </div>
                            //                                 <div className="">

                            //                                     <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-black">{item.Groupname}</div>
                            //                                     {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                            //                                     {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                            //                                         <MdAttachment className="text-black  text-lg" />
                            //                                     </div>attachment</div>}
                            //                                 </div>
                            //                             </div>
                            //                             <div className="flex flex-col justify-center items-end">
                            //                                 <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                            //                                 {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                            //                                 {/* <div className="text-white">io</div> */}

                            //                                 {(item.notification > 0) && <div className="text-white pr-2 relative z-0">

                            //                                     <Badge badgeContent={item.notification} color="success"
                            //                                         className=''
                            //                                     />
                            //                                 </div>}
                            //                             </div>

                            //                         </div>
                            //                     </Link>
                            //                         :
                            //                         <Link href={`/chat/conversation/${item.id}`}>
                            //                             <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm bg-slate-700  flex justify-between cursor-pointer
                            // hover:bg-slate-600
                            // transition
                            // ">

                            //                                 <div className="flex flex-row justify-center items-center pl-1.5">
                            //                                     <div className="">
                            //                                         <Avatar_ className='' image={item.Groupimage} />
                            //                                     </div>
                            //                                     <div className="">

                            //                                         <div className=" text-xs lmd:text-xs pl-3 pb-1.5 text-white">{item.Groupname}</div>
                            //                                         {(item && item.content) && <div className="text-xxs lmd:text-xs pl-3">{item.content.length > 26 ? (item.content).slice(0, 25) + " ..." : item.content}</div>}
                            //                                         {(item && item.attachments != "" && item.content == "") && <div className="text-xs lmd:text-xs pl-3 flex "><div className='pr-1.5'>
                            //                                             <MdAttachment className="text-white text-lg" />
                            //                                         </div>attachment</div>}
                            //                                     </div>
                            //                                 </div>
                            //                                 <div className="flex flex-col justify-center items-end">
                            //                                     <div className="text-xxxs lmd:text-xxs">{(item.time && Math.floor((new Date() - item.createdAt) / 1000) > 202) ? "a few seconds" : item.time}</div>
                            //                                     {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}
                            //                                     {/* {(notification && notification.has(item.chatid)) && <div className="">

                            //                             <Badge badgeContent={notification.get(item.chatid)} color="success" />
                            //                         </div>} */}
                            //                                 </div>

                            //                             </div>
                            //                         </Link>
                            //                     }
                            //                 </li>)
                            //         )
                            //     })
                        }

                    </ul>
                </nav>

            </div>

        </>
    )
}

export default FriendList


// {/* <Link to={`/chat/conversation/14`}>
// <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
// bg-sky-800 hover:bg-sky-800
// transition
// ">

//     <div className="flex flex-row justify-center items-center pl-1.5">
//         <div className="">
//             <Avatar_ className='' />
//         </div>
//         <div className="">

//             <div className=" text-xs pl-3 pb-1.5 text-white">Abhi</div>
//             {/* <div className="text-xxs pl-3">Content</div> */}
//             <div className="text-xs pl-3 flex "><div className='pr-1.5'>
//                 <MdAttachment className="text-white text-sm " />
//             </div> attachment</div>
//         </div>
//     </div>
//     <div className="flex flex-col justify-center items-end">
//         <div className="text-xxxs ">12:20</div>
//         {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

//         {/* {(notification && notification.has(item.chatid)) && <div className="">

//             <Badge badgeContent={notification.get(item.chatid)} color="success" />
//         </div>} */}

//     </div>

// </div>
// </Link>
// <Link to={`/api/rooms/conversation/12`}>
// <div className="appearance-none relative px-3 py-3 mb-1 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm flex justify-between cursor-pointer
// bg-sky-800 hover:bg-sky-800
// transition
// ">

//     <div className="flex flex-row justify-center items-center pl-1.5">
//         <div className="">
//             <Avatar_ className='' />
//         </div>
//         <div className="">

//             <div className=" text-xs pl-3 pb-1.5 text-white">Abhi</div>
//             {/* <div className="text-xxs pl-3">Content</div> */}
//             <div className="text-xs pl-3 flex "><div className='pr-1.5'>
//                 <MdAttachment className="text-white text-sm " />
//             </div> attachment</div>
//         </div>
//     </div>
//     <div className="flex flex-col justify-center items-end">
//         <div className="text-xxxs ">12:20</div>
//         {/* <div className="text-xs lmd:text-sm pt-2.5">{item.unseen && "2"}</div> */}

//         {/* {(notification && notification.has(item.chatid)) && <div className="">

//             <Badge badgeContent={notification.get(item.chatid)} color="success" />
//         </div>} */}

//     </div>

// </div>
// </Link> */}