import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { createContext, useMemo, useReducer, useEffect } from "react";
import { login, logout } from "../services/heirloomApi";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            userToken: null,
          };
        case "SERVER_REQUEST":
          console.log('SERVER_REQUEST')

          return {
            ...prevState,
            isLoading: true,
          };
        case "ON_SUCCESS":
          console.log('ON_SUCCESS')
          return {
            ...prevState,
            isLoading: false,
          };
      }
    },
    {
      isLoading: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        console.log("UserToken: " + userToken);
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
      } catch (e) {
        console.log("failed to restore token");
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    state,
    signIn: async (data) => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `AsyncStorage`
      // In the example, we'll use a dummy token
      const token = await login(data.username, data.password);
      dispatch({ type: "SIGN_IN", token: token });
    },
    serverRequest: () => {
      dispatch({ type: "SERVER_REQUEST" });
    },
    onSuccess: () => {
      dispatch({ type: "ON_SUCCESS" });
    },
    signOut: async () => {
      const response = await logout();
      dispatch({ type: "SIGN_OUT" });
    },
    signUp: async (data) => {
      // In a production app, we need to send user data to server and get a token
      // We will also need to handle errors if sign up failed
      // After getting token, we need to persist the token using `AsyncStorage`
      // In the example, we'll use a dummy token

      dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
    },
  };
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
