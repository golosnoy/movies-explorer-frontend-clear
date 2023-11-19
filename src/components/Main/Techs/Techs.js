import React from 'react'
import './Techs.css';

function Techs() {
    return (
        <section className='techs'>
            <div className='techs__container'>

                <h2 className='techs__title'>Технологии</h2>

                <div className='techs__discriptions-items'>

                    <div className='techs__discription-container'>
                        <div className='techs__discription'>
                            <h2 className='techs__discription-title'>7 технологий</h2>
                            <h3 className='techs__discription-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</h3>
                        </div>
                    </div>
                </div>
                <ul className='techs__languages-collection'>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>HTML</p>
                    </li>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>CSS</p>
                    </li>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>JS</p>
                    </li>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>React</p>
                    </li>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>Git</p>
                    </li>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>Express.js</p>
                    </li>
                    <li className='techs__languages-item'>
                        <p className='techs__languages-text'>mongoDB</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;