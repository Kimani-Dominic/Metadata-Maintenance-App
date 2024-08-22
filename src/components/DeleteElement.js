import { useDataMutation } from '@dhis2/app-runtime'
import { Button, IconDelete16 } from '@dhis2/ui'

const mutation = {
    resource: 'dataElements',
    type: 'delete',
    id: ({ id }) => id
}

const DeleteElement = ({ id, refetch }) => {
    const [mutate, { loading }] = useDataMutation(mutation)
    const onClick = () => {
        mutate({ id }).then(refetch)
    }
    return <Button icon={<IconDelete16 />} destructive disabled={loading} onClick={onClick}>Delete</Button>
}

export default  DeleteElement;