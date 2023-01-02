import { useState, useCallback } from "react";

function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function handleChange(evt) {
    const {value, name, validationMessage} = evt.target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: validationMessage});
    setIsFormValid(evt.target.closest('form').checkValidity());
  };

  const resetForm = (useCallback((
    resetedValues = {}, resetedErrors = {}, resetedIsFormValid = false) => {
      setValues(resetedValues);
      setErrors(resetedErrors);
      setIsFormValid(resetedIsFormValid);
    },
    [setValues, setErrors, setIsFormValid]
  ))

  return {values, errors, isFormValid, handleChange, resetForm, setValues, setIsFormValid};
};

export default useForm;
