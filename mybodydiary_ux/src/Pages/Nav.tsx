import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/Navbar.css'
import axios from 'axios'
import Tabs from '../Components/Tab'


const Nav: React.FC<React.ReactNode> = () => {
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('/api/login', {
            params: {
                id: localStorage.getItem('userId')
            }
        }).then((res: any) => {
            if (res.data) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
                return navigate('/')
            }
        })
            .catch((error) => {
                alert(error.res.data)
            })
    }, [isLogin, navigate])

    return (
        <>
            {isLogin &&
                <Tabs/>
            }
        </>
    );
}

export default Nav;