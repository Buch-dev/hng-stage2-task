function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validateRequired(value) {
  return value.trim() !== "";
}

function validateForm(formData) {
  const errors = {};

  if (!validateRequired(formData.fullName)) {
    errors.fullName = "Full name is required";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Email is not valid";
  }

  if (!validateRequired(formData.avatar)) {
    errors.avatar = "Avatar is required";
  }

  return errors;
}

export { validateEmail, validateRequired, validateForm };
