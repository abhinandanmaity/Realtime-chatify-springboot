import React from 'react'
import { Avatar } from '@mui/material';


const AvatarGroup_ = () => {

    const positionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }

    return (
        <>
            <div className="relative h-11 w-11">
                {/* {slicedUsers.map((user, index) => ( */}
                <div
                    key={1}
                    className={`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            h-[21px]
            w-[21px]
            `}>
                    {/* ${positionMap[index as keyof typeof positionMap]} */}
                    {/* <Image
                        fill
                        src={user?.image || '/images/placeholder.jpg'}
                        alt="Avatar"
                    /> */}
                    <Avatar className='' />
                </div>
                {/* ))} */}
            </div>
        </>
    )
}

export default AvatarGroup_