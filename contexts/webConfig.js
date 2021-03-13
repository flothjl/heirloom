import React, { createContext, useRef } from "react";
import {Animated} from "react-native"

const webConfig = {
  getText: function (label) {
    return label in this._t ? this._t[label] : label;
  },
  _t: {
    "loginPage.username.placeholder": "Username",
    "loginPage.loginButton.placeholder": "Sign In",
    "loginPage.header.title": "Welcome to Heirloom!",
    "createRecipe.name.placeholder": "Give me a name",
    "createRecipe.instructions.placeholder": "Tell me how it\'s done",
    "createRecipe.name.label": "Name",
    "createRecipe.submitButton.label": "SAVE"
  },
  _animation: {
    "fadeInDuration": 1000,
    "fadeOutDuration": 1000,
    fadeOut: () => {
      // Will change fadeAnim value to 0 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 5000
      }).start();
    },
    fadeIn: ()=>{
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000
      }).start();
    }
  }
};

export const WebConfig = createContext();

export const WebConfigProvider = function ({ children }) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  return <WebConfig.Provider value={{...webConfig, fadeAnim: fadeAnim}}>{children}</WebConfig.Provider>;
};
