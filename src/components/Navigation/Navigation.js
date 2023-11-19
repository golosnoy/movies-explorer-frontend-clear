import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.css';
import avatar from '../../images/profile/profile-icon.svg';


function Navigation(props) {

    return (
        <div className={`navigation ${props.isOpenBurger ? 'navigation_active' : ''}`}>
            <div className={`navigation__container 
            ${props.currentWidth > 630
                    ? 'navigation__container_color_shadow'
                    : ''}`}>
                <nav className='navigation__menu'>
                    <div className='navigation__links'>
                        <nav className='navigation__menu-movies'>
                            <NavLink to='/' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Главная</NavLink>
                            <NavLink to='movies' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Фильмы</NavLink>
                            <NavLink to='saved-movies' className={({ isActive }) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Сохранённые фильмы</NavLink>
                        </nav>
                        <div className='navigation__menu-profile_container'>
                            <nav className='navigation__menu-profile'>
                                <NavLink to='profile' className={({ isActive }) => `navigation__profile_link ${isActive ? 'navigation__link_active' : ''}`}>Аккаунт</NavLink>
                                <div className='navigation__profile_container'>
                                    <img className='navigation__profile__avatar' src={avatar} alt='Аватар профиля' />
                                </div>
                            </nav>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navigation