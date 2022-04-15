import React from 'react';
import {NavLink} from "react-router-dom";
import '../styles/NavStyle.scss'


const Nav = () => {

    const getItemClassNames = (isActive) => {
        if (isActive) {
            return "nav__link nav__link--active";
        } else {
            return "nav__link";
        }
    };


    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <NavLink to="/"
                             className={({isActive}) => getItemClassNames(isActive)}>
                        to-do
                    </NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/calendar"
                             className={({isActive}) => getItemClassNames(isActive)}>
                        calendar
                    </NavLink>
                </li>
                <li className="nav__item">
                    <NavLink to="/notes"
                             className={({isActive}) => getItemClassNames(isActive)}>
                        notes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
