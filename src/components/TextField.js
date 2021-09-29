import React from 'react';
import { ErrorMessage, useField } from 'formik';

export default function TextField({label, ...props}) {
    const [field] = useField(props);
    return (
        <div>
            <label htmlFor = {field.name}>{label}</label>  
            <input
                className="form-control"
                {...field} {...props}
                autoComplete="off"
            />
           <ErrorMessage name={field.name} />     
        </div>
    )
}
