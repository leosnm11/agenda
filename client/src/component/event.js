import React, { useState } from 'react';
import moment from 'moment';
import css from '../helpers/style.module.css';
import * as api from '../api/apiService.js';

const AddEvent = () => {
  const initialEventState = {
    id: null,
    event: '',
    user: '',
    data: new moment().format('YYYY-MM-DD'),
    tn: '',
  };

  const [newEvent, setNewEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent({ ...newEvent, [name]: value });
    console.log({ [name]: value });
  };
  const saveEvent = (e) => {
    let data = {
      event: newEvent.event,
      user: newEvent.user,
      data: moment(newEvent.data).format('YYYY-MM-DD'),
      tn: newEvent.tn,
    };
    console.log(data);
    api
      .createEvent(data)
      .then((res) => {
        console.log(res);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
    e.preventDefault();
  };
  const currEvent = () => {
    setNewEvent(initialEventState);
    setSubmitted(false);
  };
  return (
    <div className={` z-depth-2  ${css.formAdd}`}>
      {submitted ? (
        <div>
          <h4>Evento adicionado com sucesso!</h4>
          <button className="btn btn-success" onClick={currEvent}>
            Add
          </button>
        </div>
      ) : (
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="event"
                  name="event"
                  type="text"
                  className="validate"
                  onChange={handleInputChange}
                />
                <label htmlFor="event">Informar atividade</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col m4 s4">
                <input
                  id="user"
                  name="user"
                  type="text"
                  className="validate"
                  onChange={handleInputChange}
                />
                <label htmlFor="user">Informar reponsável</label>
              </div>
              <div className="input-field col m4 s4">
                <input
                  id="tn"
                  name="tn"
                  type="text"
                  className="validate"
                  onChange={handleInputChange}
                />
                <label htmlFor="tn">Informe o turno</label>
              </div>
              <div className="input-field col m4 s4">
                <input
                  id="data"
                  name="data"
                  format="YYYY-MM-DD"
                  type="date"
                  defaultValue={newEvent.data}
                  className={`datepicker ${css.dataAdd}`}
                  onChange={handleInputChange}
                />
                <label htmlFor="data"></label>
              </div>
            </div>
            <div className={css.buttonAdd}>
              <button
                className="btn-small waves-effect waves-light"
                type="submit"
                name="action"
                onClick={saveEvent}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
