import React, { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { setChatid } from '@/redux/slice/conversationidSlice'
// import { setGroupprofile } from '@/redux/slice/groupprofileSlice'
import { PiLinkBold } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import Lottie from 'react-lottie';
import animationData from '../../animation/typing.json'
import { AiFillCloseCircle } from "react-icons/ai";
import Button from '@mui/material/Button'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '../home/Home';
import { storeToken, getToken, storeUserDetails, getUserDetails } from '../../config/SessionManagement'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputMessage from './components/InputMessage';
import { updateLastMessageRoom } from '../../redux/slice/roomSlice';
import { updateLastMessageGroup } from '../../redux/slice/groupSlice';
// import SockJS from 'sockjs-client';
// import { over } from 'stompjs';
import useWebSocketGroup from '../../hooks/useWebSocketGroup';


var selectedChatCompare;
var stompclient = null;
const Conversation = ({ }) => {
    // user, group
    const inputRef = useRef()
    const params = useParams()
    const convid = params.conversationId;
    const dispatch = useDispatch();
    console.log("Conversation " + convid)
    // .map((r) => r.id == convid)
    const rooms = useSelector((state) => state.rooms.value);
    const groups = useSelector((state) => state.groups.value)
    // useSelector((state) => state.userprofile.value)
    const user = getUserDetails()
    const { message, sendMessage } = useWebSocketGroup("http://localhost:8080/ws");


    // const dispatch = useDispatch()
    // dispatch(setChatid(params.conversationid))
    // let socket = io("http://localhost:3000")
    // const { socketusername, socketID, socketstore, socketConnected, setNotification, notification, setFetchnotification, fetchnotification, updategroup } = ChatState()

    // // console.log(params.conversationid)
    const [friend, setFriend] = useState()
    const [group, setGroup] = useState(groups)
    const [loadingprofile, setLoadingprofile] = useState(true)
    const [messages, setMessages] = useState()

    const [content, setContent] = useState("")
    const [attachments, setAttachments] = useState("")

    const [isconnect, setIsConnect] = useState(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [typingid, setTypingid] = useState([]);
    const [typingroomid, setTypingroomid] = useState();
    const [typingselectedChatCompare, setTypingselectedChatCompare] = useState();

    const defaultOptions = {
        loop: true,
        // autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {

        // axios.post('/api/account/get-current-user')
        //     .then((res) => {
        //         // // console.log(res.data)
        //         // setCurruser(res.data)
        //         socket.emit("setup", res.data._id)
        //         setSocketConnected(true);
        //         socketID = res.data._id;
        //     })
        //     .catch(() => {

        //         // // console.log("callback curr")
        //     })
        // socket.on("connection", () => setSocketConnected(true))
        // // console.log(socketuserid, " -- socket -- ", socket.id)

        // socket.on("join-chat", (room) => {

        //     socket.join(room);
        // })

        // socketstore.on("typing", (typ) => {
        //     // // console.log(socketID, " --- socket typing ---- ", id)
        //     const { id, username, roomid } = typ
        //     // // console.log(username)
        //     // // console.log(id)
        //     if (socketID != id) {
        //         setTypingid(username)
        //         setTypingroomid(roomid)
        //         setIsTyping(true)
        //     }
        // });

        // socketstore.on("stop typing", (typ) => {
        //     // // console.log(socketID, " --- socket typing ---- ", id)

        //     const { id, username } = typ
        //     if (socketID != id) {

        //         setTypingroomid()
        //         setTypingid()
        //         setIsTyping(false)
        //     }
        // });
        // socket.on("typing", () => setIsTyping(true));

        // socket.on("stop typing", () => setIsTyping(false));

        // return () => {
        //     // Disconnect from Socket.io server when component unmounts
        //     socket.disconnect(socketID);
        // };
    }, [])

    useEffect(() => {

        axios.get(`/api/messages/conversation/${convid}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((res) => {

                console.log("all messages received")
                console.log(res.data);
                // // const data = {
                // //     id: mychat_id,
                // //     konsa: "getchat"
                // // }
                // axios.post('/api/conversation/update-conversations', {
                //     id: mychat_id,
                //     konsa: "getchat"
                // })
                //     .then((res) => {

                //         // // console.log(" --- fetchnotification --- ");
                //         // setFetchnotification(!fetchnotification)
                //         // setMessages(res.data.messages)
                //         if (fetchnotification == "notnotification") {

                //             setFetchnotification("notification")
                //         } else {
                //             setFetchnotification("notnotification")
                //         }
                //     })
                //     .catch((callback) => {

                //         // console.log("callback")
                //     })

                // // // console.log(res.data)
                setMessages(res.data)
                // // setRoom(res.data.room_id)
                // // setSocketuserid(res.data.socketid)
                // setTypingselectedChatCompare(res.data.room_id)
                // selectedChatCompare = res.data.room_id
                // socketstore.emit('join-chat', res.data.room_id)
                // // dispatch(setmessages(res.data.messages))
            })
            .catch((callback) => {

                // console.log("callback")
            })

        inputRef?.current?.focus();

    }, [])

    useEffect(() => {

        axios.get(`/api/messages/conversation/${convid}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((res) => {

                console.log("all messages received")
                console.log(res.data);
                setContent("");
                // // const data = {
                // //     id: mychat_id,
                // //     konsa: "getchat"
                // // }
                // axios.post('/api/conversation/update-conversations', {
                //     id: mychat_id,
                //     konsa: "getchat"
                // })
                //     .then((res) => {

                //         // // console.log(" --- fetchnotification --- ");
                //         // setFetchnotification(!fetchnotification)
                //         // setMessages(res.data.messages)
                //         if (fetchnotification == "notnotification") {

                //             setFetchnotification("notification")
                //         } else {
                //             setFetchnotification("notnotification")
                //         }
                //     })
                //     .catch((callback) => {

                //         // console.log("callback")
                //     })

                // // // console.log(res.data)
                setMessages(res.data)
                // // setRoom(res.data.room_id)
                // // setSocketuserid(res.data.socketid)
                // setTypingselectedChatCompare(res.data.room_id)
                // selectedChatCompare = res.data.room_id
                // socketstore.emit('join-chat', res.data.room_id)
                // // dispatch(setmessages(res.data.messages))
            })
            .catch((callback) => {

                // console.log("callback")
            })

        inputRef?.current?.focus();

    }, [convid])

    const handlechangetyping = (e) => {

        e.preventDefault()

        if (e.target.name == "content") {
            setContent(e.target.value);
        }
        // // // console.log("socketConnected ", socketConnected)

        // // // console.log("selectedChatCompare ", selectedChatCompare)
        // if (!socketConnected) return;

        // if (!typing) {
        //     setTyping(true);
        //     socketstore.emit("typing", { selectedChatCompare, socketID, socketusername });
        // } else {
        //     // return;
        // }
        // let lastTypingTime = new Date().getTime();
        // var timerLength = 3000;
        // setTimeout(() => {
        //     var timeNow = new Date().getTime();
        //     var timeDiff = timeNow - lastTypingTime;
        //     if (timeDiff >= timerLength && typing) {
        //         socketstore.emit("stop typing", { selectedChatCompare, socketID, socketusername });
        //         setTyping(false);
        //     }
        // }, timerLength);

    }

    const [profile, setProfile] = useState()
    const [imageLoading, setImageLoading] = useState(false)
    const [profile_image, setProfile_image] = useState()
    const [img, setImg] = useState()


    const handleimagechange = (e) => {

        e.preventDefault()
        // setProfile("")
        setProfile(() => "")
    }
    const handleupload = (e) => {

        e.preventDefault();

        // const axios = require('axios').default;

        if (!profile || !profile.name || !profile.size) {

            toast.error("Choose your file first", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const fileSize = (profile.size / 1000)
        const fileExt = profile.name.split(".")[1].toLowerCase()

        if (fileSize > 1700) {

            toast.error("File size must be less than 1700kb", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!["jpg", "png", "jpeg"].includes(fileExt)) {

            toast.error("File extension must be in jpg or png", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        setImageLoading(true);

        const data = new FormData();
        data.append("file", profile)
        data.append('cloud_name', 'flyingbird')
        data.append('upload_preset', 'Squiggiy-S-upload');

        fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

            method: 'POST',
            body: data
        })
            .then(r => r.json())
            .then((data) => {

                // setProfile(data.secure_url)
                setProfile_image(data.secure_url)
                // setLoading(false);
                toast.success('image upload successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // // console.log(data)
            }).catch((err) => {

                setImageLoading(false);
                toast.error("Check internet connection", {
                    position: "bottom-center",
                    autoClose: 901,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const handlesend = (event) => {

        // e.preventDefault();
        // event.preventDefault()
        const room = rooms.filter((r) => r.id == convid)

        const group_ = groups.filter((r) => r.id == convid)

        // console.log(room)
        // console.log(group_)
        if ((room && room.length > 0) && (!group_ || group_.length === 0)) {

            if (profile && profile != undefined && profile != "" && event.key === "Enter") {

                if (!profile || !profile.name || !profile.size) {

                    toast.error("Choose your file first", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                const fileSize = (profile.size / 1000)
                const fileExt = profile.name.split(".")[1].toLowerCase()

                if (fileSize > 1700) {

                    toast.error("File size must be less than 1700kb", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                if (!["jpg", "png", "jpeg"].includes(fileExt)) {

                    toast.error("File extension must be in jpg or png", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }
                // setImageLoading(true);

                const data = new FormData();
                data.append("file", profile)
                data.append('cloud_name', 'flyingbird')
                data.append('upload_preset', 'Squiggiy-S-upload');

                fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

                    method: 'POST',
                    body: data
                })
                    .then(r => r.json())
                    .then((data) => {

                        axios.post(`/api/messages/add-message/${convid}/${user.id}`, {
                            content,
                            attachments: data.secure_url
                        }, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        })
                            .then((res) => {

                                console.log("res.data");
                                console.log(res.data);
                                setProfile()
                                setContent("");
                                // socketstore.emit("new message", res.data.newmessage)
                                setMessages([...messages, res.data])
                                // const lastMessage = res.data
                                dispatch(updateLastMessageRoom({ convid, lastMessage: res.data }))

                            })
                            .catch((callback) => {

                                // console.log("callback")
                            })

                        // setProfile(data.secure_url)
                        setProfile_image(data.secure_url)

                    }).catch((err) => {

                        // setImageLoading(false);
                        toast.error("Check internet connection", {
                            position: "bottom-center",
                            autoClose: 901,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })

            } else if (content && event.key === "Enter") {

                let data = {
                    content
                }

                axios.post(`/api/messages/add-message/${convid}/${user.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                })
                    .then((res) => {

                        console.log("res.data");
                        console.log(res.data);
                        setContent("");
                        // socketstore.emit("new message", res.data.newmessage)
                        setMessages([...messages, res.data])
                        // const lastMessage = res.data
                        dispatch(updateLastMessageRoom({ convid, lastMessage: res.data }))
                    })
                    .catch((callback) => {

                        // console.log("callback")
                    })
            }
        } else if ((!room || room.length === 0) && (group_ && group_.length > 0)) {

            if (profile && profile != undefined && profile != "" && event.key === "Enter") {

                if (!profile || !profile.name || !profile.size) {

                    toast.error("Choose your file first", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                const fileSize = (profile.size / 1000)
                const fileExt = profile.name.split(".")[1].toLowerCase()

                if (fileSize > 1700) {

                    toast.error("File size must be less than 1700kb", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                if (!["jpg", "png", "jpeg"].includes(fileExt)) {

                    toast.error("File extension must be in jpg or png", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }
                // setImageLoading(true);

                const data = new FormData();
                data.append("file", profile)
                data.append('cloud_name', 'flyingbird')
                data.append('upload_preset', 'Squiggiy-S-upload');

                fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

                    method: 'POST',
                    body: data
                })
                    .then(r => r.json())
                    .then((data) => {

                        axios.post(`/api/messages/add-message-group/${convid}/${user.id}`, {
                            content,
                            attachments: data.secure_url
                        }, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        })
                            .then((res) => {

                                console.log("res.data");
                                console.log(res.data);
                                setProfile()
                                setContent("");
                                // socketstore.emit("new message", res.data.newmessage)
                                setMessages([...messages, res.data])
                                const lastMessagegroup = res.data
                                dispatch(updateLastMessageGroup({ convid, lastMessagegroup }))
                                sendMessage({ id: convid, lastMessagegroup: lastMessagegroup });

                            })
                            .catch((callback) => {

                                // console.log("callback")
                            })

                        // setProfile(data.secure_url)
                        setProfile_image(data.secure_url)

                    }).catch((err) => {

                        // setImageLoading(false);
                        toast.error("Check internet connection", {
                            position: "bottom-center",
                            autoClose: 901,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })

            } else if (content && event.key === "Enter") {

                let data = {
                    content
                }

                axios.post(`/api/messages/add-message-group/${convid}/${user.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                })
                    .then((res) => {

                        console.log("res.data");
                        console.log(res.data);
                        setContent("");
                        // socketstore.emit("new message", res.data.newmessage)
                        setMessages([...messages, res.data])
                        const lastMessagegroup = res.data
                        dispatch(updateLastMessageGroup({ convid, lastMessagegroup }))
                        sendMessage({ id: convid, lastMessagegroup: lastMessagegroup });
                    })
                    .catch((callback) => {

                        // console.log("callback")
                    })
            }
        }

        inputRef?.current?.focus();
    }

    const handlesend_ = (e) => {

        e.preventDefault()
        // event.preventDefault()
        const room = rooms.filter((r) => r.id == convid)

        const group_ = groups.filter((r) => r.id == convid)

        console.log(room)
        console.log(group_)
        if ((room && room.length > 0) && (!group_ || group_.length === 0)) {
            if (profile && profile != undefined && profile != "") {

                if (!profile || !profile.name || !profile.size) {

                    toast.error("Choose your file first", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                const fileSize = (profile.size / 1000)
                const fileExt = profile.name.split(".")[1].toLowerCase()

                if (fileSize > 1700) {

                    toast.error("File size must be less than 1700kb", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                if (!["jpg", "png", "jpeg"].includes(fileExt)) {

                    toast.error("File extension must be in jpg or png", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }
                // setImageLoading(true);

                const data = new FormData();
                data.append("file", profile)
                data.append('cloud_name', 'flyingbird')
                data.append('upload_preset', 'Squiggiy-S-upload');

                fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

                    method: 'POST',
                    body: data
                })
                    .then(r => r.json())
                    .then((data) => {

                        axios.post(`/api/messages/add-message/${convid}/${user.id}`, {
                            content,
                            attachments: data.secure_url
                        }, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        })
                            .then((res) => {

                                console.log("res.data");
                                console.log(res.data);
                                setProfile()
                                setContent("");
                                // socketstore.emit("new message", res.data.newmessage)
                                setMessages([...messages, res.data])
                                // const lastMessage = res.data
                                dispatch(updateLastMessageRoom({ convid, lastMessage: res.data }))

                            })
                            .catch((callback) => {

                                // console.log("callback")
                            })

                        setProfile_image(data.secure_url)

                    }).catch((err) => {

                        // setImageLoading(false);
                        toast.error("Check internet connection", {
                            position: "bottom-center",
                            autoClose: 901,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })

            } else if (content) {

                let data = {
                    content
                }

                axios.post(`/api/messages/add-message/${convid}/${user.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                })
                    .then((res) => {

                        console.log("res.data");
                        console.log(res.data);
                        setContent("");
                        // socketstore.emit("new message", res.data.newmessage)
                        setMessages([...messages, res.data])
                        // const lastMessage = res.data
                        dispatch(updateLastMessageRoom({ convid, lastMessage: res.data }))
                    })
                    .catch((callback) => {

                        // console.log("callback")
                    })
            }
        } else if ((!room || room.length === 0) && (group_ && group_.length > 0)) {
            if (profile && profile != undefined && profile != "") {

                if (!profile || !profile.name || !profile.size) {

                    toast.error("Choose your file first", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                const fileSize = (profile.size / 1000)
                const fileExt = profile.name.split(".")[1].toLowerCase()

                if (fileSize > 1700) {

                    toast.error("File size must be less than 1700kb", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }

                if (!["jpg", "png", "jpeg"].includes(fileExt)) {

                    toast.error("File extension must be in jpg or png", {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }
                // setImageLoading(true);

                const data = new FormData();
                data.append("file", profile)
                data.append('cloud_name', 'flyingbird')
                data.append('upload_preset', 'Squiggiy-S-upload');

                fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

                    method: 'POST',
                    body: data
                })
                    .then(r => r.json())
                    .then((data) => {

                        axios.post(`/api/messages/add-message-group/${convid}/${user.id}`, {
                            content,
                            attachments: data.secure_url
                        }, {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        })
                            .then((res) => {

                                console.log("res.data");
                                console.log(res.data);
                                setProfile()
                                setContent("");
                                // socketstore.emit("new message", res.data.newmessage)
                                setMessages([...messages, res.data])
                                const lastMessagegroup = res.data
                                dispatch(updateLastMessageGroup({ convid, lastMessagegroup }))
                                sendMessage({ id: convid, lastMessagegroup: lastMessagegroup });

                            })
                            .catch((callback) => {

                                // console.log("callback")
                            })

                        setProfile_image(data.secure_url)

                    }).catch((err) => {

                        // setImageLoading(false);
                        toast.error("Check internet connection", {
                            position: "bottom-center",
                            autoClose: 901,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })

            } else if (content) {

                let data = {
                    content
                }

                axios.post(`/api/messages/add-message-group/${convid}/${user.id}`, data, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                })
                    .then((res) => {

                        console.log("res.data");
                        console.log(res.data);
                        setContent("");
                        // socketstore.emit("new message", res.data.newmessage)
                        setMessages([...messages, res.data])
                        const lastMessagegroup = res.data
                        dispatch(updateLastMessageGroup({ convid, lastMessagegroup }))
                        sendMessage({ id: convid, lastMessagegroup: lastMessagegroup });
                    })
                    .catch((callback) => {

                        // console.log("callback")
                    })
            }
        }


        inputRef?.current?.focus();
    }

    const handlesendSocket = (e) => {
        e.preventDefault();

        // socket.emit("message", message);
        // setContent("");
    };

    const joinRoomHandler = (e) => {
        e.preventDefault();

        // socket.emit("join-room", roomName);
        // setRoomName("");
    };


    useEffect(() => {

        // socketstore.on("message-recieved", (newMessageRecieve) => {

        //     const { user, newMessageRecieved } = newMessageRecieve
        //     // // console.log(selectedChatCompare)
        //     // // console.log(newMessageRecieved.room_id)
        //     // // console.log(selectedChatCompare !== newMessageRecieved.room_id)
        //     // // console.log(selectedChatCompare.toString() == newMessageRecieved.room_id.toString())
        //     if (!selectedChatCompare || selectedChatCompare.toString() !== (newMessageRecieved.room_id).toString()) {
        //         //give notification

        //         const data = {
        //             id: newMessageRecieved._doc.chat,
        //             user: user,
        //             konsa: "newmessage"
        //         }
        //         axios.post('/api/conversation/update-conversations', data)
        //             .then((res) => {
        //                 // console.log("chulo")
        //                 // setFetchnotification(!fetchnotification)
        //                 if (fetchnotification == "notnotification") {

        //                     setFetchnotification("notification")
        //                 } else {
        //                     setFetchnotification("notnotification")
        //                 }
        //                 // setMessages(res.data.messages)
        //             })
        //             .catch((callback) => {

        //                 // console.log("callback")
        //             })

        //         // const updatedNotifications = new Map(notification);

        //         // // If the key exists, increment its value by 1; otherwise, set it to 1
        //         // updatedNotifications.set(newMessageRecieved._doc.chat, (updatedNotifications.get(newMessageRecieved._doc.chat) || 0) + 1);

        //         // // console.log(" --- notification --- ");
        //         // // console.log(updatedNotifications);
        //         // // Update the state with the new Map
        //         // setNotification(() => updatedNotifications);
        //         // // console.log(notification);

        //         //   }

        //     } else if (selectedChatCompare && selectedChatCompare.toString() == (newMessageRecieved.room_id).toString()) {
        //         // // console.log(newMessageRecieved._doc.content)
        //         // let mes = messages;
        //         // // console.log("mes ", mes)
        //         // // console.log("messages ", messages)
        //         // setMessages([...messages, newMessageRecieved])
        //         setMessages((prevMessages) => [...prevMessages, newMessageRecieved])
        //     }
        // });

        // socketstore.on('updateOnlineUsers', (users) => {
        //     setOn(users)
        // });


        // socket.on("user-typing", (userData) => {

        //     // console.log(userData)
        //     // console.log(" socket typing ---- ", socketID)
        //     setIsTyping(true)
        // });
        // socket.on("user-stop typing", (userData) => {

        //     // console.log(userData)
        //     // console.log(" socket stop ---- ", socketID)
        //     setIsTyping(false)
        // });

        // return () => {
        //     // Clean up the event listener when the component unmounts
        //     socketstore.off("message-recieved");
        // };
    })

    useEffect(() => {

        const room = rooms.filter((r) => r.id == convid)

        const group_ = groups.filter((r) => r.id == convid)
        // console.log(" group_ ")
        // console.log(group_)

        setFriend(room[0]?.users[0])
        setGroup(group_[0])

    }, [params, groups, rooms])


    // const connect = () => {

    //     const sock = new SockJS("http://localhost:8080/ws")
    //     stompclient = over(sock)

    //     stompclient.connect({}, onConnected, onError)
    // }

    // const onConnected = () => {
    //     setUserData({ ...userData, "connected": true });
    //     stompClient.subscribe('/chatroom/public', onMessageReceived);
    //     stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    //     userJoin();
    // }

    // const userJoin = () => {
    //     var chatMessage = {
    //         senderName: userData.username,
    //         status: "JOIN"
    //     };
    //     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    // }

    // const onMessageReceived = (payload) => {
    //     var payloadData = JSON.parse(payload.body);
    //     switch (payloadData.status) {
    //         case "JOIN":
    //             if (!privateChats.get(payloadData.senderName)) {
    //                 privateChats.set(payloadData.senderName, []);
    //                 setPrivateChats(new Map(privateChats));
    //             }
    //             break;
    //         case "MESSAGE":
    //             publicChats.push(payloadData);
    //             setPublicChats([...publicChats]);
    //             break;
    //     }
    // }

    // const onPrivateMessage = (payload) => {
    //     console.log(payload);
    //     var payloadData = JSON.parse(payload.body);
    //     if (privateChats.get(payloadData.senderName)) {
    //         privateChats.get(payloadData.senderName).push(payloadData);
    //         setPrivateChats(new Map(privateChats));
    //     } else {
    //         let list = [];
    //         list.push(payloadData);
    //         privateChats.set(payloadData.senderName, list);
    //         setPrivateChats(new Map(privateChats));
    //     }
    // }

    // const onError = (err) => {
    //     console.log(err);

    // }

    // const handleMessage = (event) => {
    //     const { value } = event.target;
    //     setUserData({ ...userData, "message": value });
    // }
    // const sendValue = () => {
    //     if (stompClient) {
    //         var chatMessage = {
    //             senderName: userData.username,
    //             message: userData.message,
    //             status: "MESSAGE"
    //         };
    //         console.log(chatMessage);
    //         stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    //         setUserData({ ...userData, "message": "" });
    //     }
    // }

    // const sendPrivateValue = () => {
    //     if (stompClient) {
    //         var chatMessage = {
    //             senderName: userData.username,
    //             receiverName: tab,
    //             message: userData.message,
    //             status: "MESSAGE"
    //         };

    //         if (userData.username !== tab) {
    //             privateChats.get(tab).push(chatMessage);
    //             setPrivateChats(new Map(privateChats));
    //         }
    //         stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    //         setUserData({ ...userData, "message": "" });
    //     }
    // }

    // const handleUsername = (event) => {
    //     const { value } = event.target;
    //     setUserData({ ...userData, "username": value });
    // }

    // const registerUser = () => {
    //     connect();
    // }

    // const connect=()=>{

    //     const socketstore = new SockJS("http://localhost:8080/ws")
    //     const temp = over(socketstore)

    //     const header = {
    //         Authorization: `Bearer ${getToken()}`,
    //         "X-XSRF-TOKEN": getCookie("XSRF_TOKEN")
    //     }
    // }

    // function getCookie(name){

    //     const value = `${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(";").shift();
    // }

    // function onError = (error) =>{
    //     console.error("WebSocket error", error);
    // }

    // const onConnect=()=>{

    //     setIsConnect(true)
    // }

    // useEffect(() => {

    //     if(messages.newMessage && stompclient){

    //         setMessages([...messages, messages.newMessage])
    //         stompclient?.send("/app/messages", {}, JSON.stringify(messages.newMessage))
    //     }

    // }, [messages.newMessage])

    return (
        <>
            <Home />
            <div className="md:pl-80 lmd:pl-85">
                <div className="h-screen flex flex-col">
                    <Header
                        conversationid={convid}
                        // user={friend}
                        istyping={istyping}
                        typingid={typingid}
                        typingroomid={typingroomid}
                        typingselectedChatCompare={typingselectedChatCompare}
                        // group={group}
                        rooms={rooms}
                        groups={groups}


                    // loadingprofile={loadingprofile}
                    />
                    <Body
                        messages={messages}
                        mychat_id={convid}
                    />
                    {/* <MessageSender
                    socketuserid={socketuserid}
                        setMessages={setMessages}
                        mychat_id={mychat_id}
                    /> */}

                    {((typingroomid == selectedChatCompare) && istyping) ?
                        <div className='flex justify-start item-center pl-3.5 pb-0.5'>

                            <div className="">
                                <Lottie options={defaultOptions}
                                    height={40}
                                    width={40}
                                //   isStopped={this.state.isStopped}
                                //   isPaused={this.state.isPaused}
                                />
                            </div>
                            {/* <div className="text-white text-sm pl-0.5">
                                typing

                            </div> */}
                        </div>
                        :
                        <></>}

                    <>


                        <div className="">

                            {
                                (profile && profile != undefined && profile != "") &&
                                <div className='bg-slate-700 flex justify-between rounded-lg border border-slate-500 items-center'>

                                    <div className="p-1.5">

                                        {/* <Image
                                            alt="Image"
                                            // style={{ width: '130px', height: 'auto' }}
                                            height="40"
                                            width="130"

                                            // onClick={() => setImageModalOpen(true)}
                                            // src={URL.createObjectURL(profile)}
                                            src={profile_image}
                                            className="
                object-cover 
                 
              "
                                        /> */}
                                        <img className="h-28 w-24"
                                            src={URL.createObjectURL(profile)}
                                            alt="" />

                                    </div>

                                    {/* <div className='w-full opacity-35 pl-1 pr-1'>

                                    </div> */}
                                    {/* <button
                                        className='' type='submit'
                                        onSubmit={handleimagechange}>
                                        <div className=" text-xl pr-3 items-center rounded-full cursor-pointer"

                                        > */}

                                    <button
                                        type="button"
                                        className="pr-3"
                                        onClick={handleimagechange}
                                    >
                                        <AiFillCloseCircle
                                            className="text-2xl  text-white"
                                        />

                                    </button>

                                    {/* </div>
                                        </div>
                                    </button> */}
                                </div>
                            }

                            <div
                                className="
        py-4 
        pr-4
        pl-1.5 
        flex 
        
        gap-2 
        lg:gap-4 
        w-full
      "
                            >


                                <Button component="label"
                                    className="bg-slate-800"
                                // sx={{
                                //     width: 20,
                                //     height: 30,
                                //     padding: 1
                                // }}
                                >
                                    {/* choose */}

                                    {/* <button> */}
                                    <PiLinkBold className='text-2xl text-white cursor-pointer' />

                                    {/* <div className="text-white">jhg */}
                                    <input hidden accept="image/*" multiple type="file" onChange={(e) => {

                                        setProfile(e.target.files[0])
                                        // // console.log("input field")
                                        // // console.log(e.target.files[0])
                                    }} />
                                    {/* </div> */}
                                    {/* </PiLinkBold> */}
                                    {/* // </button>  */}

                                </Button>
                                <form
                                    // onSubmit={handleSubmit(onSubmit)}
                                    className="flex items-center gap-2 lg:gap-4 w-full"
                                >


                                    <div className='container mx-auto'>
                                        <label htmlFor="email-address" className="sr-only">Message</label>

                                        <div>

                                            <input id="content" name="content" type="text" autoComplete="name" className="appearance-none relative block w-full px-3 lmd:px-5 py-3.5 lmd:py-4 border-slate-500 placeholder:slate-400 text-slate-200 rounded-xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-xs text-xs lmd:text-sm bg-slate-700 " placeholder="Message"
                                                value={content} onChange={handlechangetyping} ref={inputRef} />

                                        </div>
                                    </div>

                                    {/* <InputMessage
                                        ref={inputRef}
                                        // id="message"
                                        // register={register}
                                        // errors={errors}
                                        // required
                                        // placeholder="Write a message"
                                        content={content}
                                        handlechange={handlechangetyping}
                                    /> */}
                                    <button
                                        type="button"
                                        className=""
                                        onClick={handlesend_}
                                        onKeyDown={handlesend}
                                    >
                                        <GoPaperAirplane className="text-white text-xl font-bold" />

                                    </button>
                                </form>
                            </div>

                        </div>
                    </>


                </div>
            </div>
        </>
    )
}

export default Conversation