import React, { useState } from 'react';
import axios from 'axios';
import { apiEndPoint } from '../../utils/common';
import { checkInputValidity } from '../../utils/common';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { useStore } from '../../store/store';
import { actions } from '../../store/configureStore';

const RestaurantForm = React.memo((props) => {
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
    logo: {
      label: 'Logo',
      elementType: 'input',
      elementConfig: {
        type: 'file',
        placeholder: 'Logo',
        accept: '.png, .jpg',
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
    phone: {
      label: 'Phone',
      elementType: 'input',
      elementConfig: {
        type: 'tel',
        placeholder: 'Phone',
      },
      value: '',
      defaultValue: '',
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
      defaultValue: '',
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
        multipe: true,
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
      defaultValue: 'fast_food/drive_thru',
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
    form.append('owner', localStorage.getItem('userId'));
    axios
      .post(`${apiEndPoint}/restaurants`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'bearer ' + localStorage.getItem('tokenId'),
        },
      })
      .then((res) => {
        restaurants.push(res.data.restaurant);
        dispatch(actions.UPDATE_RESTAURANTS, restaurants);
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
        props.goTo('/restaurants/' + res.data.restaurant._id);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.count('restaurantForm');

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
});

export default RestaurantForm;
