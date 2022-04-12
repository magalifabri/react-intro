import React from 'react';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <div className="nav">
            <ul>
                <li><Link to="/">todo list</Link></li>
                <li><Link to="/calendar">calendar</Link></li>
            </ul>
        </div>
    );
};

export default Nav;
