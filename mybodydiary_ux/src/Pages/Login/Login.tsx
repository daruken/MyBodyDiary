import { useState, useCallback } from 'react'
import axios from 'axios'
import useInput from '../../hook/useInput'
import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import { Link, Container } from '@material-ui/core'


const Login = () => {
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [loginError, setLoginError] = useState(false)

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (!id || !password ) {
        return
      }
      
      axios.post('/api/login', {
          id,
          password
        })
        .then((res: any) => {
          if (res.data.result === 0) {
            setLoginError(false)
            localStorage.setItem('user', res.data.token)
            window.location.href = '/'
          } else {
            setLoginError(true)
          }
        })
        .catch((error) => {
          alert(error.res.data)
        })
        .finally(() => {})
      
    },
    [id, password],
  )

  return (
    <div id="container">
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <Input name="id"
          value={id}
          onChange={onChangeId}
          placeholder="ID" />
          <br/>

        <Input name="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호" />
          <br/>

        <div>
          {!id && <Alert severity="info">ID를 입력하시기 바랍니다.</Alert>}
          {!password && id && <Alert severity="info">비밀번호를 입력하시기 바랍니다.</Alert>}
          {loginError && <Alert severity="error">로그인을 실패하였습니다.</Alert>}
        </div>
        
        <Button type="submit">Login</Button>
      </form>

      <Container>
        회원이 아니신가요?&nbsp;
        <Link href="/signup">회원가입</Link>
      </Container>
    </div>
  );
}

export default Login
