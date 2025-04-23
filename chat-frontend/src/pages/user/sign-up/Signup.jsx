import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { FaLock } from "react-icons/fa6";
import Signupform from './Signupform';

const Signup = () => {



    return (

        <>

            <Box
                sx={{
                    marginTop: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }}
                    src='/favicon.ico'
                >

                </Avatar>
                <Typography component="h1" variant="h5" className='text-white text-lg font-semibold pt-14'>
                    <div className='flex flex-col items-center gap-2'>
                        <div className="text-xl"><FaLock /></div>
                        <h2 className='text-xl md:text-3xl text-center font-bold tracking-tight text-gray-100 mb-3'>
                            Register
                        </h2>
                    </div>
                </Typography>
                <Box
                    className='text-slate-400 text-sm pt-9 w-full lmd:container lmd:w-1/2'
                >

                    <Signupform/>

                    <Grid container>
                        <Grid item>
                            Already have an account?
                            <a href={`/sign-in`} className='text-cyan-500 font-semibold' >
                                {"  Sign in"}
                            </a>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Signup;