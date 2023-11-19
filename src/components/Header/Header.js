import { useState, useEffect } from 'react'
import './Header.css';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo/logo.svg'
import avatar from '../../images/profile/profile-icon.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, ...props }) {

    const [width, setWidth] = useState(window.innerWidth);
    
    const breakpoint = 768;

    const [isOpenBurger, setIsOpenBurger] = useState(false);
    const currentLocation = useLocation().pathname === '/';
    const [isOpenMainPage, setIsOpenMainPage] = useState(true);

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    useEffect(() => {

        setIsOpenMainPage(currentLocation);
    }, [currentLocation]);

    const mainPageLoggedHeader = () => {
        return (<header className='header header_color_blue'>
        <div className='header__container'>
        <Link to='/'><img className='header__logo' src={logo} alt='Логотип' /></Link>
            <div className='header__menu_container'>
                <nav className='header__menu-movies'>
                    <NavLink to='movies' className='header__link header__link-movies'>Фильмы</NavLink>
                    <NavLink to='saved-movies' className='header__link header__link-movies'>Сохранённые фильмы</NavLink>
                </nav>
            </div>

            <nav className='header__menu-profile'>
                <div className='header__menu-profile header__menu-profile_color_green'>
                    <NavLink to='profile' className='header__link header__link_color_black header__link-profile'>Аккаунт</NavLink>
                    <div className='header__profile_container'>
                        <img className='header__profile_avatar-container' src={avatar} alt='Аватар профиля' />
                    </div>
                </div>
            </nav>
        </div>
    </header>)
    }

    const mainPageNotLoggedHeader = () => {
        return (<header className='header header_color_blue'>
        <div className='header__container'>

            <a className='header__logo-link' href='#about-project'><img className='header__logo' src={logo} alt='Логотип' /></a>

            <nav className='header__menu'>
                <NavLink to='signup' className='header__link'>Регистрация</NavLink>
                <NavLink to='signin' className='header__link header__link-login'>
                    <div className='header__link-btn header__link-btn_color_green'>Войти</div>
                </NavLink>
            </nav>
        </div>
    </header>)
    }

    const mainPageMobileHeader = () => {
        return (<header className='header-mobile header-mobile_color_blue'>
        <div className='header-mobile__container'>
            <Link className='header-mobile__logo' to='/'><img className='header-mobile__logo' src={logo} alt='Логотип' /></Link>
            <div onClick={() => { setIsOpenBurger(isOpenBurger !== true) }} className='burger-menu'>
                {
                    isOpenBurger ? <button className='burger-menu__btn-close'>+</button>
                        : <button className='burger-menu__btn'></button>
                }
            </div>
            <Navigation isOpenBurger={isOpenBurger} currentWidth={width} />
        </div>
    </header>)
    }

    const allPagesHeader = () => {
        return (<header className={`header`}>
        <div className='header__container'>
            <Link to='/'><img className='header__logo' src={logo} alt='Логотип' /></Link>
            <div className='header__menu_container'>
                
                <nav className='header__menu-movies'>
                    <NavLink to='movies' className='header__link header__link_color_black header__link-movies'>Фильмы</NavLink>
                    <NavLink to='saved-movies' className='header__link header__link_color_black'>Сохранённые фильмы</NavLink>
                </nav>
            </div>

            <nav className='header__menu-profile'>
                <div className='header__menu-profile'>
                    <NavLink to='profile' className='header__link header__link_color_black header__link-profile'>Аккаунт</NavLink>
                    <div className='header__profile_container'>
                        <img className='header__profile_avatar-container' src={avatar} alt='Аватар профиля' />
                    </div>
                </div>
            </nav>

        </div>
    </header>)
    }

    const allPagesMobileHeader = () => {
        return (<header className='header-mobile'>
        <div className='header-mobile__container'>
            <Link className='header-mobile__logo' to='/'><img className='header-mobile__logo' src={logo} alt='Логотип' /></Link>
            <div onClick={() => { setIsOpenBurger(isOpenBurger !== true) }} className='burger-menu'>
                {
                    isOpenBurger ? <button className='burger-menu__btn-close'>+</button>
                        : <button className='burger-menu__btn burger-menu__btn_color_black'></button>
                }
            </div>
            <Navigation isOpenBurger={isOpenBurger} currentWidth={width} />
        </div>
    </header>)
    }

    return isOpenMainPage ? 
    loggedIn ? width > breakpoint ? mainPageLoggedHeader() : mainPageMobileHeader() : mainPageNotLoggedHeader()
    : 
    width > breakpoint ? allPagesHeader() : allPagesMobileHeader()
}

export default Header