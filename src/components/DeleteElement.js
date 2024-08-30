import { useDataMutation } from '@dhis2/app-runtime'
// import { Button, IconDelete16, MenuItem } from '@dhis2/ui'

const mutation = {
    resource: 'dataElements',
    id: ({ id }) => id,
    type: 'delete'
}

const DeleteElement = ({ dataElementId, onDelete, triggerDelete }) => {
    const [Delete] = useDataMutation(mutation, {
        onComplete: onDelete,
        variables: {
            id: dataElementId,
        },
    })

    return triggerDelete ? triggerDelete(Delete) : null;
}

export default DeleteElement;
