import React from 'react'
import Home from './Home'
import theme2 from "../../components/theme/theme2";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import EmptyState from './components/EmptyState';

const LayoutHome = () => {
    return (
        <>
            <ThemeProvider theme={theme2}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <div
                    // className=" h-screen"
                    >
                        <Home />
                        <EmptyState />
                    </div>

                </Container>
            </ThemeProvider >

        </>
    )
}

export default LayoutHome