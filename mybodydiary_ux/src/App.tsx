import * as React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './Pages/Nav'
import Home from './Pages/Home'
import './App.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'


function App() {
    document.title = 'MyBodyDiary'

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    )

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>

                    <Routes>
                        <Route path='/mybodydiary' element={<Nav/>}/>
                        <Route path='/' element={<Home/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
