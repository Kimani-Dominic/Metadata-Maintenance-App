import React, {useState} from 'react';
import { InputField } from '@dhis2/ui';
import './sidebar.css';

const Sidebar = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('/');
    const onMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <div className='sidebar'>
            <ul>
                       <InputField
                        type="search"
                        placeholder="Search data elements" />
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
