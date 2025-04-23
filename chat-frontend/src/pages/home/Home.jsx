import React from 'react'
import Sidebar from './components/Sidebar'
import logo from '../../assets/logo.png'

const Home = () => {

    const basePath = '/'
    // grid lg:grid-cols-[300px,1fr]
    return (
        <>
            <div className='fixed hidden md:block left-0 w-max h-screen '>
                {/* <section className={`bg-white ${!basePath && "hidden"} lg:block`}> */}
                <div>
                    <Sidebar />
                </div>
                {/* </section> */}

                {/**message component**/}
                {/* <section className={`${basePath && "hidden"}`} > */}
                {/* <Outlet /> */}
                <div>
                    jhdsjhdsjhdsjhds...
                </div>
                {/* </section> */}


                {/* Empty Section when we don't select any conversation */}
                {/* <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
                    <div>
                        <img
                            src={logo}
                            width={250}
                            alt='logo'
                        />
                    </div>
                    <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
                </div> */}
            </div>
        </>
    )
}

export default Home