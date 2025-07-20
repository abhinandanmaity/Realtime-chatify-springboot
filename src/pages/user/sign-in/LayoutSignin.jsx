import React from 'react'
import Signin from './Signin'
import theme from "../../../components/theme/theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


const LayoutSignin = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <Signin />
                </Container>
            </ThemeProvider>
        </>
    )
}

export default LayoutSignin