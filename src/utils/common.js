export const domainOfURL = (url) => {
  var urlPattern =
    /^(?:https?:\/\/)?(?:w{3}\.)?([a-z\d-]+)\.(?:[a-z.]{2,10})(?:[/\w.-]*)*/;
  var domainPattern = url.match(urlPattern);
  var extractDomain = domainPattern[1];
  return extractDomain;
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const toReadableDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return;
  }
  var month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var day = date.getDate();
  var month_index = date.getMonth();
  var year = date.getFullYear();

  return month_names[month_index] + ' ' + day + ', ' + year;
};

export let env_check = process.env.NODE_ENV === 'production';

export const checkInputValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const apiEndPoint =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : 'https://try-menu.herokuapp.com';
