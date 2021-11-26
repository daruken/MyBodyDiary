import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Login/Signup'
import Login from './Pages/Login/Login'
import Test from './Pages/Test'
import Nav from './Pages/Nav'
import axios from 'axios'
import './App.css'


function App() {
  document.title = 'MyBodyDiary'

  const [isLogin, setIsLogin] = useState(false)

  axios.get('/api/login', { params: {
    token: localStorage.getItem('user')
  } }).then((res: any) => {
    if (res.data.result === 0) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  })
  .catch((error) => {
    alert(error.res.data)
  })
  .finally(() => {})

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={ !isLogin ? <Login /> : <Home /> } />
        <Route path='/test' element={ isLogin ? <Test /> : <Login /> } />
        <Route path='/' element={ isLogin ? <Home /> : <Login /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
