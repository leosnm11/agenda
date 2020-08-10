import React, { useEffect, useState } from 'react';
import * as api from '../api/apiService.js';
import PreLoading from '../helpers/preLoading.js';
import moment from 'moment';

export default function User() {
  const [allUser, SetAllUser] = useState([]);

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
  return (
    <div className="highlight">
      {allUser.length === 0 && <PreLoading />}
      {allUser.length > 0 && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Turno</th>
                <th>Atividades</th>
                <th>data</th>
                <th></th>
              </tr>
            </thead>
            {json.map((u) => {
              const { id, title, user, turno, start } = u;
              return (
                <tbody key={id}>
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
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
}
