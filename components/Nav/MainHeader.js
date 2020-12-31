import React from "react";
import { Header } from "react-native-elements";
import { Image, ScrollView, Text } from "react-native";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

function MainHeader() {
  <Header
    leftComponent={{ icon: "menu", color: "#fff" }}
    centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
    rightComponent={{ icon: "home", color: "#fff" }}
  />;
}

export default MainHeader;
