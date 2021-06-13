import React, { useState } from 'react';
import * as requests from '../../utils/requests';
import { apiEndPoint } from '../../utils/common';
import { checkInputValidity } from '../../utils/common';
import Input from '../UI/Input/Input';
import Button from '../UI/Buttons/Button/Button';
import { useStore } from '../../store/store';
import { actions } from '../../store/configureStore';

const ItemForm = (props) => {
  const [{ restaurants }, dispatch] = useStore();

  const [formState, setFormState] = useState({
    name: {
      label: 'Name',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      defaultValue: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      hide: false,
    },
    price: {
      label: 'Price',
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Price',
      },
      value: '',
      defaultValue: '',
      file: null,
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      hide: false,
    },
    image: {
      label: 'Image',
      elementType: 'input',
      elementConfig: {
        type: 'file',
        placeholder: 'Image',
        accept: '.png, .jpg .jpeg',
      },
      value: '',
      defaultValue: '',
      file: null,
      validation: {
        required: true,
        type: 'image',
      },
      valid: false,
      touched: false,
      hide: false,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...formState };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    if (updatedFormElement.elementConfig.type === 'file')
      updatedFormElement.file = event.target.files[0];
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );

    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedForm) {
      formIsValid = updatedForm[inputId].valid && formIsValid;
    }
    setFormState(updatedForm);
    setIsFormValid(formIsValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const form = new FormData();
    for (let formElementID in formState) {
      if (formState[formElementID].elementConfig.type === 'file') {
        form.append(formElementID, formState[formElementID].file);
      } else form.append(formElementID, formState[formElementID].value);
    }
    form.append('restaurant', props.restaurantId);
    requests
      .addItem(form)
      .then((res) => {
        const restaurant = restaurants.find(
          (resto) => resto._id === props.restaurantId,
        );
        if (restaurant && restaurant.menu) {
          restaurant.menu.push(res.data.item);
          dispatch(actions.UPDATE_RESTAURANTS, restaurants);
        }
        const updatedForm = { ...formState };
        for (let formElementId in formState) {
          const updatedFormElement = { ...updatedForm[formElementId] };
          if (updatedFormElement.elementConfig.type === 'file')
            updatedFormElement.file = null;
          updatedFormElement.value = updatedFormElement.defaultValue;
          if (updatedFormElement.elementType === '')
            updatedFormElement.touched = false;
          updatedForm[formElementId] = updatedFormElement;
        }
        setFormState(updatedForm);
        setIsFormValid(false);
        props.closeModal();
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const elementsArray = [];
  let form = null;
  for (let key in formState) {
    elementsArray.push({
      id: key,
      config: formState[key],
    });
  }
  form = (
    <form onSubmit={submitHandler}>
      {elementsArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            label23={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={{
              ...formElement.config.elementConfig,
              placeholder: formElement.config.elementConfig.placeholder,
            }}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            hide={formElement.config.hide}
            hideLabel
            changed={(event) => inputChangedHandler(event, formElement.id)}
          />
        );
      })}
      <Button disabled={!isFormValid}>{'Create'}</Button>
    </form>
  );
  return <div>{form}</div>;
};

export default ItemForm;
