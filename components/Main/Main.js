import React, { useState, useContext } from "react";
import { ScrollView, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Login from "../Auth/Login";
import Register from "../Auth/Register"

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

const Tab = createBottomTabNavigator();

function Main({userToken,isLoading}) {
  console.log('value of isLoading in Main component: ' + isLoading)
  if(isLoading){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>LOADING ... ...</Text>
    </View>
    )
  }
  const isAuthed = (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={userToken} component={Home} />

        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Login">
          {props => <Login {...props}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );

  const isNotAuthed = (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Login">
          {props => <Login {...props}/>}
        </Tab.Screen>
        <Tab.Screen name="Register" component={Register} />
      </Tab.Navigator>
    </NavigationContainer>
  );
    console.log(userToken === null)
  return (userToken !== null) ? isAuthed : isNotAuthed;
}

export default Main;
