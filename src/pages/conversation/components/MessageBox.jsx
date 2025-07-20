
import React, { useEffect, useState, useRef } from 'react'
import { Avatar } from '@mui/material'
// import Image from "next/image";
import { Img } from 'react-image';
import { useSelector } from 'react-redux';
import { storeToken, getToken, storeUserDetails, getUserDetails } from '../../../config/SessionManagement'

const MessageBox = ({ messages, mychat_id }) => {

    const rooms = useSelector((state) => state.rooms.value);
    const groups = useSelector((state) => state.groups.value)
    // console.log(messages)

    const bottomref = useRef(null)

    const user = getUserDetails()

    useEffect(() => {

        bottomref?.current?.scrollIntoView();

    }, [messages])

    useEffect(() => {

        bottomref?.current?.scrollIntoView();

    }, [])
    // useEffect(() => {

    //     onlineuser = useSelector(state => state.onlineuser);

    // })

    // console.log("messages && messages[0]?._doc?.attachments")
    // // console.log( messages[0]?._doc?.attachments)
    // console.log("MessageBox -- ", messages)

    return (
        <>
            <div className="pl-3 pr-3 pt-2 "

            >
                {/* h-screen  
            overflow-y-auto scrollbar-hide  */}

                {messages && messages?.map((item) => {

                    return (<div className="pt-1.5 " key={item.id}>

                        {/* {item.id != mychat_id ? */}
                        {/* {console.log(user)} */}
                        {item.userEntity.id != user.id ?
                            <div
                                // className={container}
                                className="text-white flex gap-3"
                            >
                                <div
                                    // className={avatar}
                                    className='pt-2.5'
                                >
                                    {!item.userEntity.image || item.userEntity.image == "" ?

                                        <Avatar sx={{ width: 18, height: 18 }}
                                        />
                                        : <Avatar
                                            sx={{ width: 18, height: 18 }}
                                            src={item.userEntity.image}
                                        />
                                    }

                                </div>
                                <div
                                // className={body}
                                >
                                    <div className="flex flex-col items-start gap-1 text-white ">
                                        <div className="">
                                            {/* {format(new Date(data.createdAt), 'p')} */}
                                            <div className="">
                                                <span className="font-bold text-gray-100 text-xxs">{item.userEntity?.username?.length > 27 ? (item.userEntity?.username)?.slice(0, 25) + " ..." : item.userEntity.username}</span>
                                                <span className="pl-2 text-gray-300 text-xxxs ">
                                                {new Date(item.msgDateTime).toLocaleDateString('en-GB')}

                                                </span>
                                            </div>
                                        </div>

                                        <div className="">

                                            {(item.attachments != "" && item.attachments != null && item.attachments != undefined && item.attachments?.length > 1) &&
//                                                 <Image
//                                                     alt="Image"
//                                                     height={170}
//                                                     width={150}
//                                                     // onClick={() => setImageModalOpen(true)}
//                                                     src={item._doc.attachments}
//                                                     className="
// object-cover 

// hover:scale-110 
// transition 
// translate
// "
//                                                 />
                                                <Img
    src={item.attachments}
    alt="Description"
    loader={<div>Loading...</div>}
    unloader={<div>Failed to load</div>}
    // onClick={() => setImageModalOpen(true)}
    className="
object-cover 

hover:scale-110 
transition 
translate
"
  />
                                            }

                                        </div>


                                        {item.content && <div className=" bg-yellow-700 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl max-w-56 xxs:max-w-64 pt-2.5 pb-2.5 pl-3.5 pr-2.5">
                                            <div className="text-xs text-white items-end flex justify-end">{item.content}</div>
                                            <div className="text-xxs text-white items-start flex justify-start pr-14 pt-1">
                                            {new Date(item.msgDateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                            </div>

                                        </div>}



                                    </div>
                                    {/* Message image */}
                                    {/* <div className={message}>
                            <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
                            {data.image ? (
                                <Image
                                    alt="Image"
                                    height="288"
                                    width="288"
                                    onClick={() => setImageModalOpen(true)}
                                    src={data.image}
                                    className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
                                />
                            ) : (
                                <div>{data.body}</div>
                            )}
                        </div> */}
                                    {/* {isLast && isOwn && seenList.length > 0 && (
                            <div
                                className="
            text-xs 
            font-light 
            text-gray-500
            "
                            >
                                {`Seen by ${seenList}`}
                            </div>
                        )} */}
                                    {/* seen */}
                                </div>
                            </div>
                            :

                            <div
                                // className={container}
                                className="text-white flex justify-end gap-3"

                            >
                                <div
                                // className={body}
                                >
                                    <div className="flex flex-col items-end gap-1 text-white ">
                                        <div className="">
                                            {/* {format(new Date(data.createdAt), 'p')} */}
                                            <div className="">
                                                <span className="font-bold text-gray-100 text-xxs">{item.userEntity?.username?.length > 27 ? (item.userEntity?.username)?.slice(0, 25) + " ..." : item.userEntity?.username}</span>
                                                <span className="pl-2 text-gray-300 text-xxxs ">
                                                {new Date(item.msgDateTime).toLocaleDateString('en-GB')}
                                                </span>
                                            </div>
                                        </div>


                                        {(item.attachments != "" && item.attachments != null && item.attachments != undefined && item.attachments?.length > 1) &&
//                                                 <Image
//                                                     alt="Image"
//                                                     height={170}
//                                                     width={150}
//                                                     // onClick={() => setImageModalOpen(true)}
//                                                     src={item._doc.attachments}
//                                                     className="
// object-cover 

// hover:scale-110 
// transition 
// translate
// "
//                                                 />
                                                <Img
                                                src={item.attachments}
                                                    className="
object-cover 

hover:scale-110 
transition 
translate
"
                                                alt="Description"
                                                loader={<div>Loading...</div>}
                                                unloader={<div>Failed to load</div>}
                                              />
                                            }

                                        {item.content && <div className=" bg-cyan-800 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl max-w-56 xxs:max-w-64 pt-2.5 pb-2.5 pl-3.5 pr-2.5">
                                            <div className="text-xs text-white">{item.content}</div>
                                            <div className="text-xxs text-white items-end flex justify-end pl-14 pt-1">
                                                {/* {item.msgDateTime} */}

                                                {new Date(item.msgDateTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                                            </div>

                                        </div>}

                                    </div>
                                    {/* Message image */}
                                    {/* <div className={message}>
                            <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
                            {data.image ? (
                                <Image
                                    alt="Image"
                                    height="288"
                                    width="288"
                                    onClick={() => setImageModalOpen(true)}
                                    src={data.image}
                                    className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
                                />
                            ) : (
                                <div>{data.body}</div>
                            )}
                        </div> */}
                                    {/* {isLast && isOwn && seenList.length > 0 && (
                            <div
                                className="
            text-xs 
            font-light 
            text-gray-500
            "
                            >
                                {`Seen by ${seenList}`}
                            </div>
                        )} */}
                                    {/* seen */}
                                </div>

                                <div
                                    // className={avatar}
                                    className='pt-2.5'
                                >
                                    {!item.userEntity?.image || item.userEntity?.image == "" ?

                                        <Avatar sx={{ width: 18, height: 18 }}
                                        />
                                        : <Avatar
                                            sx={{ width: 18, height: 18 }}
                                            src={item.userEntity?.image}
                                        />
                                    }

                                </div>

                            </div>}

                    </div>)
                })}

                <div

                    ref={bottomref}
                >

                </div>
            </div>

        </>
    )
}

export default MessageBox