import * as React from 'react';
import { useField } from 'formik';


export const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label className="required">{label}</label>
            <input {...field} {...props} className="form-control" />
            {meta.touched && meta.error ? (
                <div className="form_error">{meta.error}</div>
            ) : null}
        </div>
    );
};