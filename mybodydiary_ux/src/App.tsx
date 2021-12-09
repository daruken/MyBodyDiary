import * as React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Login/Signup'
import Login from './Pages/Login/Login'
import About from './Pages/About'
import Nav from './Pages/Nav'
import './App.css'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
      <CssBaseline />
        <BrowserRouter>
        
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Nav />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}

export default App;
