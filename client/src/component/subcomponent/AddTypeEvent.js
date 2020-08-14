import React, { useEffect, useState } from 'react';
import * as api from '../../api/apiService.js';
import PreLoading from '../../helpers/preLoading.js';
import css from '../../helpers/style.module.css';

export default function AddTypeEvent() {
  const [newEvent, setNewEvent] = useState([]);
  const [addEvent, setAddEvent] = useState([]);
  const [men, setMen] = useState('');
  const [newValue, setNewValue] = useState('');
  const [addNewEvent, setAddNewEvent] = useState(false);

  useEffect(() => {
    const Event = async () => {
      const eventAll = await api.getListEvent();
      setTimeout(() => {
        setNewEvent(eventAll.data);
      }, 3000);
    };
    Event();
  }, []);

  const handleChangeEventos = async (evento) => {
    const { name, value } = evento.target;
    const igual = newEvent.filter((e) => {
      return e.eventos === value;
    });
    setNewValue(value);

    let mens = `Atividade ${value} já existe! Favor verificar!`;

    if (igual.length > 0) {
      setAddNewEvent(true);
      setMen(mens);
    } else {
      setAddEvent({ [name]: value });
      setAddNewEvent(false);
      setMen('');
    }
  };

  const handleClickAdd = async (event) => {
    event.preventDefault();
    let json = {
      _id: 'null',
      eventos: addEvent.eventos,
    };
    setNewValue('');

    api
      .createTypeEvent(addEvent)
      .then((res) => {
        alert('Atividade adicionada com sucesso!');
      })
      .catch((e) => {});
    setNewEvent((newEvent) => [...newEvent, json]);
  };
  const handleClickDelete = async (event) => {
    event.preventDefault();
    const { id, name } = event.target;

    if (id === 'null') {
      const findEvent = await api.getListEvent().then((res) => {
        return res.data;
      });

      let idNew = await findEvent.filter((u) =>
        String(u.eventos).includes(name)
      );
      api
        .deleteOneEvent(idNew[0]._id)
        .then((res) => {
          alert(`Atividade excluído com sucesso!`);
        })
        .catch({});
      let remove = newEvent.filter((e) => {
        return e.eventos !== name;
      });
      setNewEvent(remove);
    } else {
      api
        .deleteOneEvent(id)
        .then((res) => {
          alert(`Atividade excluído com sucesso!`);
        })
        .catch({});
      let remove = newEvent.filter((e) => {
        return e._id !== id;
      });
      setNewEvent(remove);
    }
  };

  return (
    <div>
      {newEvent.length === 0 && <PreLoading />}
      {newEvent.length > 1 && (
        <div>
          <div>
            <form>
              <div className={css.addTypeEvent}>
                <div className={css.divTypeEvent}>
                  <div>
                    <label htmlFor="eventos" className="validate">
                      Nova atividade
                      <input
                        type="text"
                        id="eventos"
                        onChange={handleChangeEventos}
                        name="eventos"
                        value={newValue}
                        className={css.inputTypeEvent}
                      />
                    </label>
                  </div>
                  <div className={`${css.erroMess}`}>{men}</div>
                </div>
                <div>
                  <button
                    className="waves-effect waves-light btn-small"
                    disabled={
                      addEvent.length === 0
                        ? true
                        : addEvent.eventos === ''
                        ? true
                        : addNewEvent
                    }
                    onClick={handleClickAdd}
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <table className="highlight">
              <thead>
                <tr>
                  <th>Atividade</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {newEvent.map((e) => {
                  const { _id, eventos } = e;
                  return (
                    <tr key={_id}>
                      <td>{eventos}</td>
                      <td>
                        <button
                          className="waves-effect waves-light btn-small"
                          id={_id}
                          name={eventos}
                          value={`${eventos}`}
                          onClick={handleClickDelete}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
