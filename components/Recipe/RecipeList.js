import React from "react";
import { ListItem, Avatar } from "react-native-elements";
import { View } from "react-native";

function RecipeList({ listArray, onItemClick }) {
  let onPress = onItemClick || function(){}
  return (
    <View>
        {  listArray.map((listItem) => (
      
      <ListItem key={listItem._id} onPress={() => onPress(listItem)} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{listItem.title}</ListItem.Title>
          <ListItem.Subtitle>{listItem.created}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      
    ))}
    </View>
  )
  

}

export default RecipeList;
