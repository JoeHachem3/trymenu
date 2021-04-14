import React, { useState } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import { checkInputValidity } from '../../utils/common';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useStore } from '../../store/store';

const RestaurantForm = () => {
  const [state, dispatch] = useStore();

  const [formState, setFormState] = useState({
    name: {
      label: 'Name',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      hide: false,
    },
    logo: {
      label: 'Logo',
      elementType: 'input',
      elementConfig: {
        type: 'file',
        placeholder: 'Logo',
      },
      value: '',
      validation: {
        required: true,
        type: 'image',
      },
      valid: false,
      touched: false,
      hide: false,
    },
    phone: {
      label: 'Phone',
      elementType: 'input',
      elementConfig: {
        type: 'tel',
        placeholder: 'Phone',
      },
      value: '',
      validation: {
        required: true,
        isPhone: true,
      },
      valid: false,
      touched: false,
      hide: false,
    },
    email: {
      label: 'Email',
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
      hide: false,
    },
    category: {
      label: 'Category',
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'fast_food/drive_thru',
            displayValue: 'Fast Food/ Drive Thru',
          },
          { value: 'fast_casual', displayValue: 'Fast Casual' },
          { value: 'sports_bar', displayValue: 'Sports Bar' },
          { value: 'casual_dining', displayValue: 'Casual Dining' },
          { value: 'fine_dining', displayValue: 'Fine Dining' },
          { value: 'pop_up_restaurant', displayValue: 'Pop_up Restaurant' },
          { value: 'food_truck', displayValue: 'Food Truck' },
        ],
      },
      value: 'fast_food/drive_thru',
      validation: {},
      valid: true,
    },
  });

  // const location = {
  //   XCoordinate: {
  //     label: 'XCoordinate',
  //     elementType: 'input',
  //     elementConfig: {
  //       type: 'number',
  //       placeholder: 'XCoordinate',
  //     },
  //     value: '',
  //     validation: {
  //       required: true,
  //     },
  //     valid: false,
  //     touched: false,
  //     hide: false,
  //   },
  //   YCoordinate: {
  //     label: 'YCoordinate',
  //     elementType: 'input',
  //     elementConfig: {
  //       type: 'number',
  //       placeholder: 'YCoordinate',
  //     },
  //     value: '',
  //     validation: {
  //       required: true,
  //     },
  //     valid: false,
  //     touched: false,
  //     hide: false,
  //   },
  // };

  // const [locations, setLocations] = useState([location]);

  // const [menu, setMenu] = [{}];

  const [isFormValid, setIsFormValid] = useState(false);

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = { ...formState };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
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
    const form = {};
    for (let formElementID in formState) {
      form[formElementID] = formState[formElementID].value;
    }

    form.owner = localStorage.getItem('userId');
    console.log(form);

    axios
      .post(`${apiEndPoint}/restaurants`, form)
      .then((res) => {
        state.restaurants.push(form);
        dispatch('UPDATE_RESTAURANTS', state.restaurants);
        console.log(res);
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

export default RestaurantForm;
