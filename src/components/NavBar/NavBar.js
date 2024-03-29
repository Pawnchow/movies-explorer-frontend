import './NavBar.css';
import { React, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function NavBar({ isLogged }) {
  return isLogged ? LoggedMenu() : NotLoggedMenu();
};

 function NotLoggedMenu() {
  return (
    <nav className='nav-landing'>
      <Link className='nav-landing__link-reg' to='/signup'>Регистрация</Link>
      <Link className='nav-landing__link-login' to='/signin'>Войти</Link>
    </nav>
  );
};

function LoggedMenu() {
  const setActive = ({ isActive }) =>(isActive ? 'nav-movies__link nav-movies__link_active' : 'nav-movies__link');
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }
  const burgerMenu = () => {
    if (!isBurgerMenuOpen) {
      return (<button className='nav-movies__burger-btn' onClick={toggleBurgerMenu} />)
    }
    return <BurgerMenu onClose={toggleBurgerMenu} />
  };

  return (
    <nav className='nav-movies'>
      <div className='nav-movies__links'>
        <NavLink className={setActive} to='/movies'>Фильмы</NavLink>
        <NavLink className={setActive} to='/saved-movies'>Сохранённые фильмы</NavLink>
      </div>
      <div className='nav-movies__account-btn-wrap'>
        <Link className='nav-movies__account-btn' to='/profile'>Аккаунт</Link>
      </div>
      {burgerMenu()}
    </nav>
  );
};

export default NavBar;
