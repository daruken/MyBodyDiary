import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { SidebarData } from '../Components/SidebarData'
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'
import { IconContext } from 'react-icons'
import '../css/Navbar.css'
import axios from 'axios'
import Home from '../Pages/Home'


const Nav: React.FC<React.ReactNode> = () => {
  const [comp, setComp] = useState(Home)
  const [isLogin, setIsLogin] = useState(false)
  const [sidebar, setSidebar] = useState(true)
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

  const showSidebar = () => {
    setSidebar(!sidebar)
  }
  
  const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <>
    { isLogin &&
      <IconContext.Provider value={{ color: '#fff' }}>
        {/* 네비게이션 토글 코드*/}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>

          <div className="logout">
            <FiIcons.FiLogOut onClick={logout} />
          </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <a href="#!" onClick={() => setComp(item.comp)}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={sidebar ? 'nav-page active' : 'nav-page'} children={comp} />
      </IconContext.Provider>
    }
    </>
  );
}

export default Nav;