import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../Context/auth";
import { LOGIN_USER_MUTATION } from "../utils/graphql";
function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const initialValues = {
    username: "",
    password: "",
  };
  const { onHandleChange, onHandleSubmit, values } = useForm(
    loginUserCallback,
    initialValues
  );
  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="app_form">
      <Form
        onSubmit={onHandleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1 className="page_title">lOGIN</h1>
        <Form.Input
          label="Username"
          type="text"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
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
        <Button type="submit" color="teal">
          login
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

export default Login;
