import React from 'react';
import { Button } from '@dhis2/ui';
import { useNavigate } from 'react-router-dom';
import '../components/sidebar.css';

const NewElementGroup = ({ }) => {
    const navigate = useNavigate();

    const NavigateToGroupForm = () => {
        navigate('/add/newGroup')}

    return (
        <div className='new'>
            <Button primary small onClick={NavigateToGroupForm}>
                + New
            </Button>
        </div>
    )
}

export default NewElementGroup;
