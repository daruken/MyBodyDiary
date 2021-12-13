import * as BsIcons from 'react-icons/bs'
import Home from '../Pages/Home'
import About from '../Pages/About'


export const SidebarData = [
  {
    title: 'Home',
    comp: Home,
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text'
  },
  {
    title: 'Health',
    comp: Home,
    icon: <BsIcons.BsFillHouseDoorFill />,
    cName: 'nav-text'
  },
  {
    title: 'About',
    comp: About,
    icon: <BsIcons.BsFillInfoCircleFill />,
    cName: 'nav-text'
  }
]