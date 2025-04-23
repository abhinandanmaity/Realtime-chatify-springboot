import React, { useState } from 'react'
import FriendList from './FriendList'
import { IoMdAdd } from 'react-icons/io'
import InputSearchfriend from './input/InputSearchfriend'
import ProfileDrawer from '../components/modals/ProfileDrawer';
import GroupModal from './modals/GroupModal';

const Contacts = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // const currentuser = useSelector((state) => state.session.value)
    // // console.log("email")
    // console.log(currentuser)

    const [user, setUser] = useState()
    const [curruser, setCurruser] = useState()
    const [loadingprofile, setLoadingprofile] = useState(true)

    return (
        <>

            <ProfileDrawer
                loadingprofile={loadingprofile}
                data={user}
                curruser={curruser}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />

            <GroupModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="">

                <div className="flex justify-normal pb-0.5 pt-0.5">

                    <div className="pl-2 pt-1 pr-1.5">
                        <InputSearchfriend />
                    </div>

                    <button
                        onClick={() => { setIsOpen(true) }}
                        // type="button"
                        // fullWidth
                        // variant="contained"
                        // sx={{ mt: 2, mb: 0 }}
                        className='text-xxs bg-cyan-700 text-white hover:bg-cyan-900 hover:text-white rounded-xl pl-1.5 pr-1.5 mt-1 '
                    >
                        <div className="flex flex-row">
                            <span className='pr-0.5 text-sm font-extrabold'><IoMdAdd /></span>
                            Group
                        </div>
                    </button>
                    {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Toggle modal
                    </button> */}


                </div>

                <div className="
                
                h-screen
                
                overflow-y-auto 
                scrollbar-hide
                "
                >

                    <FriendList />
                </div>

                {/* Signout */}
                {/* <div className="text-white fixed bottom-3 left-6 w-72 lmd:w-82" >

                    <div className="flex flex-row justify-between  items-center
                    border-2
                    border-slate-700
                    bg-slate-800
                    rounded-lg
                    py-2.5 px-1.5
                    z-40
                    "
                    // onClick={handleShowprofile}
                    >
                        <div className="px-1.5 flex flex-row items-center">

                            <div className="cursor-pointer"
                                onClick={() => setDrawerOpen(true)}                      >
                                {(curruser && curruser.image != undefined && curruser.image != "") ? <Avatar
                                    src={curruser && curruser.image}
                                    sx={{ width: 28, height: 28 }} /> :

                                    <Avatar
                                        sx={{ width: 28, height: 28 }}
                                    />
                                }
                            </div>
                            <div className="pl-2 text-xs lmd:text-sm text-slate-200">
                                {curruser && curruser.name}
                            </div>
                        </div>
                        <PiSignOutBold
                            onClick={handleSignout} className='text-lg cursor-pointer ' />
                    </div>
                </div> */}

            </div>

        </>
    )
}

export default Contacts