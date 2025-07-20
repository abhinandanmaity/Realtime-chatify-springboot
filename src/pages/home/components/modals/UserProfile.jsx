
import React, { useState, useEffect } from 'react'
import EditprofileModal from './EditprofileModal'
import { Avatar, Badge } from '@mui/material';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from "react-icons/ci";
import DeleteAccountModal from './DeleteAccountModal';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
// import { setUserprofile } from '@/redux/slice/userprofileSlice'
import { storeToken, getToken, storeUserDetails, getUserDetails, clearAllCookies } from '../../../../config/SessionManagement'
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { deleteRoom, updateRoom } from '../../../../redux/slice/roomSlice';


const UserProfile = ({ data, curruser }) => {

  const navigate = useNavigate();

  const user = useSelector((state) => state.userprofile.value)

  // console.log(data)
  // console.log(curruser)

  const dispatch = useDispatch()
  // const { onlineUsers, updateprofile } = ChatState();

  const [friend, setFriend] = useState()

  const isActive = true;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [userdata, setUserdata] = useState(getUserDetails())

  const handleunfriend = (friendid) => {
    // dispatch(logout())

    axios.post(`/api/friends/unfriend/${user.id}/${friendid}`, {
      headers: {
          Authorization: `Bearer ${getToken()}`,
      },
  })
      .then((res) => {

          // Update the Redux store with the new group data
          dispatch(deleteRoom(friendid));

          // setGroupdata(() => res.data.group)
          // data = res.data.group
          console.log("data -- 1")
          navigate("/chat")

      })
      .catch((callback) => {

          // console.log("callback")
      })
    
  }

  // const userdata = useSelector(state => state.userprofile)
  // const userdata = {}
  useEffect(() => {

    setUserdata(getUserDetails())
  }, [user])

  useEffect(() => {

    setUserdata(getUserDetails())
  }, [])

  return (
    <>

      <DeleteAccountModal isOpenDelete={isOpenDelete} onClose={() => setIsOpenDelete(false)} />
      <EditprofileModal isOpen={isOpen} onClose={() => setIsOpen(false)} image={data?.image} />


      {((curruser && data) && curruser?.email == data?.email) && <div className="relative cursor-pointer left-8 text-2xl" onClick={() => { setIsOpen(true) }}>
        <CiEdit />
      </div>}

      {(data && data?.email == userdata.email) ?

        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-5">

              {
                (!userdata && (userdata.image == undefined || userdata.image == "")) ?
                  //   (onlineUsers.includes(userdata.id) ? <Badge
                  //     overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  //     <Avatar sx={{ width: 44, height: 44 }}
                  //     />
                  //   </Badge>
                  //     : 
                  <Avatar sx={{ width: 44, height: 44 }}
                  />
                  // )
                  //   : (onlineUsers.includes(userdata.id) ? <Badge
                  //     overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  :
                  <Avatar
                    sx={{ width: 44, height: 44 }}
                    src={userdata && userdata.image}
                  />
                //   </Badge> : <Avatar
                //     sx={{ width: 44, height: 44 }}
                //     src={userdata && userdata.image}
                //   />)
              }                       </div>
            <div className='text-sm font-semibold'>
              {userdata.name}
            </div>
            <div className="text-xs text-gray-500">
              {userdata.email}
            </div>
            <div>
              <div
                className="
                                    mt-1 
                                    text-xs 
                                    text-gray-900
                                    flex
                                  "
              >
                <div className="mr-1">

                  Joined on
                </div>
                {(userdata != undefined && userdata.joinedOn != undefined) ? ((userdata.joinedOn).slice(0, 10)) : ""}
              </div>
            </div>

            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">


                {userdata.description && (<div className='mt-10'>
                  <div className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  
                                " >
                    <div className='font-semibold mt-2'> Description :</div>
                    <div className='flex flex-wrap'>{userdata.description}</div>
                  </div>
                </div>
                )}

              </dl>
              {((curruser && userdata) && curruser.email == userdata.email) ? <div className="flex justify-center gap-10 my-14"
                onClick={() => { setIsOpenDelete(true) }}>
                <div className="">
                  <div

                    // onClick={() => setConfirmOpen(true)}

                    className="flex flex-col gap-3 items-center  hover:opacity-85">
                    <div className="flex items-center justify-center">
                      <MdDeleteOutline className='text-xl text-red-600' />

                    </div>
                    <div className="cursor-pointer text-sm  text-red-500">
                      Delete Account
                    </div>
                  </div>
                </div>
              </div>
                :
                <div className='flex flex-col gap-3 items-center  hover:opacity-85'>
                  <button title='logout' className='flex items-center justify-center' onClick={handleunfriend}>
                    <span className=''>
                      <BiLogOut className='text-xl text-red-600' size={20} />
                    </span>
                  </button>
                  <div className="cursor-pointer text-sm  text-red-500">
                    unfriend
                  </div>
                </div>}

            </div>
          </div>


        </div>
        :
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-5">

              {
                (!data && (data?.image == undefined || data?.image == "")) ?
                  //   (onlineUsers.includes(data.id) ? <Badge
                  //     overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  <Avatar sx={{ width: 44, height: 44 }}
                  />
                  //   </Badge>
                  //     : <Avatar sx={{ width: 44, height: 44 }}
                  //     />)
                  //   : (onlineUsers.includes(data.id) ? <Badge
                  //     overlap="Circular" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} variant='dot' color='success'                  >
                  :
                  <Avatar
                    sx={{ width: 44, height: 44 }}
                    src={data && data?.image}
                  />
                //   </Badge> : <Avatar
                //     sx={{ width: 44, height: 44 }}
                //     src={data && data?.image}
                //   />)
              }                       </div>
            <div className='text-sm font-semibold'>
              {data?.name}
            </div>
            <div className="text-xs text-gray-500">
              {data?.email}
            </div>
            <div>
              <div
                className="
                                    mt-1 
                                    text-xs 
                                    text-gray-900
                                    flex
                                  "
              >
                <div className="mr-1">

                  Joined on
                </div>
                {(data != undefined && data?.joinedOn != undefined) ? ((data?.joinedOn).slice(0, 10)) : ""}
              </div>
            </div>

            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">


                {data?.description && (<div className='mt-10'>
                  <div className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  
                                " >
                    <div className='font-semibold mt-2'> Description :</div>
                    <div className='flex flex-wrap'>{data?.description}</div>
                  </div>
                </div>
                )}

              </dl>
              {((curruser && data) && curruser?.email == data?.email) ? <div className="flex justify-center gap-5 my-14"
                onClick={() => { setIsOpenDelete(true) }}>
                <div className="">
                  <div

                    // onClick={() => setConfirmOpen(true)}

                    className="flex flex-col gap-3 items-center  hover:opacity-85">
                    <div className="flex items-center justify-center">
                      <MdDeleteOutline className='text-xl text-red-600' />

                    </div>
                    <div className="cursor-pointer text-sm  text-red-500">
                      Delete Account
                    </div>
                  </div>
                </div>
              </div>
                :
                <div className="flex justify-center gap-5 my-14"
                  onClick={() => { setIsOpenDelete(true) }}>
                  <div className='flex flex-col gap-3 items-center  hover:opacity-85'>
                    <button title='logout' className='flex items-center justify-center' onClick={() => handleunfriend(data?.id)}>
                      <span className=''>
                        <BiLogOut className='text-xl text-red-600' size={20} />
                      </span>
                    </button>
                    <div className="cursor-pointer text-sm  text-red-500">
                      unfriend
                    </div>
                  </div>
                </div>
              }

            </div>
          </div>


        </div>
      }

    </>
  )
}

export default UserProfile