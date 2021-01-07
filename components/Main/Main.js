import React, { useState, useContext } from "react";
import { ScrollView, View, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {baseStyles} from "../../styleSheet"
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

function Main({ userToken, isLoading }) {
  console.log("value of isLoading in Main component: " + isLoading);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>LOADING ... ...</Text>
      </View>
    );
  }
  const isAuthed = (
    <>
      <Tab.Screen name="Home Page" component={Home} />

      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Login">{(props) => <Login {...props} />}</Tab.Screen>
    </>
  );

  const isNotAuthed = (
    <>
      <Tab.Screen name="Login">{(props) => <Login {...props} />}</Tab.Screen>
      <Tab.Screen name="Register" component={Register} />
    </>
  );
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        {userToken !== null ? isAuthed : isNotAuthed}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;
