import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import Ingredient from "../model/Ingredient";


const IngredientPicker = (props: {onChange: any; initialValue?: Ingredient[]}) => {

  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientAmount, setIngredientAmount] = useState<string>('');
  const initialValue = props.initialValue;

  useEffect(() => {

    if (initialValue) {
      setIngredients(initialValue as never);
      props.onChange(initialValue);
    }

  }, []);

  const addIngredient = () => {

    if (ingredientName && ingredientAmount) {
      const updatedIngredients = [...ingredients, ingredientName + ',' + ingredientAmount];
      setIngredients(updatedIngredients as never);
      setIngredientName('');
      setIngredientAmount('');
      // console.log('picker: ', updatedIngredients)
      props.onChange(updatedIngredients);
    }
  }

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    props.onChange(updatedIngredients);
  }
  

  const IngredientItem = (props: {ingredient: string, index: number}) => {
    
    const name = props.ingredient.split(',')[0];
    const amount = props.ingredient.split(',')[1];
    const index = props.index;


    return (
      <View>
        <View style={styles.ingredientContainer}>
          <TouchableOpacity style={styles.ingredientIcon} onPress={() => removeIngredient(index)}>
            <Iconify icon="mdi:delete-outline" style={styles.icon} size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.ingredientName}>{name}</Text>
          <Text style={styles.ingredientAmount}>{amount}</Text>
        </View>
  
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Ingredientes</Text>
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={{textAlign: 'center'}}>Add Ingredient</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientIcon}>
            <Iconify icon="fluent:food-16-regular" style={styles.icon} size={30} color="black" />
          </View>
          <TextInput inputMode="email" placeholder="Ingredient"  value={ingredientName} style={styles.ingredientName} onChangeText={setIngredientName}/>
          <TextInput placeholder="Amount" value={ingredientAmount} style={styles.ingredientAmount} onChangeText={setIngredientAmount}/>
        </View>
      </View>


      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (<IngredientItem ingredient={item} index={index}/>)}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default IngredientPicker;

const styles = StyleSheet.create({

  container: {
    width: '100%',
    alignSelf: 'center'
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },

  addButton: {
    width: '34%',
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },

  ingredientContainer: {
    width: '100%',
    height: 36,
    backgroundColor: Colors.lightGray,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 15,
  },

  ingredientIcon: {
    width: '13%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },

  ingredientName: {
    textAlignVertical: 'center',
    fontSize: 15,
    marginLeft: 10,
    alignSelf: 'center'
  },

  ingredientAmount: {
    textAlignVertical: 'center',
    fontSize: 15,
    right: 25,
    position: 'absolute',
    alignSelf: 'center'
  },

  icon:{
    alignSelf: 'center', 
    marginVertical: 2,
  }


});