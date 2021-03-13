import React, { useContext, useState, useEffect } from "react";
import { Input, Card, Divider } from "react-native-elements";
import {
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
} from "react-native";
import { WebConfig } from "../../contexts/webConfig";
import {AuthContext} from "../../contexts/auth"
import {createRecipe} from "../../services/heirloomApi"

class ingredientModel {
  constructor(name, uom) {
    this.name = name;
    this.uom = uom;
  }
}

class recipeModel {
  constructor(name, ingredients, instructions) {
    this.title = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.description = ''
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // minHeight: "100%",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
const Ingredient = ({ index, updateIngredient, ingredient, inputDisabled }) => {
  return (
    <View
      style={[
        { flex: 1, flexDirection: "row" },

      ]}
    >
      <View style={{ flex: 3 }}>
        <Input
          disabled={inputDisabled}
          placeholder={"Ingredient"}
          value={ingredient.name}
          onChangeText={(value) => {
            updateIngredient(parseInt(index), "name", value);
          }}
        ></Input>
      </View>
      <View style={{ flex: 1 }}>
        <Input
          disabled={inputDisabled}
          placeholder={"UoM"}
          value={ingredient.uom}
          onChangeText={(value) => {
            updateIngredient(parseInt(index), "uom", value);
          }}
        ></Input>
      </View>
    </View>
  );
};

function CreateRecipe({navigation}) {
  const { serverRequest, onSuccess, state } = useContext(AuthContext);
  const webConfig = useContext(WebConfig);
  const [recipe, setRecipe] = useState(new recipeModel());
  const [inputDisabled, setInputDisabled] = useState(false)
  const [name, setName] = useState("");
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([new ingredientModel("", "")]);
  useEffect(() => {
    setRecipe(new recipeModel(name, ingredients, directions));
  }, [ingredients, directions, name]);

  const addIngredient = () => {
    setIngredients([...ingredients, new ingredientModel("", "")]);
  };

  const updateIngredient = (key, part, value) => {
    setIngredients((prevState) => {
      let newVals = [...prevState];
      newVals[key][part] = value;
      return newVals;
    });
  };

  const submitForm = () => {
    console.log('submit form')
    setInputDisabled(true)
    serverRequest()
    createRecipe(recipe).then(res=>{
      console.log(res)
      if (res.status === 200){
        onSuccess()
        navigation.popToTop()
      }
    })
  };

  return (
    <ScrollView>
      <View style={{ ...styles.container }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Input
          disabled={inputDisabled}
            label={webConfig.getText("createRecipe.name.label")}
            placeholder={webConfig.getText("createRecipe.name.placeholder")}
            value={name}
            onChangeText={setName}
          />
        </View>
        {ingredients.map((ingredient, index) => {
          return (
            <Ingredient
              inputDisabled={inputDisabled}
              key={index}
              index={index}
              ingredient={ingredient}
              updateIngredient={updateIngredient}
            ></Ingredient>
          );
        })}
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => {
            addIngredient();
          }}
        >
          <Text style={styles.textStyle}>{"add ing"}</Text>
        </TouchableHighlight>
        <Input
          disabled={inputDisabled}
          placeholder={webConfig.getText(
            "createRecipe.instructions.placeholder"
          )}
          multiline={true}
          value={directions}
          onChangeText={setDirections}
        />

        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
          onPress={() => {
            submitForm()
          }}
        >
          <Text style={styles.textStyle}>
            {webConfig.getText("createRecipe.submitButton.label")}
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

export default CreateRecipe;
