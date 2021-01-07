import React, { useContext, useState } from "react";
import { Input, Card } from "react-native-elements";
import {
  Text,
  ImageBackground,
  ScrollView,
  View,
  TouchableHighlight,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { baseStyles as styles } from "../../styleSheet";
import { AuthContext } from "../../contexts/auth";
import { WebConfig } from "../../contexts/webConfig";
import { getRecipes } from "../../services/heirloomApi";
import HeirloomLoader from "../atoms/Loader"

const Stack = createStackNavigator();

const Main = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const webConfig = useContext(WebConfig);
  const { signIn, signOut } = useContext(AuthContext);

  return (
    <ImageBackground
    imageStyle={{opacity: 0.2}}
    style={styles.logo}
    source={require("../../assets/icons/carrot-1-large.png")}
  >
    <ScrollView>
      <Card containerStyle={{... styles.modalView}}>
        <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Card.Divider />
        <View style={{...styles.centeredView}}>
          <Input
            placeholder={webConfig.getText("loginPage.username.label")}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              signIn({username, password});
            }}
          >
            <Text style={styles.textStyle}>{webConfig.getText("loginPage.loginButton.label")}</Text>
          </TouchableHighlight>
        </View>
      </Card>

    </ScrollView>
    </ImageBackground>
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
        {(props) => <Main {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default Login;
