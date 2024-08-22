import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDataQuery } from '@dhis2/app-runtime';
import { CircularLoader, CenteredContent, NoticeBox, AlertBar } from '@dhis2/ui';
import GroupForm from './GroupForm';

const query = {
    dataElementGroup: {
        resource: 'dataElementGroups',
        id: ({ id }) => id,
        params: {
            fields: ['id', 'code', 'description', 'dataElements[id, displayName]'],
        },
    },
}

const EditElementGroup = ({ onSuccess }) => {
    const { id } = useParams();
    const { loading, error, data } = useDataQuery(query, { variables: { id } });
    const [alertMessage, setAlertMessage] = useState(null);

    const handleSuccessMessage = () => {
        setAlertMessage({ type: 'success', message: 'Data element group updated successfully!' });
    };

    const handleErrorMessage = () => {
        setAlertMessage({ type: 'error', message: 'An error occurred while updating the data element group.' });
    };

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        );
    }

    if (error) {
        return <NoticeBox title="Error loading data element group" error>{error.message}</NoticeBox>
    }

    return (
        <div>
            <h1>Edit Data Element Group</h1>
            {alertMessage && (
                <AlertBar
                    duration={3000}
                    critical={alertMessage.type === 'error'}
                    success={alertMessage.type === 'success'}
                >
                    {alertMessage.message}
                </AlertBar>
            )}
            <GroupForm
                dataElementGroupId={id}
                initialValues={data.dataElementGroup}
                onSuccess={onSuccess}
                onSuccessMessage={handleSuccessMessage}
                onErrorMessage={handleErrorMessage}
            />
        </div>
    );
}

export default EditElementGroup;
