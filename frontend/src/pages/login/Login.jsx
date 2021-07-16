import { useRef } from "react";
import "./login.css";
import { logincall } from "../../apicalls";
import { useContext } from "react";
import { Authcontext } from "../../context/Authcontext";
import { CircularProgress } from "@material-ui/core";

function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(Authcontext);

  const handlesubmit = (e) => {
    e.preventDefault();
    logincall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  console.log(user);
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
          <form className="login_box" onSubmit={handlesubmit}>
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
              minLength="5"
              className="login_pass"
              required
              ref={password}
            />
            <button
              className="login_button"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="login_forgot">Forgot Password</span>
            <button className="login_register">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
