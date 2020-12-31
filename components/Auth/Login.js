import React, {useContext, useState} from "react";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {AuthContext} from "../../contexts/auth"


const Stack = createStackNavigator();


const Main = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signOut } = useContext(AuthContext);
 
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>LoginPage</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title="Button with icon component" onPress={() => signIn({ username, password })}
      />
      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title="LOGOUT" onPress={() => signOut()}
      />
    </View>
  );
};

function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{
          title: "Login",
        }}
      >
        {props => <Main {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default Login;
