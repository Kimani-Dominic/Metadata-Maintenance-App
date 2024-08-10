import React from 'react'
import { useParams } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import { CircularLoader, CenteredContent, NoticeBox } from '@dhis2/ui'
import GroupForm from './GroupForm'

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
    const { loading, error, data } = useDataQuery(query, { variables: { id } })

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        return <NoticeBox title="Error loading data element group" error>{error.message}</NoticeBox>
    }

    return (
        <div>
            <h1>Edit Data Element Group</h1>
            <GroupForm dataElementGroupId={id} initialValues={data.dataElementGroup} onSuccess={onSuccess} />
        </div>
    )
}

export default EditElementGroup;
