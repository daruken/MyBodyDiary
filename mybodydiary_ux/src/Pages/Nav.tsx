import { Link, Button } from "@mui/material";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CSS from 'csstype'
import axios from 'axios'


function Nav() {
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/api/login', { params: {
      token: localStorage.getItem('user')
    } }).then((res: any) => {
      if (res.data.result === 0) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
        return navigate('/login')
      }
    })
    .catch((error) => {
      alert(error.res.data)
    })
  }, [isLogin, navigate])
  
  const logout = () => {
    localStorage.removeItem('user')
    return navigate('/login')
  }

  const logoutStyle: CSS.Properties = {
    float: 'right'
  };

  return (
    <>
      { isLogin &&
        <Link href="/">
          <Button>메인 화면</Button>
        </Link>
      }
      { isLogin && 
        <Button style={logoutStyle} onClick={logout}>로그아웃</Button>
      }
      { isLogin && 
      <Link href="/test">
          <Button>테스트 화면</Button>
      </Link>
      }
    </>
  );
}

export default Nav;