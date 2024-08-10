import React from 'react';
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime';
import {
    InputFieldFF,
    SingleSelectFieldFF,
    Button,
    hasValue,
    CenteredContent,
    CircularLoader,
    Chip,
    AlertBar,
    IconArrowLeft24,
} from '@dhis2/ui';
import { Form as ReactFinalForm, Field } from 'react-final-form';
import styles from '../components/Form.module.css';
import { useNavigate } from 'react-router-dom';

const createMutation = {
    resource: 'dataElementGroups',
    type: 'create',
    data: ({ values }) => values,
};

const updateMutation = {
    resource: 'dataElementGroups',
    type: 'update',
    id: ({ id }) => id,
    data: ({ values }) => values,
};

const query = {
    dataElements: {
        resource: 'dataElements',
        params: {
            fields: ['id', 'displayName'],
            paging: false,
        },
    },
};

const GroupForm = ({ dataElementGroupId, onSuccess, initialValues }) => {
    const { loading, error, data } = useDataQuery(query);
    const navigate = useNavigate();
    const mutation = dataElementGroupId ? updateMutation : createMutation;
    const [mutate] = useDataMutation(mutation);

    const handleSubmit = async (values) => {
        try {
            const { id, ...rest } = values;
            await mutate({ id: dataElementGroupId, values: rest });
            alert('Data element group saved successfully!');
            onSuccess();
        } catch (err) {
            console.error('Error updating data element group:', err);
        }
    };

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader aria-label="Large Loader" large />
            </CenteredContent>
        );
    }

    if (error) {
        return (
            <AlertBar permanent warning className={styles.alertBar}>
                Warning: {error.message}
            </AlertBar>
        );
    }

    const NavigateBack = () => {
        navigate('/data-elements/groups');
    };

    return (
        <ReactFinalForm 
            onSubmit={handleSubmit}
            initialValues={initialValues}>
            {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Chip icon={<IconArrowLeft24 />} onClick={NavigateBack}>
                        Back to homepage
                    </Chip>
                    <h2>Data Element Group Information</h2>

                    <Field
                        name="name"
                        label="Name"
                        component={InputFieldFF}
                        validate={hasValue}
                    />

                    <Field
                        name="shortName"
                        label="Short Name"
                        component={InputFieldFF}
                        validate={hasValue}
                    />

                    <Field
                        name="code"
                        label="Code"
                        component={InputFieldFF}
                    />

                    <Field
                        name="description"
                        label="Description"
                        component={InputFieldFF}
                    />

                    <Field
                        name="dataElements"
                        label="Data Elements"
                        component={SingleSelectFieldFF}
                        options={data.dataElements.dataElements.map((de) => ({
                            label: de.displayName,
                            value: de.id,
                        }))}
                        multiple
                    />

                    <div className={styles.buttonRow}>
                        <Button type="submit" primary disabled={submitting}>
                            {submitting ? <CircularLoader small /> : 'Submit'}
                        </Button>

                        <Button onClick={NavigateBack}>
                            Cancel
                        </Button>
                    </div>
                </form>
            )}
        </ReactFinalForm>
    );
};

export default GroupForm;
