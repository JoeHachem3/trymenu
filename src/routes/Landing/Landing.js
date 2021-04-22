import React, { useState } from 'react';
import { useStore } from '../../store/store';
import axios from 'axios';
import classes from './Landing.module.css';
import IconFull from '../../components/UI/IconFull/IconFull';
import BackgroundSmall from '../../components/UI/backgrounds/BackgroundSmall/BackgroundSmall';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import { apiEndPoint, checkInputValidity } from '../../utils/common';
import { Redirect } from 'react-router';
import { actions } from '../../store/configureStore';

const Landing = () => {
  const [{ isLoading, error, token }, dispatch] = useStore();

  const [state, setState] = useState({
    login: {
      form: {
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
        password: {
          label: 'Password',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 8,
          },
          valid: false,
          touched: false,
          hide: false,
        },
      },
      formIsValid: false,
    },
    register: {
      form: {
        username: {
          label: 'Username',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Username',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          hide: false,
        },
        first_name: {
          label: 'First Name',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'First name',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
          hide: false,
        },
        last_name: {
          label: 'Last Name',
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Last name',
          },
          value: '',
          validation: {
            required: true,
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
        password: {
          label: 'Password',
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 8,
          },
          valid: false,
          touched: false,
          hide: false,
        },
      },
      formIsValid: false,
    },
  });
  const [isLogin, setIsLogin] = useState(true);

  let errorMessage = null;

  const inputChangedHandler = (event, inputIdentifier, form) => {
    const updatedOrderForm = { ...state[form].form };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );

    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }
    setState({
      ...state,
      [form]: { form: updatedOrderForm, formIsValid: formIsValid },
    });
  };

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const type = isLogin ? 'login' : 'register';
    dispatch(actions.IS_LOADING);
    const form = {};
    for (let formElementID in state[type].form) {
      form[formElementID] = state[type].form[formElementID].value;
    }

    axios
      .post(`${apiEndPoint}/users/${type}`, form)
      .then((res) => {
        // console.log(res);
        localStorage.setItem('tokenId', res.data.token);
        localStorage.setItem('expiresIn', res.data.expiresIn);
        localStorage.setItem('userId', res.data.user._id);
        dispatch(actions.JOINED_SUCCESSFULLY, res.data.user);

        axios
          .post(
            `${apiEndPoint}/users/cf-items`,
            { restaurantId: null },
            {
              headers: {
                Authorization: 'bearer ' + localStorage.getItem('tokenId'),
              },
            },
          )
          .then((res) => {
            // console.log(res);
            dispatch(
              actions.SET_RECOMMENDED_ITEMS,
              res.data.recommendedItems[0],
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.NOT_JOINED_SUCCESSFULLY, err);
      });
  };

  const loginElementsArray = [];
  let form = null;
  let loading = null;
  if (token) {
    return <Redirect to='/main' />;
  }
  if (isLogin) {
    for (let key in state.login.form) {
      loginElementsArray.push({
        id: key,
        config: state.login.form[key],
      });
    }
    form = (
      <form onSubmit={submitHandler}>
        {loginElementsArray.map((formElement) => {
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
              changed={(event) =>
                inputChangedHandler(event, formElement.id, 'login')
              }
            />
          );
        })}
        <Button disabled={!state.login.formIsValid}>{'Sign in'}</Button>
        <div className={classes.LoginToggler}>
          {'No account? '}
          <span onClick={toggleLogin}>{'Signup'}</span>
        </div>
      </form>
    );
  } else {
    for (let key in state.register.form) {
      loginElementsArray.push({
        id: key,
        config: state.register.form[key],
      });
    }
    form = (
      <form onSubmit={submitHandler}>
        {loginElementsArray.map((formElement) => {
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
              changed={(event) =>
                inputChangedHandler(event, formElement.id, 'register')
              }
            />
          );
        })}
        <Button disabled={!state.register.formIsValid}>{'Register'}</Button>
        <div className={classes.LoginToggler}>
          {'Have an account? '}
          <span onClick={toggleLogin}>{'Login'}</span>
        </div>
      </form>
    );
  }
  if (isLoading) {
    loading = <Spinner className={classes.Spinner} />;
    // loading = <IconFull loading />;
  }
  if (error) {
    errorMessage = <p className={classes.errorMsg}>{'error'}</p>;
  }

  return (
    <>
      <div className={classes.Landing}>
        <BackgroundSmall className={classes.BackgroundSmall}>
          <IconFull className={classes.Logo} />
          {form}
          {loading}
          {errorMessage}
        </BackgroundSmall>
      </div>
    </>
  );
};

export default Landing;
