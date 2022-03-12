import React from 'react'
import auth from '../utils/Auth'
import { useState } from 'react'
import { withRouter } from 'react-router'


function Login(props) {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.login(values.email, values.password).then((res) => {
      console.log(res);
      if (res?.jwt) {
        setValues({
          email: '',
          password: ''
        })
        localStorage.setItem('jwt', res?.jwt)
        props.handleLogin()
        props.history.push('/')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="register">
      <h1 className="register__title">Вход</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__lable-input">
          <input
            type="email"
            value={values.email} 
            onChange={handleChange}
            className="register__form-input"
            name="email"
            // id="job-profile"
            minLength="2"
            maxLength="200"
            required
            placeholder="Email"
          />
          {/* <span className="error job-profile-error"></span> */}
        </label>
        <label className="register__lable-input">
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            className="register__form-input"
            name="password"
            // id=""
            minLength="2"
            maxLength="40"
            required
            placeholder="Пароль"
          />
          {/* <span className=""></span> */}
        </label>
        <button type="submit" className="register__button">
          Войти
        </button>
      </form>
    </div>
  )
}

export default withRouter(Login)