import * as BsIcons from 'react-icons/bs'
import Training from '../Pages/Training/Training'
import Food from '../Pages/Food/Food'
import Report from '../Pages/Report/Report'
import About from '../Pages/About'


export const SidebarData = [
  {
    title: 'Trainning',
    comp: Training,
    icon: <BsIcons.BsCalendar2Check />,
    cName: 'nav-text'
  },
  {
    title: 'Food',
    comp: Food,
    icon: <BsIcons.BsApple />,
    cName: 'nav-text'
  },
  {
    title: 'Report',
    comp: Report,
    icon: <BsIcons.BsBarChartLineFill />,
    cName: 'nav-text'
  },
  {
    title: 'About',
    comp: About,
    icon: <BsIcons.BsFillInfoCircleFill />,
    cName: 'nav-text'
  }
]