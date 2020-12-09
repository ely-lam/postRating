import React, { useState } from "react";
import axios from 'axios'
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [errMsg, setErrMsg] = useState("");
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = (data) => {
      const url = "/sign-up";
      axios.post(url, data).then(res => {
          console.log("Register Success");
          setErrMsg("Register Success");
      }).catch( (error) => {
          const msg = "Unexpected Exception occurs";
          console.log(msg);
          setErrMsg(msg);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
              validate: (value) => value.length >= 8 || "Password should contains at least 8 characters"
          })}/>
            {errors.password && (
                <p id="passwordError" style={{ color: "red" }}>
                    {errors.password.message}
                </p>)}
        <input
            type={"password"}
            name={"confirm_password"}
            id={"confirm-password"}
            aria-label="confirm-password"
            placeholder="Confirm Password"
            ref={register({
                validate: (value) =>
                    value === watch("password") || "Passwords does not match!"
            })}
        />
          {errors.confirm_password && (
              <p style={{ color: "red" }}>{errors.confirm_password.message}</p>
          )}
          <button type={"submit"}>Sign up</button>
          <a href="/">Already has an account? Log in</a>
          <p style={{ color: "red" }}>
              {errMsg}
          </p>


      </form>
    </div>
  );
};

export default RegisterForm;
