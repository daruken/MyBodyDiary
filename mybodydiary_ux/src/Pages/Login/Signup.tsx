import { useState, useCallback } from 'react'
import axios from 'axios'
import useInput from '../../hook/useInput'
import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import { Link, Container } from '@material-ui/core'


const Signup = () => {
  const [email, onChangeEmail] = useInput('')
  const [id, onChangeId] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [mismatchError, setMismatchError] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  const onChangePasswordCheck = useCallback(
    (e) => {
      setMismatchError(e.target.value !== password)
      setPasswordCheck(e.target.value)
    },
    [password])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (!mismatchError) {
        setSignUpError('')
        setSignUpSuccess(false)
        // 요청 보내기 직전에 값들을 전부 초기화 해주자. 아니라면 요청을 연달아 날릴 때
        // 첫번째 요청때 남아있던 결과가 두번째 요청때도 똑같이 표시되는
        // 문제가 있을 수 있다.
        axios.post('/api/users', {
            id,
            email,
            password,
          })
          .then((response) => {
            setSignUpSuccess(true)
          })
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, id, password, mismatchError],
  )

  return (
    <div id="container">
      <h2>회원 가입</h2>
      <form onSubmit={onSubmit}>
        <Input name="id"
          value={id}
          onChange={onChangeId}
          placeholder="ID" />
          {!id && <Alert>ID를 입력해주세요.</Alert>}
          <br/>

        <Input name="email"
          value={email}
          onChange={onChangeEmail}
          placeholder="E-Mail" />
          <br/>

        <Input name="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호" />
          <br/>

        <Input name="password-check"
          type="password"
          value={passwordCheck}
          onChange={onChangePasswordCheck} 
          placeholder="비밀번호 확인" />
          {mismatchError && <Alert>비밀번호가 일치하지 않습니다.</Alert>}
      
          <br/>

          {signUpError && <Alert>{signUpError}</Alert>}
          {signUpSuccess && <Alert>회원가입 되었습니다!</Alert>}
        
        <Button type="submit">회원가입</Button>
      </form>

      <Container>
        이미 회원이신가요?&nbsp;
        <Link href="/login">로그인 하러가기</Link>
      </Container>
    </div>
  );
}

export default Signup
