import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onHandleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const onHandleSubmit = (event) => {
    event.preventDefault();
    callback();
  };
  return {
    onHandleChange,
    onHandleSubmit,
    values
  };
};
