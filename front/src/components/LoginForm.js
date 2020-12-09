import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = ({ userSetter, registerSetter }) => {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setErrMsg("Success");
  };
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"AuthForm"}>
        <input
          type={"text"}
          name={"username"}
          id={"username"}
          aria-label={"Username"}
          placeholder={"Username (6 or more characters)"}
          ref={register({
            required: "Username required",
            validate: (value) =>
              value.length >= 6 ||
              "Username should contains at least 6 characters",
          })}
        />
        {errors.username && (
          <p id="usernameError" style={{ color: "red" }}>
            {errors.username.message}
          </p>
        )}
        <input
          type={"password"}
          name={"password"}
          id={"password"}
          aria-label={"Password"}
          placeholder={"Password (8 or more characters)"}
          ref={register({
            required: "Password required",
            validate: (value) =>
              value.length >= 8 ||
              "Password should contains at least 8 characters"
          })}
        />
        {errors.password && (
          <p id="passwordError" style={{ color: "red" }}>
            {errors.password.message}
          </p>
        )}

        <button type={"submit"}>Sign in</button>
        <a href="#" onClick={() => registerSetter(true)}>
          Don't have an account? Sign Up
        </a>
        <p style={{ color: "red" }}>{errMsg}</p>
      </form>
    </div>
  );
};

export default LoginForm;
