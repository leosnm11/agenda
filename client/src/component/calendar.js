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
import dotenv from 'dotenv';

dotenv.config();
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

  // let json2 = [];
  // const ev = allEvent.forEach((e, i) => {
  //   const { _id, user, color, doc } = e;
  //   if (doc.length > 1) {
  //     for (let d = 0; d < doc.length; d++) {
  //       console.log(json2, ...doc);
  //       json2.push({ user: user, evento: doc[d].evento });
  //     }
  //   }
  //   return;
  // });
  // console.log(json2);

  let json = [];
  const eventos = allEvent.map((events) => {
    const { _id, user, turno, color, doc } = events;
    if (doc.length > 1) {
      for (let i = 0; i < doc.length; i++) {
        json.push({
          id: doc[i]._id,
          iduser: _id,
          user: user,
          turno: turno,
          title: doc[i].evento,
          start: moment(doc[i].data).format('YYYY-MM-DD'),
          end: moment(doc[i].data).format('YYYY-MM-DD'),
          backgroundColor: color,
          borderColor: color,
          display: 'block',
        });
      }
    }
    return json;
  });

  const handleMouseOn = (event) => {
    const currEvent = event.event._def;
    const filter = json.find((e) => {
      return currEvent.publicId === e.id;
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
              <span>Responsável: </span>
              <span>{filter.user}</span>
            </div>
            <div>
              <span>Atividade: </span>
              <span>{filter.title}</span>
            </div>
            <div>
              <span>Turno: </span>
              <span>{filter.turno}</span>
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

  return (
    <div>
      <div className={css.flex2}>
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
              events={json}
              themeSystem="bootstrap"
              eventClick={handleMouseOn}
            />
          )}
          {active === true ? tooltip : ''}
        </div>
        {/* {allEvent.length > 0 && (
          <div className={css.mapa}>
            <div>
              {allEvent.map((u) => {
                return (
                  <div>
                    <div style={{ marginBottom: '3px' }}>
                      <span>{u.user}: </span>
                      <span
                        style={{
                          border: `1px solid ${u.color}`,
                          width: '3px',
                          height: '1px',
                          borderRadius: '8px',
                          paddingLeft: '3px',
                          paddingRight: '3px',
                          paddingBottom: '1px',
                          backgroundColor: `${u.color}`,
                          marginLeft: '3px',
                        }}
                      ></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
