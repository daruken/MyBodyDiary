import { useState, useCallback, useEffect } from 'react'
import axios, {AxiosResponse} from 'axios'
import useInput from '../../components/hook/useInput'
import {Alert} from '@mui/material'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'


declare global {
  interface Window {
    naver: any;
  }
}

const { naver } = window as any

const Login = ({handleClose}: any) => {
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [loginError, setLoginError] = useState(false)

  useEffect(() => {
    authNaver()
  }, [])

  const onSubmit = useCallback (
    (e) => {
      e.preventDefault()

      if (!id || !password) {
        return
      }

      axios.post('/api/user/login', {
        id,
        password
      }).then((res: AxiosResponse) => {
        if (res.data) {
          localStorage.setItem('userId', id)
          localStorage.setItem('userToken', res.data.body.token)
          handleClose()
          window.location.href = '/mybodydiary'
        } else {
          setLoginError(true)
        }
      })
      .catch((error) => {
        alert(error)
      })
    },
    [id, password, handleClose]
  )

  const authNaver = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: '4WcKqC5uvMBW2B5yesCP',
      callbackUrl: 'http://localhost:3000/mybodydiary',
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: 'green',
        type: 3,
        width: 60,
        height: 40
      }
    })

    naverLogin.init()
    naverLogin.logout()
  }

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <Input name="id"
                value={id}
                onChange={onChangeId}
                placeholder="ID"/>
        <br/>

        <Input name="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                placeholder="비밀번호"/>
        <br/>

        <div>
          {!id && <Alert severity="info">ID를 입력하시기 바랍니다.</Alert>}
          {!password && id && <Alert severity="info">비밀번호를 입력하시기 바랍니다.</Alert>}
          {loginError && <Alert severity="error">로그인을 실패하였습니다.</Alert>}
        </div>

        <Button type="submit">Login</Button>
        <br/>

        <div id="naverIdLogin"></div>
      </form>
    </div>
  );
}

export default Login
