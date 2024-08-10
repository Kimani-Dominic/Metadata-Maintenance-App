import React, { useState } from 'react';
import { useDataMutation } from '@dhis2/app-runtime';
import { Button, NoticeBox, AlertBar, IconDelete24 } from '@dhis2/ui';

const deleteMutation = {
    resource: 'dataElements',
    type: 'delete',
    id: ({ id }) => id,
};

const DeleteElement = ({ id, refetch }) => {
    const [mutate, { loading }] = useDataMutation(deleteMutation);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);

    const onClick = async () => {
        console.log('Delete button clicked for id:', id);  
        try {
            await mutate({ id });
            console.log('Deletion successful');  
            setShowSuccess(true);
            setError(null);
            refetch();
        } catch (err) {
            console.error('Error during deletion:', err); 
            setError(err.message);
            setShowSuccess(false);
        }
    };

    return (
        <div>
            {showSuccess && (
                <AlertBar duration={3000} success>
                    Data element deleted successfully!
                </AlertBar>
            )}
            {error && (
                <AlertBar duration={3000} critical>
                    {error}
                </AlertBar>
            )}
            <div className='icon'>
                {/* <IconDelete24 destructive disabled={loading} onClick={onClick} /> */}
            </div>
        </div>
    );
};

export default DeleteElement;
