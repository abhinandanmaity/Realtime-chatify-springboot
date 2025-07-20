import React from 'react'
import { Img } from 'react-image';


const EmptyState = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen md:pl-82 lmd:pl-82 ">
                <div className="text-center items-center ">
                    <span className="text-base md:text-lg font-semibold text-slate-300 ">
                        <div className='flex justify-center '>
                            <Img
                                src="/images.png"
                                alt="Description"
                                loader={<div>Loading...</div>}
                                unloader={<div>Failed to load</div>}
                                className="w-28 h-24 rounded-full"
                            />
                        </div>
                        <div className='pt-5 text-sm'>
                            select a conversation or start a new one
                        </div>
                    </span>
                </div>
            </div>
        </>
    )
}

export default EmptyState