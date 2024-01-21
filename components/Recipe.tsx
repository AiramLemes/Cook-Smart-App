import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Shadow } from 'react-native-shadow-2';
import Stars from "./Stars";
import Recipe from "../model/Recipe";
import { useNavigation } from "@react-navigation/native";

const RecipeItem = (props: {recipe: Recipe}) => {
  
  const recipe = props.recipe;
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => {navigation.navigate('Recipe', recipe)}} style={styles.recipe}>
          <Shadow distance={4} offset={[0, 2]}>
            <Image
              source={{
                uri: recipe.mainImage
              }}
              style={styles.recipeImage}
            />
          </Shadow>
  
          <Text style={styles.recipeTitle}>{recipe.title}</Text>

          <Stars assessment={recipe.assessment} size={20}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RecipeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25
  },

  shadow: {
  },

  recipe: {
    flex: 1,
    alignItems: 'center',
  },

  recipeImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 3,
    marginBottom: 15,
  },

  recipeTitle: {
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10
  }
});
