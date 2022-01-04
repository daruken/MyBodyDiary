import {useState} from 'react'
import Modal from 'react-responsive-modal'
import FullCalendar, {EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate} from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {TabProps} from '../../Components/Tab'
import EventPopup from './EventPopup'


const Training = (props: TabProps) => {
    const [isShowEvent, setIsShowEvent] = useState(false)
    const openEventModal = () => {
        setIsShowEvent(true)
    }
    const closeEventModal = () => {
        setIsShowEvent(false)
    }

    const [calendarInfo, setCalendarInfo] = useState('')

    const currentEvents: any[] = [
        {id: 1, title: '하체', date: '2021-12-31'},
        {id: 2, title: '어깨', date: '2022-01-03'}
    ]

    const classes = ['tab-component', props.activeTab && 'active']
        .filter(Boolean)
        .join(' ');

    const checkDateEvent = (info: any) => {
        setCalendarInfo(info.date)
        openEventModal()
    }

    const renderSidebarEvent = (event: EventApi) => {
        return (
            <li key={event.id}>
                <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
                <i>{event.title}</i>
            </li>
        )
    }

    return (
        <div className={classes}>
            <h2>Training</h2>

            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>

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
        </div>
    );
};

export default Training