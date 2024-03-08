import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Shadow } from 'react-native-shadow-2';
import Stars from "./Stars";
import Recipe from "../model/Recipe";
import { useNavigation } from "@react-navigation/native";
import { Iconify } from "react-native-iconify";
import { deleteRecipe } from "../repository/FirebaseRecipes";

const RecipeItem = (props: { recipe: Recipe; userId: string; onDelete?: (value: string) => void;}) => {
  
  const { recipe, userId } = props;
  const navigation = useNavigation();

  const handleDelete = () => {
    props.onDelete?.(recipe.id);
  };

  return (
    <View style={styles.container}>
      {userId && userId === recipe.userId && (
      <TouchableOpacity style={styles.edit} onPress={handleDelete}>
        <Iconify icon="mdi:delete-outline" size={25} color={Colors.black} />
      </TouchableOpacity>
      )}
      
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
  );
}

export default RecipeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25,
  },

  shadow: {
  },

  recipe: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
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
    textShadowRadius: 10,
    justifyContent: 'center',
    textAlign: 'center'
  },
  
  edit: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 2
  }
});
