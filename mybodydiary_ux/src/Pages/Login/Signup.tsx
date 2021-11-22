import React, { useState, useCallback } from 'react'
import axios from 'axios'
import useInput from '../../hook/useInput'
import { Alert } from '@mui/material'
import { Button, InputLabel, Link, Container } from '@material-ui/core'


const Signup = () => {
  const [email, onChangeEmail] = useInput('')
  const [id, onChangeId] = useInput('')
  const [password, setPassword] = useInput('')
  const [passwordCheck, setPasswordCheck] = useInput('')
  const [mismatchError, setMismatchError] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const [signUpSuccess, setSignUpSuccess] = useState(false)


  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value)
      setMismatchError(e.target.value !== passwordCheck)
    },
    [passwordCheck]
  )

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password)
    },
    [password]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!mismatchError) {
        console.log('서버로 회원가입하기');
        setSignUpError('');
        setSignUpSuccess(false);
        // 요청 보내기 직전에 값들을 전부 초기화 해주자. 아니라면 요청을 연달아 날릴 때
        // 첫번째 요청때 남아있던 결과가 두번째 요청때도 똑같이 표시되는
        // 문제가 있을 수 있다.
        axios
          .post('/api/users', {
            email,
            id,
            password,
          })
          .then((response) => {
            // 성공시
            console.log(response);
            setSignUpSuccess(true);
          })
          .catch((error) => {
            // 실패시
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          .finally(() => {});
      }
    },
    [email, id, password, passwordCheck],
  )

  return (
    <div id="container">
      <h2>회원 가입</h2>
      <form onSubmit={onSubmit}>
        <InputLabel id="email-label">
          <span>이메일 주소</span>
          <div>
            <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </InputLabel>
        <InputLabel id="nickname-label">
          <span>닉네임</span>
          <div>
            <input type="text" id="id" name="id" value={id} onChange={onChangeId} />
          </div>
        </InputLabel>
        <InputLabel id="password-label">
          <span>비밀번호</span>
          <div>
            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </InputLabel>
        <InputLabel id="password-check-labe">
          <span>비밀번호 확인</span>
          <div>
            <input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Alert>비밀번호가 일치하지 않습니다.</Alert>}
          {!id && <Alert>닉네임을 입력해주세요.</Alert>}
          {signUpError && <Alert>{signUpError}</Alert>}
          {signUpSuccess && <Alert>회원가입 되었습니다! 로그인 해주세요.</Alert>}
        </InputLabel>
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
