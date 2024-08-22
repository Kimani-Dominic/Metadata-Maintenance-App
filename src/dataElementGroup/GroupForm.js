import React, { useState } from 'react';
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime';
import { Button, InputFieldFF, CircularLoader, AlertBar, Chip, IconArrowLeft24, hasValue, Transfer, HeaderBar } from '@dhis2/ui';
import { Form as ReactFinalForm, Field } from 'react-final-form';
import styles from '../components/Form.module.css';
import { useNavigate } from 'react-router-dom';

const createMutation = {
    resource: 'dataElementGroups',
    type: 'create',
    data: ({ values }) => values,
}

const updateMutation = {
    resource: 'dataElementGroups',
    type: 'update',
    id: ({ id }) => id,
    data: ({ values }) => values,
}

const query = {
    dataElements: {
        resource: 'dataElements',
        params: {
            fields: ['id', 'displayName'],
            paging: false,
        },
    },
};

const GroupForm = ({ dataElementGroupId, onSuccess, initialValues, onSuccessMessage, onErrorMessage }) => {
    const mutation = dataElementGroupId ? updateMutation : createMutation;
    const { error, data, loading } = useDataQuery(query); 
    const navigate = useNavigate();
    const [mutate, { loading: mutateLoading }] = useDataMutation(mutation);
    const [alertMessage, setAlertMessage] = useState(null);

    const handleSubmit = async (values) => {
        try {
            await mutate({ id: dataElementGroupId, values });
            setAlertMessage({ type: 'success', message: 'Data element group saved successfully!' });
            onSuccess();
            onSuccessMessage();
        } catch (err) {
            setAlertMessage({ type: 'error', message: `Error updating data element group: ${err.message}` });
            onErrorMessage();
        }
    };

    const NavigateBack = () => {
        navigate('/data-elements/groups');
    };

    const transferOptions = data?.dataElements?.dataElements.map(de => ({
        label: de.displayName,
        value: de.id,   
    })) || [];
    
    const [selected, setSelected] = useState([]);
    const onChange = ({ selected }) => {
        setSelected(selected);
    };

    return (
        <>
            {alertMessage && (
                <AlertBar
                    duration={3000}
                    critical={alertMessage.type === 'error'}
                    success={alertMessage.type === 'success'}
                >
                    {alertMessage.message}
                </AlertBar>
            )}
            <ReactFinalForm 
                onSubmit={handleSubmit}
                initialValues={initialValues}
            >
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
                        <p>Data Elements</p>
                        {loading ? (
                            <CircularLoader />
                        ) : (
                            <Transfer
                                options={transferOptions}
                                selected={selected}
                                onChange={onChange}
                            />
                        )}
                        
                        <div className={styles.buttonRow}>
                            <Button type="submit" primary disabled={submitting || mutateLoading}>
                                {submitting || mutateLoading ? <CircularLoader small /> : 'Submit'}
                            </Button>
                        </div>
                    </form>
                )}
            </ReactFinalForm>
        </>
    );
}

export default GroupForm;
