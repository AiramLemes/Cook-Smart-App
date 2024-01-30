import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";


const IngredientPicker = () => {

  const [ingredients, setIngredients] = useState(['']);
  const [ingredientName, setIngredientname] = useState<string>();
  const [ingredientAmount, setIngredientAmount] = useState<string>();


  const addIngredient = () => {

    setIngredients([...ingredients, ''])    

    setIngredientname('')
    setIngredientAmount('');
  }

  const IngredientItem = (props: {ingredient: string}) => {
    
    const ingredient = props.ingredient;

    return (
      <View>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientIcon}>
            <Iconify icon="fluent:food-16-regular" style={styles.icon} size={30} color="black" />
          </View>
          <TextInput placeholder="Ingredient" value={ingredientName} style={styles.ingredientName} onChangeText={setIngredientname}/>
          <TextInput placeholder="Amount" value={ingredientAmount} style={styles.ingredientName} onChangeText={setIngredientAmount}/>
          <TouchableOpacity onPress={addIngredient}>
            <Iconify icon="gala:add" style={styles.icon} size={30} color={Colors.primary} />
          </TouchableOpacity>
        </View>
  
      </View>
    );
  }


  return (
    <View style={styles.container}>

      <Text style={styles.text}>Ingredientes</Text>
      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (<IngredientItem ingredient={item} />)}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default IngredientPicker;

const styles = StyleSheet.create({

  container: {
    width: '90%',
    alignSelf: 'center'
  },

  text: {
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20
  },

  ingredientContainer: {
    width: '98%',
    height: 36,
    backgroundColor: Colors.lightGray,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  
  },

  ingredientIcon: {
    width: '13 %',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },

  ingredientName: {
    textAlignVertical: 'center',
    fontSize: 15,
  },

  ingredientAmount: {
    textAlignVertical: 'center',
    fontSize: 15,
  },

  icon:{
    alignSelf: 'center', 
    marginVertical: 2,
  }


});