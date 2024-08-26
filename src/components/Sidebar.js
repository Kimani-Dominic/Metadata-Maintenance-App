// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import './sidebar.css';

// const Sidebar = () => {
//     return(
//         <nav className="sidebar">
//             <ul>
//                 <li><NavLink to="/overview" activeClassName="active">Metadata Overview</NavLink></li>
//                 <li><NavLink to="/" activeClassName="active">Categories</NavLink></li>
//                 <li><NavLink to="/data-elements" activeClassName="active">Data elements</NavLink></li>
//                 <li><NavLink to="/data-elements/overview" activeClassName="active">Overview</NavLink></li> 
//                 <li><NavLink to="/data-elements/groups" activeClassName="active">Data element group</NavLink></li>
//                 <li><NavLink to="/data-elements/group-sets" activeClassName="active">Data element group set</NavLink></li>
//                 <li><NavLink to="/" activeClassName="active">Data sets</NavLink></li>
//                 <li><NavLink to="/" activeClassName="active"></NavLink></li>
//                 <li><NavLink to="/" activeClassName="active">Organisation units</NavLink></li>
//                 <li><NavLink to="/" activeClassName="active">Programs and Tracker</NavLink></li>
//                 <li><NavLink to="/" activeClassName="active">Validations</NavLink></li>
//             </ul>
//         </nav>
// );
// }

// export default Sidebar;

import React from 'react';
import './sidebar.css';

const Sidebar = ({ onMenuItemClick }) => {
    return (
        <div className='sidebar'>
            <ul>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                  Metadata  Overview
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                  Categories
                </li>
                <li onClick={() => onMenuItemClick('/data-elements')} className='menu-item'>
                    Data Elements
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                    Overview
                </li>
                <li onClick={() => onMenuItemClick('/data-elements/groups')} className='menu-item'>
                    Data Element Groups
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                Data element group set
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                    Data sets
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                    Indicators
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                   Organisation Units
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                    Programs and Tracker
                </li>
                <li onClick={() => onMenuItemClick('/')} className='menu-item'>
                    Validations
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
