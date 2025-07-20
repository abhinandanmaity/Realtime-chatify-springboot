import React, { useState, useEffect } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar_ from '../../home/components/Avatar'
import { FiArrowUpLeft } from "react-icons/fi";
import { Avatar } from '@mui/material'
import Contacts from './Contacts';
import { useSelector } from 'react-redux';
import { storeToken, getToken, storeUserDetails, getUserDetails, clearAllCookies } from '../../../config/SessionManagement'
import { useDispatch } from 'react-redux'
import { setUserprofile } from '../../../redux/slice/userprofileSlice';
import ProfileDrawer from '../components/modals/ProfileDrawer';

const Sidebar = () => {
    // { user }

    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const user = useSelector((state) => state.userprofile.user); // Access user data

    const [editUserOpen, setEditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const [url, setUrl] = useState("None");
    const [user, setUser] = useState()

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [loadingprofile, setLoadingprofile] = useState(true)

    const handleLogout = () => {
        // dispatch(logout())
        // navigate("/email")
        // localStorage.clear()
        clearAllCookies()
        navigate("/sign-in")
    }
    //grid grid-cols-[48px,1fr]

    useEffect(() => {

        const user = getUserDetails(); // Fetch user details
        setUser(user); // Set the initial user state

        // Add the profile field while retaining other fields
        const updatedUser = {
            ...user,  // Spread the existing user details
            profile: true, // Add the new profile field
        };

        // Update the state with the new object
        setUser(updatedUser);
        // console.log(updatedUser);
        setLoadingprofile(false)
        // setUrl(window.location.pathname)
        // dispatch(setUserprofile(getUserDetails()))
    }, [])

    return (
        <>

            <ProfileDrawer
                loadingprofile={loadingprofile}
                data={user}
                curruser={user}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <div className='flex '>
                <div className='bg-slate-700 w-12 h-screen rounded-tr-lg rounded-br-lg py-5 text-slate-400 flex flex-col justify-between'>
                    <div>
                        <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-300"} ${isActive && "text-slate-500"}`} title='chat'
                            to={"/chat"}
                        >
                            <IoChatbubbleEllipses
                                size={20}
                            />
                        </NavLink>

                        {/* <div title='add friend' onClick={() => setOpenSearchUser(true)} className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' > */}
                        <NavLink className={({ isActive }) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 rounded ${isActive && "bg-slate-300"} ${isActive && "text-slate-500"}`} title='add friend'
                            to={"/add-friend"}
                        >
                            <FaUserPlus
                                size={20}
                            />
                        </NavLink>
                    </div>

                    <div className='flex flex-col items-center'>
                        <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
                            {
                                // user?.profile_pic ?
                                //     <Avatar_
                                //         width={40}
                                //         height={40}
                                //         name={user?.name}
                                //         imageUrl={user?.profile_pic}
                                //         userId={user?._id}
                                //     />
                                //     :
                                // <Avatar sx={{ width: 34, height: 34 }}
                                // />
                                <div className="cursor-pointer"
                                    onClick={() => setDrawerOpen(true)}>
                                    {(user && user.image != undefined && user.image != "") ? <Avatar
                                        src={user && user.image}
                                        sx={{ width: 28, height: 28 }} /> :

                                        <Avatar
                                            sx={{ width: 28, height: 28 }}
                                        />
                                    }
                                </div>
                            }
                        </button>
                        <button title='logout' className='mt-3 w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 text-slate-400 rounded' onClick={handleLogout}>
                            <span className='-ml-2'>
                                <BiLogOut size={20} />
                            </span>
                        </button>
                    </div>
                </div>

                <div className=' '>
                    <div className='h-14 flex items-center'>
                        <h2 className='text-xl font-bold pt-3 pb-0 pl-4 pr-4 text-slate-200'>Chats</h2>
                    </div>
                    {/* <div className='bg-slate-200 p-[0.5px]'></div> */}

                    <Contacts />

                    {/* <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'> */}
                    {/* {
                        allUser.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-500'>
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>    
                            </div>
                        )
                    } */}

                    {
                        // allUser.map((conv,index)=>{
                        //     return(
                        //         <NavLink to={"/"+conv?.userDetails?._id} key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer'>
                        //             <div>
                        //                 <Avatar
                        //                     imageUrl={conv?.userDetails?.profile_pic}
                        //                     name={conv?.userDetails?.name}
                        //                     width={40}
                        //                     height={40}
                        //                 />    
                        //             </div>
                        //             <div>
                        //                 <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                        //                 <div className='text-slate-500 text-xs flex items-center gap-1'>
                        //                     <div className='flex items-center gap-1'>
                        //                         {
                        //                             conv?.lastMsg?.imageUrl && (
                        //                                 <div className='flex items-center gap-1'>
                        //                                     <span><FaImage/></span>
                        //                                     {!conv?.lastMsg?.text && <span>Image</span>  } 
                        //                                 </div>
                        //                             )
                        //                         }
                        //                         {
                        //                             conv?.lastMsg?.videoUrl && (
                        //                                 <div className='flex items-center gap-1'>
                        //                                     <span><FaVideo/></span>
                        //                                     {!conv?.lastMsg?.text && <span>Video</span>}
                        //                                 </div>
                        //                             )
                        //                         }
                        //                     </div>
                        //                     <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                        //                 </div>
                        //             </div>
                        //             {
                        //                 Boolean(conv?.unseenMsg) && (
                        //                     <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                        //                 )
                        //             }

                        //         </NavLink>
                        //     )
                        // })
                    }
                    {/* </div> */}
                </div>

                {/**edit user details*/}
                {/* {
                editUserOpen && (
                    <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
                )
            } */}

                {/**search user */}
                {/* {
                openSearchUser && (
                    <SearchUser onClose={()=>setOpenSearchUser(false)}/>
                )
            } */}

            </div>
        </>
    )
}

export default Sidebar