import {useState} from 'react'
import Modal from 'react-responsive-modal'
import "react-responsive-modal/styles.css"
import Button from '@mui/material/Button'
import {Container} from '@material-ui/core'
import CSS from 'csstype'
import '../css/Home.css'
import Login from './Login/Login'
import Signup from './Login/Signup'
import sky from '../img/back.jpg'
import favicon from '../img/favicon.jpg'


const buttonStyle: CSS.Properties = {
    backgroundColor: '#283747',
    color: 'white'
}

const Home = () => {
  const [isShowLogin, setIsShowLogin] = useState(false)
  const [isShowSignup, setIsShowSignup] = useState(false)

  const openLoginModal = () => {
      setIsShowLogin(true)
  }
  const closeLoginModal = () => {
      setIsShowLogin(false)
  }

  const openSignupModal = () => {
      setIsShowSignup(true)
  }
  const closeSignupModal = () => {
      setIsShowSignup(false)
  }
  
  return (
    <div>
      <div className="homeHead">
        <img src={favicon} alt="Logo"/>
        <h2>MyBodyDiary</h2>
      </div>

      <div className="homeBody">
        <h1>My body diary</h1>

        <p>우리의 건강한 삶을 위해 몸의 일기를 남겨보아요.</p>
        <Button variant="contained" style={buttonStyle} onClick={openLoginModal}>Login</Button>
        <Modal
          open={isShowLogin}
          onClose={closeLoginModal}
          center>
          <Login handleClose={closeLoginModal}/>
        </Modal>

        <img src={sky} alt="Logo"/>
      </div>

      <Container>
        회원이 아니신가요?&nbsp;&nbsp;&nbsp;
        <Button variant='contained' style={buttonStyle} onClick={openSignupModal}>회원가입</Button>
        <Modal
          open={isShowSignup}
          onClose={closeSignupModal}
          center>
          <Signup handleClose={closeSignupModal}/>
        </Modal>
      </Container>

      <div className="copyright">
        © MyBodyDiary 2022&nbsp;&nbsp;&nbsp;
        <a href='mailto:dj.hongten@gmail.com'>dj.hongten@gmail.com</a>
      </div>
    </div>
  )
}

export default Home;