import { useState, useEffect } from 'react'
// import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate } from '@fullcalendar/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


const Training = (props: any) => {
  const [weekendsVisible, setWeekendsVisible] = useState(false)

  // const handleWeekendsToggle = () => {
  //   setWeekendsVisible(!weekendsVisible)
  // }

  const classes = ['tab-component', props.activeTab && 'active']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <h2>Training</h2>
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
        weekends={weekendsVisible}
      />
    </div>
  );
};

export default Training