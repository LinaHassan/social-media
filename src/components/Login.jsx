import classes from "./Login.module.css";
import { useEffect, useState, useRef } from "react";
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const emailHandlar = (e) => setEmail(e.target.value);
  const passwordHandlar = (e) => setPassword(e.target.value);

  const submitHandlar = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      const user = data.find((item) => item.email == email);
      setEmail("");
      setPassword("");

   
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/Profile");
      }
      if (!user) {
        setErrMsg("Your Email is wrong please try again");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      }
    }
  };

  return (
    <div>
      <form className={classes.myform} onSubmit={submitHandlar}>
        <h1>Log in</h1>
        <input
          type="email"
          name="email"
          onChange={emailHandlar}
          required
          placeholder="Enter Your Email"
          value={email}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={passwordHandlar}
          value={password}
        ></input>
        <button className={classes.login_btn}>Login </button>
        <p className={classes.err_Msg} ref={errRef}>{errMsg}</p>
      </form>
    </div>
  );
};

export default Login;
