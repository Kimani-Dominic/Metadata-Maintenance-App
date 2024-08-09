import React from 'react'
import { useParams } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import Form from './Form'
import { CircularLoader, CenteredContent, NoticeBox } from '@dhis2/ui'

const query = {
    dataElement: {
        resource: 'dataElements',
        id: ({ id }) => id,
        params: {
            fields: ['id', 'name', 'shortName', 'code', 'description', 'domainType', 'valueType', 'aggregationType', 'categoryCombo', 'formName', 'decimals', 'zeroIsSignificant'],
        },
    },
}

const EditElement = ({ onSuccess }) => {
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
        return <NoticeBox title='Error loading data element' error>{error.message}</NoticeBox>
    }

    return (
        <div>
            <h1>Edit Data Element</h1>
            <Form dataElementId={id} initialValues={data.dataElement} onSuccess={onSuccess} />
        </div>
    )
}

export default EditElement;
