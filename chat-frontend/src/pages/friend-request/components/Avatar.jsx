import React from 'react'
import { Avatar, Badge } from '@mui/material'
// import { ChatState } from '@/app/Provider/ChatProvider';


const Avatar_ = ({ image, _id }) => {

    const isActive = false;
    // const { onlineUsers } = ChatState();

    // console.log(_id)

    return (
        <>
            <div className="relative z-0">
                <div
                >
                    {/* {!image || image == "" ?
                         (onlineUsers?.includes(_id) ? <Badge
                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                            <Avatar sx={{ width: 34, height: 34 }}
                            />
                        </Badge>
                            : <Avatar sx={{ width: 34, height: 34 }}
                            />)
                        : (onlineUsers?.includes(_id) ? <Badge
                            overlap="Circular" anchorOrigin={{ horizontal: "left", vertical: "bottom" }} variant='dot' color='success'                  >
                            <Avatar
                                sx={{ width: 34, height: 34 }}
                                src={image}
                            />
                        </Badge> : <Avatar
                            sx={{ width: 34, height: 34 }}
                            src={image}
                        />)
                    } */}
                </div>
                {}
            </div>
        </>
    )
}

export default Avatar_