import { FlatList, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import { useContext, useEffect, useState } from "react";
import Ingredient from "../model/Ingredient";
import LanguageContext from "../context/LanguageProvider";


const IngredientPicker = (props: {onChange: any; initialValue?: Ingredient[]}) => {

  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientAmount, setIngredientAmount] = useState<string>('');
  const [ingredientUnit, setIngredientUnit] = useState<string>('');

  const Strings = useContext(LanguageContext);

  const initialValue = props.initialValue;

  useEffect(() => {

    if (initialValue) {
      setIngredients(initialValue as never);
      props.onChange(initialValue);
    }

  }, []);

  const addIngredient = () => {

    if (ingredientName && ingredientAmount && ingredientUnit) {

      const newIngredient: Ingredient = {
        name: ingredientName,
        amount: ingredientAmount,
        unit: ingredientUnit,
        englishVersion: ""
      }

      
      const updatedIngredients = [...ingredients, newIngredient];
      console.log('Ingredient: ', updatedIngredients)
      setIngredients(updatedIngredients as never);
      setIngredientName('');
      setIngredientAmount('');
      setIngredientUnit('')
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
  

  const IngredientItem = (props: {ingredient: Ingredient, index: number}) => {
    const ingredient = props.ingredient;
    const index = props.index;

    return (
      <View>
        <View style={styles.ingredientContainer}>
          <TouchableOpacity style={styles.ingredientIcon} onPress={() => removeIngredient(index)}>
            <Iconify icon="mdi:delete-outline" style={styles.icon} size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.inputsContainer}>
            <Text style={styles.ingredientText}>{ingredient.name}</Text>
            <Text style={styles.ingredientText}>{ingredient.amount.toString()}</Text>
            <Text style={styles.ingredientText}>{ingredient.unit}</Text>
          </View>
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>{Strings.translate('ingredients')}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={{textAlign: 'center'}}>{Strings.translate('addIngredient')}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.ingredientContainer}>
          <View style={styles.ingredientIcon}>
            <Iconify icon="fluent:food-16-regular" style={styles.icon} size={30} color="black" />
          </View>
          <View style={styles.inputsContainer}>
            <TextInput placeholder={Strings.translate('enterIngredientName')} value={ingredientName}  onChangeText={setIngredientName}/>
            <TextInput placeholder={Strings.translate('amount')} value={ingredientAmount}  onChangeText={setIngredientAmount}/>
            <TextInput placeholder={Strings.translate('unit')} value={ingredientUnit}  onChangeText={setIngredientUnit}/>
          </View>
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
    alignSelf: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
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

  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    width: '80%', 
    paddingStart: 10,
    
  },

  icon:{
    alignSelf: 'center', 
    marginVertical: 2,
  },

  ingredientText: {
    textAlignVertical: 'center',
    fontSize: 17,
    alignSelf: 'center'

  }


});