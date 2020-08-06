import React, { useState, useEffect } from 'react';
import * as api from '../api/apiService.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import css from '../helpers/style.module.css';
import moment from 'moment';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import PreLoading from '../helpers/preLoading.js';
import allLocale from '@fullcalendar/core/locales-all';

export default function Calendar() {
  const [allEvent, setAllEvent] = useState([]);
  const [active, setActive] = useState(false);
  const [tooltip, setTooltip] = useState('');
  useEffect(() => {
    const Event = async () => {
      const eventAll = await api.getEvent();
      setTimeout(() => {
        setAllEvent(eventAll.data);
      }, 3000);
    };
    Event();
  }, []);
  const eventos = allEvent.map((events) => {
    const { _id, event, data, user, tn } = events;
    return {
      id: _id,
      title: `${event} - ${user} - Turno: ${tn}`,
      start: moment(data).format('YYYY-MM-DD'),
      end: moment(data).format('YYYY-MM-DD'),
      backgroundColor: `${
        user === 'Jessica'
          ? 'purple'
          : user === 'Vinicius'
          ? 'darkblue'
          : user === 'Felipe'
          ? 'teal'
          : user === 'Vitor'
          ? 'OrangeRed'
          : 'black'
      }`,
      borderColor: `${
        user === 'Jessica'
          ? 'purple'
          : user === 'Vinicius'
          ? 'darkblue'
          : user === 'Felipe'
          ? 'teal'
          : user === 'Vitor'
          ? 'OrangeRed'
          : 'black'
      }`,
      display: 'block',
    };
  });
  const handleMouseOn = (event) => {
    console.log(event);
    const currEvent = event.event._def;
    const filter = allEvent.find((e) => {
      return currEvent.publicId === e._id;
    });
    const curr = (
      <div className={`${css.tooltip} z-depth-2 scale-in`}>
        <div className={css.flex}>
          <button
            className="waves-effect waves-light btn-small red"
            onClick={handleClose}
          >
            x
          </button>
          <div className={css.atividades}>
            <div>
              <span>Atividade: </span>
              <span>{filter.event}</span>
            </div>
            <div>
              <span>Responsável: </span>
              <span>{filter.user}</span>
            </div>
            <div>
              <span>Turno: </span>
              <span>{filter.tn}</span>
            </div>
          </div>
        </div>
      </div>
    );
    setTooltip(curr);
    setActive(true);
  };

  const handleClose = (event) => {
    console.log(event);
    setActive(false);
  };

  console.log(allEvent.length);
  return (
    <div>
      {allEvent.length === 0 && <PreLoading />}
      {allEvent.length > 0 && (
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
          ]}
          locales={[allLocale]}
          locale="pt-br"
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="auto"
          selectable={true}
          events={eventos}
          themeSystem="bootstrap"
          eventClick={handleMouseOn}
        />
      )}
      {active === true ? tooltip : ''}
    </div>
  );
}
