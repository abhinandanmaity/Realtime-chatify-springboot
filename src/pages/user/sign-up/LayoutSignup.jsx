import React from 'react'
import Signup from './Signup'
// import theme from "@components/theme/theme";
import theme from "../../../components/theme/theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

const LayoutSignup = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <Signup />
                </Container>
            </ThemeProvider>
        </>
    )
}

export default LayoutSignup