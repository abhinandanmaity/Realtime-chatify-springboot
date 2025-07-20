import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FaLock } from "react-icons/fa6";
import Signinform from './Signinform';

const Signin = () => {


    return (
        <>
            <Box
                sx={{
                    marginTop: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // height: screen
                }}
            >
                <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }}
                    src='/favicon.ico'
                >
                    {/* <LockOutlinedIcon /> */}
                    {/* <TbMessageCircle2Filled className='text-xl text-sky-500' /> */}
                </Avatar>
                <Typography component="h1" variant="h5" className='text-white text-lg font-semibold pt-14'>
                    <div className='flex flex-col items-center gap-2'>
                        <div className="text-xl"><FaLock className='' /></div>
                        <h2 className='text-xl md:text-3xl text-center font-bold tracking-tight text-gray-100 mb-3'>
                            Sign in to your account
                        </h2>
                    </div>
                </Typography>
                <Box
                    className='text-slate-400 text-sm pt-9 w-full lmd:container lmd:w-1/2'
                >

                    <Signinform />

                    <Grid container className='container justify-between'>
                        <Grid item xs>
                            <a href="/#" className='text-cyan-500 font-semibold'>
                                Forgot password?
                            </a>
                        </Grid>
                        <Grid item>
                            Don't have an account?
                            <a href={`/sign-up`} className='text-cyan-500 font-semibold'>
                                {"  Sign up"}
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Signin