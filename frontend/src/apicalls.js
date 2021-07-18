import axios from "axios";

export const logincall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("auth/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    let local = JSON.stringify(res.data);
    sessionStorage.setItem("user", local);
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
