import React, {useEffect} from 'react';

export const Input = ( props ) => {

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <div className="input-field">
            <input
                // placeholder={props.placeholder}
                id={props.id}
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.changeHandler}
            />
            <label htmlFor={props.name}> {props.title} </label>
        </div>
    )
};