import validator from "validator";

const checkEmail = (email) => {
  if (!email) return false;
  return validator.isEmail(email);
};

const checkPassword = (password) => {
  if (!password) {
    return false;
  }
  if (password.length < 8) {
    return false;
  } else {
    return true;
  }
};

const checkName = (name) => {
  if (!name) {
    return false;
  }
  return validator.isAlpha(name, "en-US", { ignore: " " });
};

export const validatingUserData = (name, email, password) => {
  const isValidName = checkName(name);
  const isValidEmail = checkEmail(email);
  const isValidPassword = checkPassword(password);

  const possibleError = {
    "Name only contains letters and spaces": !isValidName,
    "Email is not valid": !isValidEmail,
    "Password min 8 characters": !isValidPassword,
  };
  let errors = [];
  Object.keys(possibleError).forEach((key) => {
    if (possibleError[key] === true) {
      errors.push({ msg: key });
    }
  });
  return errors;
};
