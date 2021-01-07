import React, { createContext } from "react";

const webConfig = {
  getText: function (label) {
    return label in this._t ? this._t[label] : label;
  },
  _t: {
    "loginPage.username.label": "Username",
    "loginPage.loginButton.label": "Sign In",
  },
};

export const WebConfig = createContext();

export const WebConfigProvider = function ({ children }) {
  return <WebConfig.Provider value={webConfig}>{children}</WebConfig.Provider>;
};
