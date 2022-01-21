import { useCallback, useEffect, useState } from 'react'
import axios, {AxiosResponse} from 'axios'
import useInput from '../../hook/useInput'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'

type EventProps = {
  date: any,
  handleClose: any
}

const EventPopup = (props: EventProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const date = props.date
  const year = date.getFullYear()
  const month = ("0" + (1 + date.getMonth())).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)
  const localDate = year + '-' + month + '-' + day

  useEffect(() => {
    axios.get('/api/event/id/date', {
      params: {
        id: localStorage.getItem('userId'),
        date: localDate
      }
    }).then((res: any) => {
      if (res.data.body) {
        setTitle(res.data.body.title)
        setContent(res.data.body.content)
      }
    })
  }, [])

  const onSubmit = useCallback ((e) => {
    e.preventDefault()

    if (!title || !content) {
      return
    }

    axios.post('/api/event', {
      id: localStorage.getItem('userId'),
      date: localDate,
      title: title,
      content: content
    }).then((res: AxiosResponse) => {
      if (res.data.body) {
        props.handleClose()
      } 
    }).catch((error) => {
      alert(error)
    })
    },[title, content, props.handleClose])

    return (
      <div>
        <h2>일정 관리</h2>
        <form onSubmit={onSubmit}>
          <Input name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목"/>
          <br/>

          <Input name="content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="콘텐츠"/>
          <br/>

          <Button type="submit">등록</Button>
        </form>
      </div>
    );
}

export default EventPopup