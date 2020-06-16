import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../Context/auth";
import { REGISTER_USER_MUTATION } from "../utils/graphql";
function Register(props) {
  const [errors, setErrors] = useState({});
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { onHandleChange, onHandleSubmit, values } = useForm(
    Register,
    initialValues
  );
  const context = useContext(AuthContext);
  const [addUser, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_, result) {
      console.log(result);
      context.login(result.data.register);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function Register() {
    addUser();
  }

  return (
    <div className="app_form">
      <Form
        onSubmit={onHandleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1 className="page_title">REGISTER</h1>
        <Form.Input
          label="Username"
          type="text"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onHandleChange}
        />
        <Form.Input
          label="Email"
          type="email"
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onHandleChange}
        />
        <Form.Input
          label="Password"
          type="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onHandleChange}
        />
        <Form.Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={onHandleChange}
          value={values.confirmPassword}
        />
        <Button type="submit" color="teal">
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((err) => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Register;
