import React from 'react'
import theme2 from "../../components/theme/theme2";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import Overview from './Overview';

const LayoutOverview = () => {
    return (
        <>
            <ThemeProvider theme={theme2}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <div
                    // className=" h-screen"
                    >
                        <Overview />
                    </div>

                </Container>
            </ThemeProvider >

        </>
    )
}

export default LayoutOverview