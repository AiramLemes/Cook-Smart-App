import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, PixelRatio, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import LanguageContext from "../context/LanguageProvider";
import Ingredient from "../model/Ingredient";
import SelectDropdown from 'react-native-select-dropdown'

const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 28;


const IngredientPicker = (props: {onChange: any; initialValue?: Ingredient[]}) => {

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientName, setIngredientName] = useState<string>('');
  const [ingredientAmount, setIngredientAmount] = useState<number>();
  const [ingredientUnit, setIngredientUnit] = useState<string>('');

  const Strings = useContext(LanguageContext);

  const units = ['kg', 'gr', 'L', 'ml'];

  const initialValue = props.initialValue;

  useEffect(() => {

    if (initialValue) {
      setIngredients(initialValue as never);
      props.onChange(initialValue);
    }

  }, []);

  const addIngredient = () => {
    if (ingredientName && ingredientAmount > 0 && ingredientUnit) {

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
      setIngredientAmount();
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
            <Text style={[styles.ingredientText, {width: '18%'}]}>{ingredient.unit}</Text>
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
            <TextInput style={styles.ingredientText} placeholder={Strings.translate('enterIngredientName')} value={ingredientName}  onChangeText={setIngredientName}/>
            <TextInput keyboardType="numeric" style={styles.ingredientText} placeholder={Strings.translate('amount')} value={ingredientAmount?.toString()} onChangeText={setIngredientAmount}/>
            <SelectDropdown
              data={units}
              defaultButtonText={Strings.translate('unit')} 
              buttonStyle={styles.selector}
              buttonTextStyle={styles.selectorText}
              dropdownStyle={{borderRadius: 10}}
              onSelect={(selectedItem, index) => {setIngredientUnit(selectedItem)}}
              buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
              rowTextForSelection={(item, index) => { return item }}
            />
            {/* <TextInput placeholder={Strings.translate('unit')} value={ingredientUnit}  onChangeText={setIngredientUnit}/> */}
          </View>
        </View>
      </View>


      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (<IngredientItem ingredient={item} index={index}/>)}
        keyExtractor={(item) => item.name}
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
    width: '40%',
    minHeight: 30,
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
    fontSize: adjustedFontSize,
    alignSelf: 'center'
  },

  selector: {
    backgroundColor: Colors.lightGray,
    width: '25%',
    height: '98%'
  },

  selectorText: {
    fontSize: adjustedFontSize
  }


});