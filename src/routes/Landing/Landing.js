import React, { useState } from 'react';
import { useStore } from '../../store/store';
import * as requests from '../../utils/requests';
import classes from './Landing.module.css';
import IconFull from '../../components/UI/IconFull/IconFull';
import BackgroundSmall from '../../components/UI/backgrounds/BackgroundSmall/BackgroundSmall';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Buttons/Button/Button';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import { checkInputValidity } from '../../utils/common';
import { Redirect } from 'react-router';
import { actions } from '../../store/configureStore';

const Landing = () => {
  const [{ token }, dispatch] = useStore();

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
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const inputChangedHandler = (event, inputIdentifier, form) => {
    const updatedOrderForm = { ...state[form].form };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkInputValidity(
      updatedFormElement.value,
      updatedFormElement.validation
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
    setError(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const type = isLogin ? 'login' : 'register';
    setIsLoading(true);
    const form = {};
    for (let formElementID in state[type].form) {
      form[formElementID] = state[type].form[formElementID].value;
    }

    requests
      .authenticate(type, form)
      .then((res) => {
        // console.log(res);
        if (res.data.success) {
          localStorage.setItem('tokenId', res.data.token);
          localStorage.setItem('expiresIn', res.data.expiresIn);
          localStorage.setItem('userId', res.data.user._id);
          localStorage.setItem('userType', res.data.user.userType);
          dispatch(actions.JOINED_SUCCESSFULLY, res.data.user);
        } else {
          setIsLoading(false);
          setError({ message: res.data.message, modal: false });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError({ message: err.message, modal: true });
      });
  };

  const loginElementsArray = [];
  let form = null;
  let loading = null;

  if (token) {
    return (
      <Redirect
        to={
          localStorage.getItem('userType') === 'customer' ? '/main' : '/admin'
        }
      />
    );
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

  return (
    <>
      <div className={classes.Landing}>
        <BackgroundSmall className={classes.BackgroundSmall}>
          <IconFull className={classes.Logo} />
          {form}
          {loading}
          {error?.modal ? null : (
            <p className={'errorMessage'}>{error?.message}</p>
          )}
        </BackgroundSmall>
        <ErrorHandler error={error} setError={setError} />
      </div>
    </>
  );
};

export default Landing;
