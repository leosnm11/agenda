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
            {allUser.map((u) => {
              const { _id, event, user, tn, data } = u;
              return (
                <tbody key={_id}>
                  <td>{user}</td>
                  <td>{tn}</td>
                  <td>{event}</td>
                  <td>{moment(data).format('YYYY-MM-DD')}</td>
                  <td>
                    <a className="waves-effect waves-light btn-small" id={_id}>
                      Edit ainda não está funcionando
                    </a>
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
