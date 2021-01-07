import React, {useContext} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { Text, ScrollView } from "react-native";
import {AuthContext} from "../../contexts/auth"

function Profile() {
  const {signOut} = useContext(AuthContext)
  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile!</Text>
      <Button
        icon={<Icon name="carrot" size={15} color="white" />}
        title="LOGOUT" onPress={() => signOut()}
      />
    </ScrollView>
  );
}

export default Profile;
