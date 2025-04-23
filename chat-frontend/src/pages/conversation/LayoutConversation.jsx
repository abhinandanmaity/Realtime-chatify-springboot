import React from 'react'
import Conversation from './Conversation';
import theme from "../../components/theme/theme2";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

const LayoutConversation = () => {
  return (
    <>
        <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xl">
                    <CssBaseline />
                    <div
                    // className=" h-screen"
                    >
                        <Conversation />
                    </div>

                </Container>
            </ThemeProvider >
    </>
  )
}

export default LayoutConversation