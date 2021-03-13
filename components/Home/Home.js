import React, {
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  useContext,
} from "react";

import { Text, ScrollView, View, RefreshControl } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { createStackNavigator } from "@react-navigation/stack";
import { getRecipes } from "../../services/heirloomApi";
import RecipeList from "../Recipe/RecipeList";
import CreateRecipe from "../Recipe/CreateRecipe";
import { AuthContext } from "../../contexts/auth";
import Loader from "../atoms/Loader"

const Stack = createStackNavigator();

const Main = ({ navigation }) => {
  const { serverRequest, onSuccess, state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          icon={
            <Icon
              name="plus"
              size={20}
              style={{ paddingRight: 10 }}
              color="black"
            />
          }
          onPress={() => {
            navigation.navigate("CreateRecipe");
          }}
        />
      ),
    });
  }, [navigation]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getRecipes().then((resp) => {
      setData(resp);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    let mounted = true;
    serverRequest();
    getRecipes().then((resp) => {
      if (mounted) {
        setData(resp);
        onSuccess();
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const recipeDetails = function (recipe) {
    navigation.navigate("Detail", { recipe: recipe });
  };
  if (state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }
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
        options={({ route }) => ({ title: route.params.recipe.title })}
      />
      <Stack.Screen
        name="CreateRecipe"
        component={CreateRecipe}
        options={{ title: "Create Recipe" }}
      />
    </Stack.Navigator>
  );
}

export default Home;
