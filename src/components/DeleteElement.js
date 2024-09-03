import React from 'react';
import { useDataMutation } from '@dhis2/app-runtime';
import { IconDelete24, Button, AlertBar } from '@dhis2/ui';

const deleteMutation = {
    resource: 'dataElements',
    id: ({ id }) => id,
    type: 'delete',
};

const DeleteElement = ({ dataElementId, onDelete }) => {
    const [deleteElement, { error, loading }] = useDataMutation(deleteMutation, {
        variables: { id: dataElementId },
        onComplete: onDelete,
    });

    if (error) {
        return (
            <AlertBar
                   permanent
                   warning
                   title="Deletion Failed">
                    {error.message}

                </AlertBar>
        );
    }
    const handleDelete = () => deleteElement({ id: dataElementId });

    return (
        // <Button
        //     icon={<IconDelete24 />}
        //     onClick={async () => {
        //         await deleteElement();
        //         console.log(`Deleted element with id: ${dataElementId}`);
        //     }}
        //     disabled={loading}
        // >
        //     Delete
        // </Button>
        <Button
          onClick={handleDelete}>
            Delete
        </Button>
    );
};

export default DeleteElement;
