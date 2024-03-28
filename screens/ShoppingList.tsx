import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, PixelRatio, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import LanguageContext from '../context/LanguageProvider';
import { addIngredientsToShoppingList, getCurrentUser, updateIngredientFromShoppingList } from '../repository/FirebaseUser';
import Colors from '../constants/Colors';
import IngredientItem from '../components/IngredientItem';
import Ingredient from '../model/Ingredient';
import ToastUtil from '../utils/ToastUtil';
import Toast from 'react-native-root-toast';
import { translateText } from '../services/TransaltionService';

const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 20;

//@ts-ignore
const ShoppingList = ({ navigation }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [shoppingList, setShopingList] = useState<Ingredient[]>([]);
  const [ingredientName, setIngredientName] = useState<string>();

  const Strings = useContext(LanguageContext);
  const onFocus = useIsFocused();
  
  useEffect(() => {
    const getShoppingList = async () => {
      setLoading(true);
      const user = await getCurrentUser();
      setShopingList(user!!.shoppingList);
    };
    
    getShoppingList();
    setLoading(false);
  }, [onFocus]);


  const removeIngredient = async (index: number) => {
    const updatedIngredients = [...shoppingList];
    updatedIngredients.splice(index, 1);
    if (await(updateIngredientFromShoppingList(updatedIngredients))) {
      setShopingList(updatedIngredients);
    }
    else {
      ToastUtil.showToast(Strings.translate('generalError'), Toast.durations.SHORT);
    }
  };


  const handleInput = async (text: string) => {
    setIngredientName(text);
    const item = text.split('\n');

    if (item.length >= 2) {
      setIngredientName('');
      const newIngredient: Ingredient = {
        name: item[0],
        unit: '',
        amount: 0,
        englishVersion: await translateText(Strings.locale, item[0], true)
      }
      
      const result = await addIngredientsToShoppingList(newIngredient);
      
      if (result) {
        result.length == shoppingList.length ? 
        ToastUtil.showToast(Strings.translate('ingredientAlreadyInShoppingList'), Toast.durations.SHORT) : setShopingList(result);
      }
    }

  };




  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Iconify icon="lets-icons:back" size={33} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{Strings.translate('shoppingList')}</Text>
      <TextInput style={styles.input} multiline placeholder={Strings.translate('addIngredient') + '...'} value={ingredientName} onChangeText={handleInput} />
      <FlatList
        data={shoppingList}
        renderItem={({ item, index }) => <IngredientItem ingredient={item} size={30} shoppingList pantryIngredient onRemove={() => {removeIngredient(index)}} />}
        style={styles.listContainer}
        keyExtractor={(item) => item.name}
      />

      {shoppingList.length <= 0 && (
        <View style={styles.noRecipes}>
          <Text>{Strings.translate('emptyShoppingList')} :(</Text>
        </View>
      )}
        
      {loading && (
        <View style={styles.loadingContainer}>
          {/* <LottieView source={require('../../assets/Loading Animation.json')}
          style={{height: '30%', width: '30%'}}
          autoPlay/> */}
          <ActivityIndicator size="large" color={Colors.primary} />
      </View>
      )}
    </View>


  );


};

const styles = StyleSheet.create({
  
  container: {
    paddingHorizontal: 20, 
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingBottom: 20
  },

  title: {
    alignSelf: 'center',
    fontSize: adjustedFontSize,
    paddingBottom: 30,
    fontWeight: '400'
  },

  input: {
    width: '100%',
    paddingVertical: 5,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  noRecipes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContainer: {
    borderWidth: 2, 
    borderColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    height: windowWidth,
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

  
});

export default ShoppingList;
