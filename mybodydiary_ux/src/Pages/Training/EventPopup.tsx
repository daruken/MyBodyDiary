import {useCallback} from 'react'
import axios, {AxiosResponse} from 'axios'
import useInput from '../../hook/useInput'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

type EventProps = {
    date: any,
    handleClose: any
}

const EventPopup = (props: EventProps) => {
    const [title, onChangeTitle] = useInput('')
    const [content, onChangeContent] = useInput('')
    const date = props.date

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault()

            if (!title || !content) {
                return
            }

            axios.post('/api/events', {
                date,
                title,
                content
            })
                .then((res: AxiosResponse) => {
                    if (res.data.result === 0) {
                        props.handleClose()
                        window.location.href = '/mybodydiary'
                    } else {

                    }
                })
                .catch((error) => {
                    alert(error)
                })
                .finally(() => {
                })

        },
        [title, content, props.handleClose]
    )

    return (
        <div>
            <h2>일정 관리</h2>
            <form onSubmit={onSubmit}>
                <Input name="title"
                       value={title}
                       onChange={onChangeTitle}
                       placeholder="제목"/>
                <br/>

                <Input name="content"
                       value={content}
                       onChange={onChangeContent}
                       placeholder="콘텐츠"/>
                <br/>

                <Button type="submit">등록</Button>
            </form>
        </div>
    );
}

export default EventPopup