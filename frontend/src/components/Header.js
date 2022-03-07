import React, { useContext, useReducer } from 'react';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import headerLogo from '../images/logo.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header(props) {

  //функция удаления jwt 
  function signOut(){
    localStorage.removeItem('jwt');
    props.changiLoggedIn()
    props.history.push('/sign-in');
  }
    return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="лого"/>
      <Switch>
        <Route path="/sign-up">
          <Link to="sign-in" className="header__register-link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="sign-up" className="header__register-link">
            Регистрация
          </Link>
        </Route>
        <Route>
          <div>
            <span className="header__email">{props.userEmail}</span>
            <button type="button" onClick={signOut} className="header__exit" >Выйти</button>
          </div>
        </Route>
      </Switch>
      {/* <Link to="sign-in" className="header__register-link">Войти</Link> */}
    </header>)
}
export default withRouter(Header);

