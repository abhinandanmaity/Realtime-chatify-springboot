
import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material'
import React from 'react'
import { PiCheckCircleDuotone } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useSelector } from 'react-redux';
// import ClearSharpIcon from '@mui/icons-material/ClearSharp';
// import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { API_URL } from '../../../config';
import { storeToken, getToken, storeUserDetails, getUserDetails } from '../../../config/SessionManagement'


const RequestFriend = () => {

    const [request, setRequest] = useState()
    // const user = useSelector((state) => state.userprofile.user); // Access user data
    const [user, setUser] = useState(getUserDetails())

    // console.log("request")
    // // console.log(request)

    // {
    //     request && request.map((item)=>{
    //         console.log("item ", item)
    //     })
    // }

    const handlesubmitaccept = (id, senderId) => {
        // e.preventDefault();

        // console.log(data)

        axios.post(`/api/friend-requests/accept/${id}/${senderId}/${user?.id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            // withCredentials: true,
        })
            .then(() => {

                // let token = jsCookie.get('__Secure-chatify.session-token')

                toast.success('Accept Successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            })
            .catch((callback) => {
                // console.log(callback)
                // console.log("callback")
                // console.log(callback.response.data.error)

                toast.error('Internal Server Error !', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const handlesubmitreject = (id, senderId) => {

        // e.preventDefault();

        axios.post(`/api/friend-requests/decline/${id}/${senderId}/${user?.id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then(() => {

                toast.success('Request Reject Successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            })
            .catch((callback) => {
                // console.log(callback)
                // console.log("callback")
                // console.log(callback.response.data.error)

                if (callback.response.data) {

                    toast.error('Check Your Internet connection', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else{
                    toast.error('Internal Server Error !', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

            })


    }

    useEffect(() => {

        // console.log(API_URL)
        // console.log(process.env.REACT_APP_BACKEND_URL)

        axios.get(`/api/friend-requests/request/${user?.id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((res) => {

                console.log("res.data.friends")
                console.log(res.data)
                // axios.get(`/api/users/user/${res.data?.id}`)
                //     .then((res) => {

                console.log("res.data")
                console.log(res.data)
                setRequest(res.data)
            //         })
            //         .catch((callback) => {
            //             // console.log(callback)
            //             // console.log("callback")

            //         })
            })
            .catch((callback) => {
                // console.log(callback)
                // console.log("callback")

            })

    }, [])

    return (
        <>

            <div className="">
                <div className="text-xl text-white font-extrabold pb-6">Friends Request</div>

                {request && request.map((item) => {
                    return (

                        <div className="mt-2">
                            <div className=" appearance-none relative px-4 lmd:px-5 py-2.5 lmd:py-3 border-slate-500 placeholder:slate-400 text-slate-300 rounded-3xl border-2 focus:outline-none focus:ring-slate-400 focus:border-slate-400 focus:z-10 placeholder:text-sm  bg-slate-700 flex justify-between "
                                key={item.id}
                            >

                                <div className="flex flex-row items-center pl-1.5">
                                    <div className="">
                                        {
                                            item.image != null ? <Avatar
                                                src={item.image}
                                                sx={{ width: 35, height: 35 }} /> :

                                            <Avatar
                                                sx={{ width: 35, height: 35 }}
                                            />
                                        }
                                    </div>
                                    <div className="">

                                        <div className="text-xs lmd:text-sm pl-3 text-white">{item.name}</div>
                                        <div className="text-xxs lmd:text-xs pl-3">{item.email}</div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    {/* <div className="text-xxxs lmd:text-xxs">a few seconds</div> */}
                                    <div className='pr-3.5'>
                                        <PiCheckCircleDuotone className="bg-green-700 rounded-full text-xl lmd:text-2xl cursor-pointer text-white"
                                            onClick={() => { handlesubmitaccept(item.friendid, item.id) }} />
                                    </div>
                                    <div >
                                        <RxCrossCircled className="bg-red-600 rounded-full text-xl lmd:text-2xl cursor-pointer text-white"
                                            onClick={() => { handlesubmitreject(item.friendid, item.id) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        </>
    )
}

export default RequestFriend