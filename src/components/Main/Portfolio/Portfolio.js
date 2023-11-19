import React from 'react'
import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__container'>
                <div className='portfolio-links'>
                    <h2 className='portfolio-links__name'>Портфолио</h2>
                    <ul className='portfolio-links__items'>
                        <li className='portfolio-links__item'>
                            <a href='https://golosnoy.github.io/how-to-learn/' className='portfolio-links__link' target='_blank' rel='noreferrer'>Статичный сайт</a>
                            <p className='portfolio-links__link-arrow'>&#8599;</p>
                        </li>
                        <li className='portfolio-links__item'>
                            <a href='https://golosnoy.github.io/mesto/' className='portfolio-links__link' target='_blank' rel='noreferrer'>Адаптивный сайт</a>
                            <p className='portfolio-links__link-arrow'>&#8599;</p>
                        </li>
                        <li className='portfolio-links__item'>
                            <a href='https://golosnoy.github.io/russian-travel/' className='portfolio-links__link' target='_blank' rel='noreferrer'>Одностраничное приложение</a>
                            <p className='portfolio-links__link-arrow'>&#8599;</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Portfolio;