import React from 'react';
import { Button } from '@dhis2/ui';
import './sidebar.css';

const NewElement = ({ }) => {
    return (
        <div className='new'>
            <Button primary small>
                + New
            </Button>
        </div>
    )
}

export default NewElement;
