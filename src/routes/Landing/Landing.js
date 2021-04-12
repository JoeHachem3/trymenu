import React, { Component } from 'react';
import axios from 'axios';
import classes from './Landing.module.css';
import IconFull from '../../components/UI/IconFull/IconFull';
import BackgroundSmall from '../../components/UI/backgrounds/BackgroundSmall/BackgroundSmall';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import { apiEndPoint, checkInputValidity } from '../../utils/common';
import { Redirect } from 'react-router';

class Landing extends Component {
  state = {
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
    isLogin: true,
    loading: false,
    finished: false,
    token: null,
  };

  inputChangedHandler = (event, inputIdentifier, form) => {
    const updatedOrderForm = { ...this.state[form].form };
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
    this.setState({
      [form]: { form: updatedOrderForm, formIsValid: formIsValid },
    });
  };

  toggleLogin = () => {
    const before = this.state.isLogin;
    this.setState({
      isLogin: !before,
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const type = this.state.isLogin ? 'login' : 'register';
    this.setState({
      loading: true,
    });
    const form = {};
    for (let formElementID in this.state[type].form) {
      form[formElementID] = this.state[type].form[formElementID].value;
    }

    axios
      .post(`${apiEndPoint}/users/${type}`, form)
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          finished: true,
          error: false,
          token: res.data.token,
          //can add messages directly from the backend
          finishText:
            'Thank you for applying, we will be in contact as soon as possible. You are very important to us, all information received will always remain confidential.',
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          finished: true,
          error: true,
          finishText: 'Something went wrong please try again later',
        });
      });
  };

  render() {
    const loginElementsArray = [];
    let form = null;
    if (this.state.token) return <Redirect to='/main' />;
    if (this.state.isLogin) {
      for (let key in this.state.login.form) {
        loginElementsArray.push({
          id: key,
          config: this.state.login.form[key],
        });
      }
      form = (
        <form onSubmit={this.submitHandler}>
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
                  this.inputChangedHandler(event, formElement.id, 'login')
                }
              />
            );
          })}
          <Button disabled={!this.state.login.formIsValid}>{'Sign in'}</Button>
          <div className={classes.LoginToggler}>
            {this.state.isLogin ? 'No account? ' : 'Have an account? '}
            <span onClick={this.toggleLogin}>
              {this.state.isLogin ? 'Signup' : 'Login'}
            </span>
          </div>
        </form>
      );
    } else {
      for (let key in this.state.register.form) {
        loginElementsArray.push({
          id: key,
          config: this.state.register.form[key],
        });
      }
      form = (
        <form onSubmit={this.submitHandler}>
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
                  this.inputChangedHandler(event, formElement.id, 'register')
                }
              />
            );
          })}
          <Button disabled={!this.state.register.formIsValid}>
            {'Register'}
          </Button>
          <div className={classes.LoginToggler}>
            {this.state.isLogin ? 'No account? ' : 'Have an account? '}
            <span onClick={this.toggleLogin}>
              {this.state.isLogin ? 'Signup' : 'Login'}
            </span>
          </div>
        </form>
      );
    }
    if (this.state.loading) {
      form = <Spinner className={classes.Spinner} />;
    }
    return (
      <div className={classes.Landing}>
        <BackgroundSmall className={classes.BackgroundSmall}>
          <IconFull className={classes.Logo} />
          {form}
        </BackgroundSmall>
      </div>
    );
  }
}

export default Landing;
