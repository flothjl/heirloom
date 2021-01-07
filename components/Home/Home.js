import React, { useEffect, useState, useCallback } from "react";

import { Text, ScrollView, View, RefreshControl} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getRecipes } from "../../services/heirloomApi";
import RecipeList from "../Recipe/RecipeList";
const Stack = createStackNavigator();

const Main = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRecipes().then((resp) => {
      setData(resp);
      setRefreshing(false)
    });
  }, []);
  useEffect(() => {
    getRecipes().then((resp) => {
      setData(resp);
    });
  }, []);

  const recipeDetails = function (recipe) {
    console.log(recipe);
    navigation.navigate("Detail", { recipe: recipe });
  };
  return (
    <ScrollView>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <RecipeList listArray={data} onItemClick={recipeDetails}></RecipeList>
    </ScrollView>
  );
};

const Detail = ({
  route: {
    params: { recipe },
  },
}) => {
  return (
    <View>
      <Text>{JSON.stringify(recipe)}</Text>
    </View>
  );
};

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          title: "My home",
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ title: "Recipe Detail Page" }}
      />
    </Stack.Navigator>
  );
}

export default Home;
