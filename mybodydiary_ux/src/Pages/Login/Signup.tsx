import {useState, useCallback} from 'react'
import axios, {AxiosResponse} from 'axios'
import useInput from '../../hook/useInput'
import {Alert} from '@mui/material'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'


const Signup = ({handleClose}: any) => {
    const [id, onChangeId] = useInput('')
    const [email, onChangeEmail] = useInput('')
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

    const onChangeEmailCheck = (email: string) => {
        const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        return re.test(email)
    }

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()

            if (!id || !password || !email) {
                return
            }

            if (onChangeEmailCheck(email) === false) {
                alert('사용할 수 없는 E-Mail 주소입니다.')
                return
            }

            if (!mismatchError) {
                setSignUpError('')
                setSignUpSuccess(false)

                axios.post('/api/users', {
                    id,
                    email,
                    password,
                })
                    .then((res: AxiosResponse) => {
                        if (res.data) {
                            setSignUpSuccess(true)
                            handleClose()
                        } else {
                            setSignUpError('회원 가입에 실패하였습니다.')
                        }
                    })
                    .catch((error) => {
                        console.log(error.res)
                    })
                    .finally(() => {
                    });
            }
        },
        [email, id, password, mismatchError, handleClose]
    )

    return (
        <div id="container">
            <h2>회원 가입</h2>
            <form onSubmit={onSubmit}>
                <Input name="id"
                       value={id}
                       onChange={onChangeId}
                       placeholder="ID"/>
                <br/>

                <Input name="email"
                       value={email}
                       onChange={onChangeEmail}
                       placeholder="E-Mail"/>
                <br/>

                <Input name="password"
                       type="password"
                       value={password}
                       onChange={onChangePassword}
                       placeholder="비밀번호"/>
                <br/>

                <Input name="password-check"
                       type="password"
                       value={passwordCheck}
                       onChange={onChangePasswordCheck}
                       placeholder="비밀번호 확인"/>

                <div>
                    {!id && <Alert severity="info">ID를 입력하시기 바랍니다.</Alert>}
                    {!email && id && <Alert severity="info">E-Mail 주소를 입력하시기 바랍니다.</Alert>}
                    {!password && id && email && <Alert severity="info">비밀번호를 입력하시기 바랍니다.</Alert>}
                    {!passwordCheck && password && id && email && <Alert severity="info">비밀번호 확인을 입력하시기 바랍니다.</Alert>}
                    {mismatchError && password && <Alert severity="warning">비밀번호가 일치하지 않습니다.</Alert>}
                </div>

                {signUpError && <Alert severity="error">{signUpError}</Alert>}
                {signUpSuccess && <Alert>회원가입 되었습니다!</Alert>}

                <Button type="submit">회원가입</Button>
            </form>
        </div>
    );
}

export default Signup
