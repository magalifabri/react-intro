import React from 'react';
import {Link} from "react-router-dom";
import '../styles/NavStyle.css'

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">to-do list</Link></li>
                <li><Link to="/calendar">calendar</Link></li>
                <li><Link to="/notes">notes</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
