import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseStyles } from "../../styleSheet";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { AuthContext } from "../../contexts/auth";
import RecipeDetail from "../Recipe/RecipeDetail"
import Loader from "../atoms/Loader"

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

function Main() {

  const {state} = useContext(AuthContext);

  let userToken = state.userToken

  const isAuthed = (
    <>
      <Tab.Screen name="Home Page" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="DetailTest" component={RecipeDetail}/>
    </>
  );

  const isNotAuthed = (
    <>
      <Tab.Screen name="Login">{(props) => <Login {...props} />}</Tab.Screen>
      <Tab.Screen name="Register" component={Register} />
      <Tab.Screen name="DetailTest" component={RecipeDetail}/>
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
