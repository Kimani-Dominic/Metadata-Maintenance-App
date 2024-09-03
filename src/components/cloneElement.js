import React from 'react';
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime';
import { MenuItem, IconDuplicate24, AlertBar } from '@dhis2/ui';

const createDataElementMutation = {
    resource: 'dataElements',
    type: 'create',
    data: ({ values }) => values,
};

const fetchDataElementQuery = {
    dataElement: {
        resource: 'dataElements',
        id: ({ id }) => id,
        params: {
            fields: [
                'name', 'shortName', 'formName', 'description', 'code', 'url', 'domainType', 'valueType', 'aggregationType',
                'categoryCombos', 'optionSets', 'zeroIsSignificant',
            ],
        },
    },
};

const CloneElement = ({ dataElementId, onCloneComplete }) => {
    const { loading, error, data } = useDataQuery(fetchDataElementQuery, {
        variables: { id: dataElementId },
    });

    const [createDataElement, { loading: creating }] = useDataMutation(createDataElementMutation, {
        onComplete: onCloneComplete,
    });

    const handleClone = async () => {
        if (!loading && data) {
            const { dataElement } = data;

            const clonedData = {
                ...dataElement,
                name: `${dataElement.name} (Copy)`,
                shortName: `${dataElement.shortName} (Copy)`,
                id: undefined,
            };

            await createDataElement({ values: clonedData });
            console.log('Cloned successfully:', clonedData);
        } else if (error) {
            console.error('Failed to fetch the original data element:', error);
        }
    };
    if (error) {
        return (
            <AlertBar
                   permanent
                   warning
                   title="Dupliation Failed">
                    {error.message}

                </AlertBar>
        );
    }
    return (
        <MenuItem
            icon={<IconDuplicate24 />}
            label="Clone"
            onClick={handleClone}
            disabled={loading || creating}
        />
    );
};

export default CloneElement;
