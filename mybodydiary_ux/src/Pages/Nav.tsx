import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { SidebarData } from '../Components/SidebarData'
import * as FiIcons from 'react-icons/fi'
import { IconContext } from 'react-icons'
import '../css/Navbar.css'
import axios from 'axios'
import Training from '../Pages/Training/Training'


const Nav: React.FC<React.ReactNode> = () => {
  const [comp, setComp] = useState(Training)
  const [compIndex, setCompIndex] = useState(0)
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
        return navigate('/')
      }
    })
    .catch((error) => {
      alert(error.res.data)
    })
  }, [isLogin, navigate])

  const showComp = (index: number, comp: React.SetStateAction<JSX.Element>) => {
    setComp(comp)
    setCompIndex(index)
  }
  
  const logout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  let activeClasses = classNames({
    'nav-text': true,
    'nav-text-active': true
  })

  return (
    <>
    { isLogin &&
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <ul>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={ compIndex === index ? activeClasses : item.cName}>
                  <a href="#!" onClick={() => showComp(index, item.comp)}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
            <FiIcons.FiLogOut onClick={logout} className='logout'/>
          </ul>
        </div>

        <div children={comp} />
      </IconContext.Provider>
    }
    </>
  );
}

export default Nav;