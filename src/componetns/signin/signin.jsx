import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {Operations as UserOperations} from '../../reducer/user-reducer'

const SingIn = (props) => {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch();
  const handleChangeEmail = (evt) => {
    setUserData(Object.assign({}, userData, {email: evt.target.value}))
  }
  const handleChangePassword = (evt) => {
    setUserData(Object.assign({}, userData, {password: evt.target.value}))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(userData)
    dispatch(UserOperations.signin(userData))
  }

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input value={userData.email} onChange={handleChangeEmail} className="login__input form__input"
                     type="email" name="email" placeholder="Email" required=""/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input value={userData.password} onChange={handleChangePassword} className="login__input form__input"
                     type="password" name="password" placeholder="Password"
                     required=""/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}


export default SingIn;
