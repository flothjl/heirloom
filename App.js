import React, {useContext} from "react";
import { StyleSheet } from "react-native";
import Main from "./components/Main/Main.js";
import { AuthContextProvider } from "./contexts/auth";
import {WebConfigProvider} from "./contexts/webConfig"

export default function App() {
  

  return (
    <WebConfigProvider>
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
    </WebConfigProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
