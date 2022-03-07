import React, { useState } from 'react'
import { Link, withRouter} from 'react-router-dom'
import auth from '../utils/Auth.js'

function Register(props) {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  

 
  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  function handleSubmit (e) {
    e.preventDefault();
    
    auth.register(values.email, values.password).then((res) => {
      if(res.data._id) {
        props.tooltipStatus(true);
        props.onTooltip()
        props.history.push('/sign-in')
        setTimeout(() =>{
          props.close()
        },2000)
      }
    }).catch(err => {
      props.tooltipStatus(false)
      props.onTooltip()
      setTimeout(() =>{
        props.close()
      },2000)
      console.log(err)
    })
  }

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
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
        <button type="submit"  className="register__button" >
          Зарегистрироваться
        </button>
        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="sign-in" className="register__login-link">Войти</Link>
        </div>
      </form>
    </div>
  )
}

export default withRouter (Register)