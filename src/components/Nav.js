import React from 'react';
import {NavLink} from "react-router-dom";
import '../styles/NavStyle.css'

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" className={({isActive}) => (isActive ? "active" : 'none')}>to-do list</NavLink></li>
                <li><NavLink to="/calendar" className={({isActive}) => (isActive ? "active" : 'none')}>calendar</NavLink></li>
                <li><NavLink to="/notes" className={({isActive}) => (isActive ? "active" : 'none')}>notes</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;
