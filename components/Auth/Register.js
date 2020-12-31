import React from "react";

import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Main = () => {return(
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>Register</Text>
  </View>
);}

function Register() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main}
                     options={{
                      title: 'Register'
                    }}/>
    </Stack.Navigator>
  );
}

export default Register;
