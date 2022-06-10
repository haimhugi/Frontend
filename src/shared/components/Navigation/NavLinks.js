
import React from 'react';
import { NavLink } from 'react-router-dom';


import './NavLinks.css';

const NavLinks = props => {


    return <ul className="nav-links">
        <li>
            <NavLink to="/addUser">Add User</NavLink>
        </li>
        <li>
            <NavLink to="/users">Users</NavLink>
        </li>

    </ul>
};

export default NavLinks;