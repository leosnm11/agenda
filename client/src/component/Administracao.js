import React from 'react';
import css from '../helpers/style.module.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import addUserPath from './subcomponent/AddUser';
import editUserPath from './subcomponent/EditUser';
import addEventPath from './subcomponent/AddTypeEvent';
import editEventPath from './subcomponent/EditEvent';

export default function Administracao() {
  return (
    <div className={css.divNav}>
      <Router>
        <div className={`${css.admin} `}>
          <div className={`z-depth-2 ${css.admContainer}`}>
            <Link to={'/administracao/newuser'}>
              <label className={css.divAdm}>
                Novo responsável:
                <button className={`btn-small ${css.buttonAdm}`}>
                  <i class="material-icons">add</i>
                  <i class="material-icons Medium">person</i>
                </button>
              </label>
            </Link>
            <Link to={'/administracao/edituser'}>
              <label className={css.divAdm}>
                Editar responsável:
                <button className={`btn-small ${css.buttonAdm}`}>
                  <i className="material-icons">edit</i>
                  <i className="material-icons">person</i>
                </button>
              </label>
            </Link>
            <Link to={'/administracao/addevent'}>
              <label className={css.divAdm}>
                Novo tipo de atividade:
                <button className={`btn-small ${css.buttonAdm}`}>
                  <i className="material-icons">add</i>
                  <i className="material-icons Medium">event_available</i>
                </button>
              </label>
            </Link>
            <Link to={'/administracao/editevent'}>
              <label className={css.divAdm}>
                Editar/Excluir atividade:
                <button className={`btn-small ${css.buttonAdm}`}>
                  <i className="material-icons Large">edit</i>
                  <i className="material-icons Large">event_note</i>
                  <i className="material-icons Large">delete</i>
                </button>
              </label>
            </Link>
          </div>
        </div>
        <div>
          <Switch>
            <Route
              path="/administracao/newuser"
              component={addUserPath}
            ></Route>
            <Route
              exact
              path="/administracao/edituser"
              component={editUserPath}
            ></Route>
            <Route
              path="/administracao/addevent"
              component={addEventPath}
            ></Route>
            <Route
              path="/administracao/editevent"
              component={editEventPath}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
