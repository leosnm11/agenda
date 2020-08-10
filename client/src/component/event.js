import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import css from '../helpers/style.module.css';
import * as api from '../api/apiService.js';
import PreLoading from '../helpers/preLoading.js';

const AddEvent = () => {
  const initialEventState = {
    id: null,
    user: '',
    turno: '',
    color: '',
    doc: [],
  };
  const [line, setLine] = useState([
    {
      evento: '',
      data: '',
      mes: '',
      ano: '',
    },
  ]);
  const [findEvent, setFindEvent] = useState([]);
  const [allDados, setAllDados] = useState([]);
  const [newEvent, setNewEvent] = useState(initialEventState);
  const [submitted, setSubmitted] = useState(false);
  const [add, setAdd] = useState(false);
  const handleDocChange = async (index, event) => {
    const value = [...line];
    if (event.target.name === 'evento') {
      value[index].evento = event.target.value;
    } else {
      value[index].data = event.target.value;
      value[index].mes = moment(event.target.value).format('YYYY-MM');
      value[index].ano = moment(event.target.value).format('YYYY');
    }
    setLine(value);
  };

  const duplicCamp = () => {
    const value = [...line];
    value.push({
      evento: '',
      data: '',
    });
    setLine(value);
  };
  const removeCamp = (index) => {
    const value = [...line];
    value.splice(index, 1);
    setLine(value);
  };

  useEffect(() => {
    const Event = async () => {
      const eventAll = await api.getEvent();
      const findE = await api.getListEvent();
      setTimeout(() => {
        setFindEvent(findE.data);
        setAllDados(eventAll.data);
      }, 3000);
    };
    Event();
  }, []);

  const findUser = allDados.map((u) => {
    return u.user;
  });

  const saveEvent = (e) => {
    let data = {
      user: newEvent.user,
      turno: newEvent.turno,
      data: moment(newEvent.data).format('YYYY-MM-DD'),
      doc: [],
    };
    data.doc.push(...line);
    api
      .createEvent(data)
      .then((res) => {
        setSubmitted(true);
      })
      .catch((e) => {});
    e.preventDefault();
  };
  const currEvent = () => {
    setNewEvent(initialEventState);
    setLine([
      {
        evento: '',
        data: '',
        mes: '',
        ano: '',
      },
    ]);
    setSubmitted(false);
  };
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    const findUser = await allDados.find((u) => {
      return value === u.user;
    });

    await setNewEvent({ ...newEvent, [name]: value, turno: findUser.turno });
    await setAdd(true);
  };

  return (
    <div>
      {allDados.length === 0 && <PreLoading />}

      {allDados.length > 0 && (
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
                  <div className="col s6">
                    <label htmlFor="user">
                      Informe o responsável
                      <select
                        name="user"
                        id="user"
                        defaultValue=""
                        onChange={handleInputChange}
                        className={css.select}
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        {findUser.map((u) => {
                          return (
                            <option value={u} key={u}>
                              {u}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                  </div>
                  <div className="col s6">
                    <span>Turno:</span>
                    <h2>{newEvent.turno}</h2>
                  </div>
                </div>
                {line.map((inputField, index) => {
                  return (
                    <Fragment key={`${inputField}~${index}`}>
                      {add === true && (
                        <div className="row">
                          <div className="col s10">
                            <label htmlFor="evento">
                              Informe o responsável
                              <select
                                name="evento"
                                id="evento"
                                defaultValue=""
                                onChange={(event) =>
                                  handleDocChange(index, event)
                                }
                                className={css.select}
                              >
                                <option value="" disabled>
                                  Selecione
                                </option>
                                {findEvent.map((e) => {
                                  return (
                                    <option value={e.eventos} key={e.eventos}>
                                      {e.eventos}
                                    </option>
                                  );
                                })}
                              </select>
                            </label>
                          </div>
                          <div className="col s2">
                            <input
                              type="date"
                              className="datepicker"
                              format="YYYY-MM-DD"
                              id="data"
                              name="data"
                              onChange={(event) =>
                                handleDocChange(index, event)
                              }
                            />
                          </div>
                          <div>
                            <div className="form-group col-sm-2">
                              <button
                                className="waves-effect waves-light btn-small red"
                                type="button"
                                onClick={() => removeCamp(index)}
                                disabled={index > 0 ? false : true}
                              >
                                X
                              </button>

                              <button
                                className="waves-effect waves-light btn-small"
                                type="button"
                                onClick={duplicCamp}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Fragment>
                  );
                })}
                <div className={css.buttonAdd}>
                  <button
                    className="btn-small waves-effect waves-light"
                    type="submit"
                    name="action"
                    onClick={saveEvent}
                    disabled={false}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddEvent;
