import React, { useState } from 'react';
import classes from './App.module.css';
import Form from './components/Form';
import Home from './Home';
import EditElement from './components/EditElement';
import Sidebar from './components/Sidebar';
import DeleteElement from './components/DeleteElement';
import GroupForm from './dataElementGroup/GroupForm';
import EditElementGroup from './dataElementGroup/EditGroup';
import Overview from './dataElementGroup/GroupHome';
import Indicator from './Indicators/indicator';
import './components/sidebar.css';

const MyApp = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('/');

    const handleMenuItemClick = (path) => {
        setSelectedMenuItem(path);
    };

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case '/metadata-overview':
                return <Home />;
            case '/categories':
                return <Categories />;
            case '/data-elements':
                return <Home />;
            case '/overview':
                return <Overview />;
            case '/data-elements/groups':
                return <Overview />;
            case '/data-element-group-set':
                return <GroupSet />;
            case '/data-sets':
                return <DataSets />;
            case '/indicators':
                return <Indicator />;
            case '/organisation-units':
                return <OrganisationUnits />;
            case '/programs-and-tracker':
                return <ProgramsAndTracker />;
            case '/validations':
                return <Validations />;
            default:
                return <Home />;
        }
    };

    return (
        <div className='app-container'>
            <Sidebar onMenuItemClick={handleMenuItemClick} />
            <div className='main-content'>
                {renderComponent()}
            </div>
        </div>
    );
};

export default MyApp;
