import React from 'react';
import { Button } from '@dhis2/ui';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const NewElement = ({ }) => {
    const navigate = useNavigate();

    const NavigateToForm = () => {
        navigate('/add/new')}

    return (
        <div className='new'>
            <Button primary small onClick={NavigateToForm}>
                + New
            </Button>
        </div>
    )
}

export default NewElement;
