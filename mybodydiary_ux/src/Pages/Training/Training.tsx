import { useState, useEffect } from 'react'
import Modal from 'react-responsive-modal'
import FullCalendar, {EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import styled from 'styled-components'
import axios from 'axios'
import {TabProps} from '../../Components/Tab'
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
      }).then((res: any) => {
        setCurrentEvents(res.data.body)
      })
    }

    useEffect(() => {
      getEvents()
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