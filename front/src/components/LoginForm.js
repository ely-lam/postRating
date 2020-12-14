import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../style/AuthForm.css";

const LoginForm = ({ userSetter, registerSetter }) => {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const url = "./login";
    axios
      .post(url, data)
      .then((res) => {
        console.log(`User ${res.data.username} Log in success!`);
        userSetter(res.data);
      })
      .catch((error) => {
        if (error.response.data) {
          setErrMsg(error.response.data);
        } else {
          const msg = "Unexpected Exception occurs";
          console.log(msg);
          setErrMsg(msg);
        }
      });
  };
  return (
    <div className={"AuthContainer"}>
      <h2>Sign In</h2>
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
              "Password should contains at least 8 characters",
          })}
        />
        {errors.password && (
          <p id="passwordError" style={{ color: "red" }}>
            {errors.password.message}
          </p>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type={"submit"}>Sign in</button>
        </div>

        <a href="#" onClick={() => registerSetter(true)}>
          Don't have an account? Sign Up
        </a>
        <p style={{ color: "red" }}>{errMsg}</p>
      </form>
    </div>
  );
};

export default LoginForm;
