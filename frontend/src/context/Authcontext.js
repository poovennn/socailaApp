import { createContext, useReducer } from "react";
import Authreducer from "./Authreducer";

const INITIAL_STATE = {
  // user: {
  //   _id: "60eda9dbc20ade34181ee67e",
  //   username: "poovendhan",
  //   email: "poovendhan@gmail.com",
  //   profilePicture:
  //     "https://firebasestorage.googleapis.com/v0/b/mydemo-71f56.appspot.com/o/pooven_images%2Fpooven.JPG?alt=media&token=452fb638-a7d5-43d9-b1d7-61a45f204a60",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: [],
  //   followings: [],
  // },
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Authcontext = createContext(INITIAL_STATE);

export const Authcontextprovider = ({ children }) => {
  const [state, dispatch] = useReducer(Authreducer, INITIAL_STATE);
  return (
    <Authcontext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};
