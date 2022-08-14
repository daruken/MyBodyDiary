import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from 'react-responsive-modal'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styled from 'styled-components'
import axios, { AxiosResponse } from 'axios'
import { TabProps } from '../../components/Tabs'
import EventPopup from './EventPopup'

const FCalendar = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const Training = (props: TabProps) => {
    const [isShowEvent, setIsShowEvent] = useState(false)
    const openEventModal = () => {
      setIsShowEvent(true)
    }
    const closeEventModal = () => {
      setIsShowEvent(false)
      getEvents()
    }

    const [calendarInfo, setCalendarInfo] = useState('')
    const [currentEvents, setCurrentEvents] = useState([])

    const getEvents = () => {
      axios.get('/api/event/id', {
        params: {
          id: localStorage.getItem('userId')
        }
      }).then((res: AxiosResponse) => {
        setCurrentEvents(res.data.body)
      })
    }

    const location = useLocation()
    const getNaverToken = () => {
      if (!location.hash) {
        if (localStorage.getItem('userId')) {
          getEvents()
          return
        }
      }

      const token = location.hash.split('=')[1].split('&')[0]

      axios.get('/api/user/naver/login', {
        params: {
          accessToken: token
        }
      }).then((res: AxiosResponse) => {
        if (res.data) {
          localStorage.setItem('userId', res.data.response.email)
          localStorage.setItem('userToken', res.data.token)

          getEvents()
        }
      })
    }

    useEffect(() => {
      getNaverToken()
    }, [])

    const classes = ['tab-component', props.activeTab && 'active']
        .filter(Boolean)
        .join(' ');

    const checkDateEvent = (info: any) => {
      setCalendarInfo(info.date)
      openEventModal()
    }

    return (
      <FCalendar className={classes}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={currentEvents}
          dateClick={checkDateEvent}
        />

        <Modal
          open={isShowEvent}
          onClose={closeEventModal}
          center>
          <EventPopup date={calendarInfo} handleClose={closeEventModal}/>
        </Modal>
      </FCalendar>
    );
};

export default Training