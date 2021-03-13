import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Card } from "react-native-elements";

import { ScrollView, View, Text } from "react-native";
import { baseStyles as styles } from "../../styleSheet";

const Stack = createStackNavigator()

function RecipeDetail(recipe) {
    const _recipe = {
            "ingredients": [
                {"name":"carrots"},
                {"name":"peas"}
            ],
            "title": "Test Recipe ER THINGS"  
    }

    const IngredientList = () => {
        const ingredientList = _recipe.ingredients.map(ing => {
            return (
                <Card containerStyle={{... styles.modalView}}>
            <Text>{ing.name}</Text></Card>)
        })
        return (
            <View>
                {ingredientList}
            </View>
        )
    }

    const recipeDetail = () =>  {return (
        <ScrollView>
        <View>
          <Text>{JSON.stringify(_recipe)}</Text>
          <IngredientList></IngredientList>
        </View>
        </ScrollView>
    )}
    return (
        <Stack.Navigator>
            <Stack.Screen name={'TEST'} component={recipeDetail}/>
        </Stack.Navigator>

      );
}

export default RecipeDetail;
