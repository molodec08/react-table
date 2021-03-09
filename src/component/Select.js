import React, {useEffect, useRef} from 'react';

export const Select = (props) => {
  const selectRef = useRef();

  useEffect(() => {
    window.M.FormSelect.init(selectRef.current);
  }, []);

  return (
    <div className="input-field">
      <select
        className="icons"
        ref={selectRef}
        name={props.name}
        value={props.value}
        defaultValue={'DEFAULT'}
        onChange={props.changeHandler}
      >
        <option value="DEFAULT" disabled>{props.placeholder}</option>
        { props.options.map((option) => {
          return (
            <option
              key={option.id}>{option.value}
            </option>
          )
        }) }
      </select>
      <label htmlFor={props.name}> {props.title} </label>
    </div>
  )
};