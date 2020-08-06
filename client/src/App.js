import React from 'react';
import css from './helpers/style.module.css';
import userPath from './component/user';
import eventPath from './component/event';
import calendarEvent from './component/calendar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className={css.body}>
        <nav>
          <div className="nav-wrapper black">
            <img
              src="https://www.xpi.com.br/assets/logos/logo-xpi.svg"
              alt="XP"
              style={{
                width: '180px',
                marginLeft: '10px',
                cursor: 'pointer',
              }}
              href="./"
            />
            <a href="/" className="brand-logo center">
              Fluxo Diário
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to={'/'}>Atividades</Link>
              </li>
              <li>
                <Link to={'/users'}>Listar todas atividades</Link>
              </li>
              <li>
                <Link to={'/atividades'}>Add Atividades</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div>
          <Switch>
            <Route exact path="/" component={calendarEvent} />
            <Route exact path="/users" component={userPath} />
            <Route path="/atividades" component={eventPath} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
