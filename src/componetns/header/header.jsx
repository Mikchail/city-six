import React from 'react';
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`
}
const Header = (props) => {
  const userData = useSelector(state => state[`USER`].user);
  const authorizationStatus = useSelector(state => state[`USER`].authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
  const link = isAuth ? `/favorites` : `/sign-in`;

  const avatarStyle = {
    backgroundImage: `url(https://htmlacademy-react-3.appspot.com/six-cities${userData.avatar_url})`,
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={`/`} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={link} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"
                       style={isAuth ? avatarStyle : {}}>
                  </div>
                  {isAuth
                    ? <span className="header__user-name user__name">{userData.email}</span>
                    : <span className="header__login">Sign in</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
};

export default Header;
