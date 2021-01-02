import React from 'react';
import './About.css'
import homeLogo from '../../img/home_logo.png'
import {NavLink} from 'react-router-dom'


const About = () =>( 
    <div className="container">
        <div className="header">
        <h1><img alt='house' src={homeLogo}></img> ТихийДом.ру</h1>
        </div>
        <div className="footer">

        <p className="paragraphMain">Данный проект направлен на выявление домов с "картонными стенами" — 
            в таких домах невозможно жить, в таких домах невозможно найти покой.<br />
            В таких домах становишься невольным свидетелем жизнедеятельности
            других людей: музыка по ночам, грохот, скандалы, смех, телевизор,
            секс — всё это раздражает, всё это результат экономии на строительных
            материалах, работе инженеров, конструкторов, работе по оптимизации
            шумопроницаемости помещений. <br />Я надеюсь <strong>данный сервис поможет вам </strong>
            подобрать тихую квартиру для уютной жизни. Такую квартиру, в которой можно жить, растить детей и дышать полной грудью!
            Желаю удачи!<br />
            
        </p>
        <p className="paragraph">— Георгий Апраксин</p>
        </div>
        <NavLink to='/'>Назад</NavLink>
    </div>

)
export default About;