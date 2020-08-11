import React, { useEffect, useState } from 'react';
import * as api from '../api/apiService.js';
import PreLoading from '../helpers/preLoading.js';
import moment from 'moment';
import css from '../helpers/style.module.css';

export default function User() {
  const [allUser, SetAllUser] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const [currDate, setCurrDate] = useState('');
  const [currName, setCurrName] = useState('');

  useEffect(() => {
    const Event = async () => {
      const eventAll = await api.getEvent();
      setTimeout(() => {
        SetAllUser(eventAll.data);
      }, 3000);
    };
    Event();
  }, []);
  let json = [];
  const eventos = allUser.map((events) => {
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

  const handleChangeDate = (event) => {
    const data = event.target.value;
    let filters = [];

    if (!currDate) {
      if (currUser.length > 0) {
        filters = currUser.filter((u) => String(u.start).includes(data));
      } else {
        filters = json.filter((e) => String(e.start).includes(data));
      }
      setCurrDate(data);
    } else {
      if (currUser.length > 0) {
        filters = json.filter((u) => String(u.user).includes(currName));
        filters = filters.filter((u) => String(u.start).includes(data));
      } else {
        filters = json.filter((e) => String(e.start).includes(data));
      }
      setCurrDate(data);
    }
    setCurrUser(filters);
  };
  const handleChangeName = (event) => {
    const name = event.target.value;
    let filters = [];
    if (currUser.length > 0) {
      filters = currUser.filter((u) => String(u.user).includes(name));
    } else {
      filters = json.filter((e) => String(e.user).includes(name));
    }

    if (!name) {
      if (currDate) {
        filters = json.filter((u) => String(u.start).includes(currDate));
        setCurrUser(filters);
      } else {
        setCurrUser([]);
      }
    } else {
      setCurrUser(filters);
    }
    setCurrName(name);
  };

  return (
    <div className="highlight">
      {allUser.length === 0 && <PreLoading />}
      {allUser.length > 0 && (
        <div>
          <div className={`${css.filter} row`}>
            <div className={`col s2 ${css.filterInput}`}>
              <input
                type="date"
                className="datepicker"
                format="YYYY-MM-DD"
                onChange={handleChangeDate}
              />
            </div>
            <div className={`col s12 ${css.filterInput}`}>
              <input
                type="text"
                className="validate"
                onChange={handleChangeName}
              />
            </div>
          </div>
          <table className="highlight">
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Turno</th>
                <th>Atividades</th>
                <th>data</th>
                <th></th>
              </tr>
            </thead>
            {currUser.length > 0 &&
              currUser.map((u) => {
                const { id, title, user, turno, start } = u;
                return (
                  <tbody key={id}>
                    <tr>
                      <td>{user}</td>
                      <td>{turno}</td>
                      <td>{title}</td>
                      <td>{moment(start).format('YYYY-MM-DD')}</td>
                      <td>
                        <button
                          className="waves-effect waves-light btn-small"
                          id={id}
                        >
                          Edit ainda não está funcionando
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      )}
    </div>
  );
}
