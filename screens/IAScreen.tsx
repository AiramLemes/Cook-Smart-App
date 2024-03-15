import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Iconify } from "react-native-iconify";
import { generateRecipe } from "../services/Openai";
import { useIsFocused } from "@react-navigation/native";
import ToastUtil from "../utils/ToastUtil";
import Toast from "react-native-root-toast";
import CookingAnimation from "../utils/CookingAnimation";
import LanguageContext from "../context/LanguageProvider";

// @ts-ignore
const IAScreen = ({navigation}) => {

  const isFocused = useIsFocused();


  const [search, setSearch] = useState<string>("");

  const textInputRef = useRef(null);
  const Strings = useContext(LanguageContext);

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [creatingRecipe, setCreatingRecipe] = useState<boolean>(false);

  useEffect(() => {


  // navigation.navigate('Recipe',recipe2)
  // console.log(recipe2);
  }, [isFocused]);

  const handleSearch = (text: string) => {
    setSearch(text)
    const item = text.split('\n');

    if (item.length >= 2) {
      const updatedIngredients: string[] = [...ingredients];
      updatedIngredients.push(search);
  
      setIngredients(updatedIngredients);
      setSearch('');
    }

  };


  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const ingredientItem = (name: string, index: number) => {
    return (
      <View style={styles.ingredientContainer}>
        <Text style={{verticalAlign: 'middle'}}>{name}</Text>
        <TouchableOpacity onPress={() => {removeIngredient(index)}}>
          <Iconify style={{marginTop: 3}} icon="mdi:delete-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
    )
  };

  const handleCreateRecipe = async() => {
    setCreatingRecipe(true);
    const recipe = await generateRecipe(ingredients);

    if (recipe) {
      setCreatingRecipe(false);
      setIngredients([]);
      navigation.navigate('Recipe', recipe)
    }

    else {
      ToastUtil.showToast(Strings.translate('iaRecipeError'), Toast.durations.SHORT);
    }


  };

  

  return (
    <View style={styles.container}>

      {!creatingRecipe && (
        <>
        <Text style={styles.title}>{Strings.translate('iaTitle')}</Text>
        <Image style={styles.image} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/ai%2Fchat%20gpt%20image.webp?alt=media&token=1020e5ee-2c08-4e99-a0df-9524eb6810bd" }} />

        <View style={styles.addProductContainer}>
          <TextInput
            placeholder={Strings.translate('iaAddProduct')}
            style={styles.textInput}
            value={search}
            onChangeText={handleSearch}
            multiline
            ref={textInputRef}
          />
        </View>

        <FlatList
          data={ingredients}
          renderItem={({ item, index }) => ingredientItem(item, index)}
          keyExtractor={(item) => item}
          numColumns={1}
          style={styles.ingredientListContainer}
        />

        {/* <TouchableOpacity style={styles.createRecipeButton} > */}
        <TouchableOpacity style={styles.createRecipeButton} onPress={handleCreateRecipe}>

          <Text style={{ fontSize: 18, textAlign: 'center', padding: 5}}>{Strings.translate('iaButton')}</Text>
        </TouchableOpacity>
        </>
      )}

      
      {creatingRecipe && (
        <View style={{width: '100%', height: '30%', justifyContent: 'center'}}>
          <CookingAnimation/>
          <Text style={styles.cookingText}>{Strings.translate('iaAnimationText')}</Text>
        </View>
      )}
    </View>
  );

}

export default IAScreen;


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: 'center'
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 18,
    textAlign: 'center',
    width: '80%',
    marginBottom: 30,
  },

  image: {
    width: '100%',
    height: '20%',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10
  },

  addProductContainer: {
    width: "95%",
    height: 40,
    alignSelf: "center",
    margin: 20,
  },

  textInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: Colors.background,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  ingredientListContainer: {
    width: '95%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 10
  },

  ingredientContainer: {
    width: '95%',
    height: 35,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 10,
    alignSelf: 'center',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  createRecipeButton: {
    width: '90%',
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.black,
    backgroundColor: Colors.lightGray
  },

  cookingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20
  }
  
});
