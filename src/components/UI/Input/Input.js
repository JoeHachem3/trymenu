import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  let labelClasses = [];
  if (props.elementConfig.type === 'checkbox') {
    labelClasses.push(classes.CheckboxLabel);
  }
  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          size={props.elementConfig.multiple ? 4 : null}
          multiple={props.elementConfig.multiple ? true : false}
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
          style={{ opacity: props.value === '' ? 0.39 : 1 }}
        >
          <option
            defaultValue
            disabled
            hidden
            value=''
            style={{ display: 'none' }}
          >
            {props.elementConfig.placeholder}
          </option>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }
  let label = (
    <span>
      {props.label23 + (props.shouldValidate.required === true ? ' *' : '')}
    </span>
  );

  let element = null;
  if (props.hide === false) {
    if (props.elementConfig.type !== 'checkbox') {
      element = (
        <React.Fragment>
          {props.topBorder === true ? <hr className={classes.HR} /> : null}
          <label>
            {props.hideLabel ? null : label}
            {inputElement}
          </label>
          {props.bottomBorder === true ? <hr className={classes.HR} /> : null}
        </React.Fragment>
      );
    } else {
      element = (
        <React.Fragment>
          <label htmlFor={props.label23}>
            <input
              id={props.label23}
              {...props.elementConfig}
              value={props.value}
              onChange={props.changed}
            />
            <b>
              {props.label23 +
                (props.shouldValidate.required === true ? ' *' : '')}
            </b>
          </label>
        </React.Fragment>
      );
    }
  }
  return <React.Fragment>{element}</React.Fragment>;
};

export default Input;
