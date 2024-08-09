import React from 'react';
import { useDataMutation, useDataQuery } from '@dhis2/app-runtime';
import {
    InputFieldFF,
    SingleSelectFieldFF,
    CheckboxFieldFF,
    Button,
    composeValidators,
    hasValue,
    number,
    CenteredContent,
    CircularLoader,
    IconArrowLeft24,
    // TextAreaField,
    Chip,
    AlertBar,
    IconColor24,
    InputField,
    RadioFieldFF
} from '@dhis2/ui';
import { Form as ReactFinalForm, Field } from 'react-final-form';
import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';



const createMutation = {
	resource: 'dataElements',
	type: 'create',
	data: ({ values }) => values,
}

const updateMutation = {
    resource: 'dataElements',
    type: 'update',
    id: ({ id }) => id,
    data: ({ values }) => values,
}

const query = {
    categoryCombos: {
        resource: 'categoryCombos',
        params: {
            fields: ['id', 'displayName'],
        },
    },
    optionSets: {
        resource: 'optionSets',
        params: {
            fields: ['id', 'displayName'],
        },
    },
};

const Form = ({ dataElementId, onSuccess, initialValues }) => {
    const { loading, error, data } = useDataQuery(query)
    // const [create] = useDataMutation(createMutation)
    // const [update] = useDataMutation(updateMutation)
    const navigate = useNavigate()
    // const alert = onClick()
    const mutation = dataElementId ? updateMutation : createMutation
    const [mutate] = useDataMutation(mutation)

    const handleSubmit = async (values) => {
        try {
            const { id, ...rest } = values;
		    await mutate({ id: dataElementId, values: rest });
	    // } else {
		//     await mutate({ values });
	    // }
            alert('Data element saved successfully!')
            onSuccess();
        } catch (err) {
            console.error('Error updating data element:', err)
    }
    };
    if (loading) {
        return (
		<CenteredContent>
		<CircularLoader  aria-label="Large Loader" large />
		</CenteredContent>
	)
    }

    if (error) {
        return (
            <AlertBar permanent warning > 
                Warning{error}
            </AlertBar>
        )
    }
   

    const NavigateBack = () => {
        navigate('/')
    }

     const alert = () => {
         return (
             <AlertBar permanent warning
             onClick={NavigateBack}
             />
         )
     }

    return (
        <ReactFinalForm 
        // onSuccess={create}
	    onSubmit = {handleSubmit}

	    initialValues={initialValues}>
            {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Chip icon={<IconArrowLeft24 />} onClick={NavigateBack}>
                    Back to homepage
                    </Chip>

                    {/* <TextAreaField 
                    name="textareaName" 
                    onClick={'Name *'}
                    placeholder="Hold the place" /> */}
                    <h2>Basic information</h2>

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
                        name="formName"
                        label="Form Name"
                        component={InputFieldFF}
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
                        name="url"
                        label="url"
                        component={InputFieldFF}
                    />
                    <Field
                        name="color and icon"
                        label="color and icon"
                        component={IconColor24}
                    />
                   <Field
                        name="Field Mask"
                        label="field mask"
                        component={InputField}
                    />
                    {/* <Field
                   <CheckboxFieldFF>Store zero data values</CheckboxFieldFF>
                    /> */}

                    <Field
                        name="domainType"
                        label="Domain Type"
                        component={RadioFieldFF}
                        options={[
                            { label: 'Aggregate', value: 'AGGREGATE' },
                            { label: 'Tracker', value: 'TRACKER' },
                        ]}
                    />
                    
                    <Field
                        name="valueType"
                        label="Value Type"
                        component={SingleSelectFieldFF}
                        options={[
                            { label: 'Text', value: 'TEXT' },
                            { label: 'Long text', value: 'LONG_TEXT' },
                            { label: 'Letter', value: ' LETTER' },
                            { label: 'Phone number', value: 'PHONE_NUMBER' },
                            { label: 'Email', value: 'EMAIL' },
                            { label: 'Yes/No', value: 'YES/NO' },
                            { label: 'Yes Only', value: 'YES_ONLY' },
                            { label: 'Date', value: 'DATE' },
                            { label: 'Date & Time', value: 'DATE_TIME' },
                            { label: 'Time', value: 'TIME' },
                            { label: 'Number', value: 'NUMBER' },
                            { label: 'Unit interval', value: 'UNIT_INTERVAL' },
                            { label: 'Percentage', value: 'PERCENTAGE' },
                            { label: 'Integer', value: 'INTEGER' },
                            { label: 'Positive Integer', value: 'POSITIVE_INTEGER' },
                            { label: 'Negative Integer', value: 'NEGATIVE_INTEGER' },
                            { label: 'Positive or Zero Integer', value: 'POSITIVE_OR_ZERO_INTEGER' },
                            { label: 'Tracker Associate', value: 'TRACKER_ASSOCIATE' },
                            { label: 'Username', value: 'USERNAME' },
                            { label: 'Coordinate', value: 'COORDINATE' },
                            { label: 'Organisation Unit', value: 'ORGANISATION_UNIT' },
                            { label: 'Reference', value: 'REFERENCE' },
                            { label: 'Age', value: 'AGE' },
                            { label: 'URL', value: 'URL' },
                            { label: 'File', value: 'FILE' },
                            { label: 'Image', value: 'IMAGE' },
                            { label: 'GeoJSON', value: 'GEOJSON' },                           
                        ]}
                    />
                    <Field
                        name="aggregationType"
                        label="Aggregation Type"
                        component={SingleSelectFieldFF}
                        options={[
                            { label: 'Sum', value: 'SUM' },
                            { label: 'Average', value: 'AVERAGE' },
                            { label: 'Count', value: 'COUNT' },
                            { label: 'Average', value: 'AVERAGE' },
                            { label: 'Average (sum in org unit)', value: 'AVERAGE_SUM_ORG_UNIT' },
                            { label: 'Last value (sum in org unit hierarchy)', value: 'LAST_SUM_ORG_UNIT_HIERARCHY' },
                            { label: 'Last value (average in org unit)', value: 'LAST_AVERAGE_ORG_UNIT' },
                            { label: 'Last value (last in org unit hierarchy)', value: 'LAST_LAST_ORG_UNIT_HIERARCHY' },
                            { label: 'Last value in period (sum in org unit hierarchy)', value: 'LAST_IN_PERIOD_SUM_ORG_UNIT_HIERARCHY' },
                            { label: 'Last value in period (average in org unit)', value: 'LAST_IN_PERIOD_AVERAGE_ORG_UNIT' },
                            { label: 'First value (sum in org unit hierarchy)', value: 'FIRST_SUM_ORG_UNIT_HIERARCHY' },
                            { label: 'First value (average in org unit hierarchy)', value: 'FIRST_AVERAGE_ORG_UNIT_HIERARCHY' },
                            { label: 'First value (first in org unit hierarchy)', value: 'FIRST_FIRST_ORG_UNIT_HIERARCHY' },
                            { label: 'Count', value: 'COUNT' },
                            { label: 'Standard deviation', value: 'STDDEV' },
                            { label: 'Variance', value: 'VARIANCE' },
                            { label: 'Min', value: 'MIN' },
                            { label: 'Max', value: 'MAX' },
                            { label: 'Min (sum in org unit)', value: 'MIN_SUM_ORG_UNIT' },
                            { label: 'Max (sum in org unit)', value: 'MAX_SUM_ORG_UNIT' },
                            { label: 'None', value: 'NONE' },
                            { label: 'Custom', value: 'CUSTOM' }
                        ]}
                    />

                    <h2>Disaggregation and Option sets</h2>
                    <Field
                        name="categoryCombos"
                        label="Category Combination"
                        component={SingleSelectFieldFF}
                        options={data.categoryCombos.categoryCombos.map((cc) => ({
                            label: cc.displayName,
                            value: cc.id,
                        }))}
                    />

                    <Field
                        name="optionSets"
                        label="Option Sets"
                        component={SingleSelectFieldFF}
                        options={data.optionSets.optionSets.map((cc) => ({
                            label: cc.displayName,
                            value: cc.id,
                        }))} />

                    
                    {/* <Field
                        name="decimals"
                        label="Number of Decimals"
                        component={InputFieldFF}
                        type="number"
                        validate={composeValidators(hasValue, number)}
                    /> */}
                    <Field
                        name="zeroIsSignificant"
                        label="Zero Is Significant"
                        component={CheckboxFieldFF}
                    />

                    <div className={styles.buttonRow}>
                        <Button type="submit" primary  disabled={submitting}>
		    {submitting ? <CircularLoader small /> : 'Submit'}
                        </Button>
    
                        <Button
                        ariaLabel='Button'
                        name='Basic button'
                        onlogger={<AlertBar permanent warning critical />}
                        title='Button'
                        value='default'>
                            Cancel!{(alert)}
                        </Button>
                    </div>
                </form>
            )}
        </ReactFinalForm>

);
}

export default Form;
