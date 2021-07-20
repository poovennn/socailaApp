import "./register.css";
import { useRef } from "react";
import axios from "../../axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useState } from "react";



function Login() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const password1 = useRef();
  const history = useHistory();
  const [loading , setLoading] = useState(false)


  const handleclick = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (password1.current.value !== password.current.value) {
      password1.current.setCustomValidity("passwords dont match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_left">
          <h3 className="login_logo">Codebook</h3>
          <span className="login_desc">
            Connect with friends and the world around you on Codebook.
          </span>
        </div>
        <div className="login_right">
          <form className="login_box" onSubmit={handleclick}>
            <input
              placeholder="username"
              className="login_email"
              required
              ref={username}
            />
            <input
              placeholder="email"
              type="email"
              className="login_email"
              required
              ref={email}
            />
            <input
              placeholder="password"
              type="password"
              className="login_pass"
              required
              ref={password}
              minLength="5"
            />
            <input
              placeholder="Re-enter password"
              className="login_pass"
              type="password"
              required
              ref={password1}
              minLength="5"
            />
            <button className="login_button" type="submit">
              {loading? <CircularProgress color="secondary" size="20px" /> : "Register"}
              
            </button>
            <Link to="/login">
              <button className="login_register">
               Log In
                
                </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
