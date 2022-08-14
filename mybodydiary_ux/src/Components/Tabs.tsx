import {useState} from "react";
import {SidebarData} from './SidebarData'
import * as FiIcons from 'react-icons/fi'
import {IconContext} from 'react-icons'
import classNames from 'classnames'
import Training from "../domain/training/Training";
import Food from "../domain/Food/Food"
import Report from "../domain/report/Report"
import About from "../domain/About"

export type TabProps = {
  activeTab: boolean;
}

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Training')
  const [compIndex, setCompIndex] = useState(0)

  const handleClickTab = (index: number, title: string) => {
    setCompIndex(index)
    setActiveTab(title)
  }

  const logout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userToken')
    window.location.href = '/'
  }

  let activeClasses = classNames({
    'nav-text': true,
    'nav-text-active': true
  })

  return (
    <div id="tabs-container">
      <IconContext.Provider value={{color: '#fff'}}>
        <div className="navbar">
          <ul>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={compIndex === index ? activeClasses : item.cName}>
                  <a href="#!" onClick={() => handleClickTab(index, item.title)}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
            <FiIcons.FiLogOut onClick={logout} className='logout'/>
          </ul>
        </div>
      </IconContext.Provider>
      <div className="tab-content">
        <Training activeTab={activeTab === "Training"}/>
        <Food activeTab={activeTab === "Food"}/>
        <Report activeTab={activeTab === "Report"}/>
        <About activeTab={activeTab === "About"}/>
      </div>
    </div>
  );
};

export default Tabs