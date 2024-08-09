import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    return(
        <nav className="sidebar">
            <ul>
                <li><NavLink to="/overview" activeClassName="active">Metadata Overview</NavLink></li>
                <li><NavLink to="/categories" activeClassName="active">Categories</NavLink></li>
                <li><NavLink to="/data-elements" activeClassName="active">Data elements</NavLink></li>
                <li className="submenu">
                    <NavLink to="/data-elements/overview" activeClassName="active">Overview</NavLink>
                    <NavLink to="/data-elements/groups" activeClassName="active">Data element group</NavLink>
                    <NavLink to="/data-elements/group-sets" activeClassName="active">Data element group set</NavLink>
                </li>
                <li><NavLink to="/data-sets" activeClassName="active">Data sets</NavLink></li>
                <li><NavLink to="/indicators" activeClassName="active">Indicators</NavLink></li>
                <li><NavLink to="/organisation-units" activeClassName="active">Organisation units</NavLink></li>
                <li><NavLink to="/programs-tracker" activeClassName="active">Programs and Tracker</NavLink></li>
                <li><NavLink to="/validations" activeClassName="active">Validations</NavLink></li>
            </ul>
        </nav>
);
}

export default Sidebar;