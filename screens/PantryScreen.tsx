import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { Searchbar } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import ConfirmationDialog from "../components/ConfirmationDialog";
import IngredientDialog from "../components/IngredientDialog";
import IngredientItem from "../components/IngredientItem";
import Colors from "../constants/Colors";
import LanguageContext from "../context/LanguageProvider";
import Ingredient from "../model/Ingredient";
import Pantry from "../model/Pantry";
import { getPantry, removeIngredientFromPantry } from "../repository/FirebasePantry";

//@ts-ignore
const PantryScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const isFocused = useIsFocused();

  const [pantry, setPantry] = useState<Pantry>({ products: [] });
  const [currentPantry, setCurrentPantry] = useState<Pantry>({ products: [] });
  const [diaologVisibility, setDialogVisibility] = useState<boolean>(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState<boolean>(false);
  const [removeIngredientIndex, setRemoveIngredientIndex] = useState<number | undefined>();

  const Strings = useContext(LanguageContext);

  useEffect(() => {

    const loadPantry = async () => {
      const pantry = await getPantry();
      setPantry({products: []});
      setCurrentPantry({products: []});
      setPantry(pantry);
      setCurrentPantry(pantry);
    }

    loadPantry();

  }, [isFocused]);

  const removeIngredient = (index: number) => {
    setConfirmDialogVisible(true);
    setRemoveIngredientIndex(index);
  };

  const handleConfirmDialog = (accepted: boolean) => {
    if (accepted && removeIngredientIndex !== undefined) {
      removeIngredientFromPantry(removeIngredientIndex);
      let updatedPantry = { ...pantry };
      updatedPantry.products.splice(removeIngredientIndex, 1);
      setPantry(updatedPantry);
      setCurrentPantry(updatedPantry);
      setRemoveIngredientIndex(undefined);
    } else {
      setRemoveIngredientIndex(undefined);
    }

    setConfirmDialogVisible(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      filterPantryIngredients(text);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  const filterPantryIngredients = (searchText: string) => {
    const lowerCaseSearch = searchText.toLocaleLowerCase().trim();

    if (lowerCaseSearch === "" || lowerCaseSearch === " ") {
      setCurrentPantry(pantry);
    } else {
      const filteredPantry = {
        products: pantry.products.filter((ingredient) =>
          ingredient.name.toLocaleLowerCase().includes(lowerCaseSearch)
        ),
      };
      setCurrentPantry(filteredPantry);
    }
  };


  const addIngredient = (ingredient: Ingredient) => {
    pantry.products.push(ingredient);
    pantry.products.sort((a: Ingredient, b:Ingredient) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    setCurrentPantry(pantry);
  };

  return (
    <View style={styles.container}>
      {pantry != null && pantry.products.length > 0 && (
        <>
        <View style={styles.searchBarContainer}>
          <Searchbar
            inputStyle={{ alignSelf: "center" }}
            style={styles.searchbar}
            placeholder={Strings.t("search") + "..."}
            onChangeText={handleSearch}
            value={search}
          />
        </View>

        <FlatList
        style={styles.pantryContainer}
        data={currentPantry.products}
        renderItem={({ item, index }) => (
          <IngredientItem
            ingredient={item}
            size={30}
            pantryIngredient={true}
            index={index}
            onRemove={() => {
              setConfirmDialogVisible(true);
              removeIngredient(index);
            }}
          />
        )}
        keyExtractor={(item) => item.name}
        numColumns={1}
        contentContainerStyle={styles.recipesContainer}
        />
      </>
    )}

    <View style={styles.bottomButtons}>

      <TouchableOpacity onPress={() => {navigation.navigate('ShoppingList')}}>
        <Shadow style={{ borderRadius: 30 }} distance={3}>
          <Iconify icon="material-symbols:playlist-add-check-circle-outline-rounded" size={40} color={Colors.primary} />
        </Shadow>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {setDialogVisibility(true)}}>
        <Shadow style={{ borderRadius: 30 }} distance={3}>
          <Iconify icon="tdesign:add-circle" size={40} color={Colors.primary} />
        </Shadow>
      </TouchableOpacity>

    </View>

      <IngredientDialog onClose={() => {setDialogVisibility(false)}} isVisible={diaologVisibility}
        onAddProduct={(ingredient: Ingredient) => {addIngredient(ingredient)}}/>

      <ConfirmationDialog text={Strings.translate('pantryConfirmationDialog')} 
        isVisible={confirmDialogVisible} onClose={handleConfirmDialog}/>

      {pantry === null || pantry.products.length <= 0 && (
        <View style={{width: '100%', height: '100%', justifyContent: 'center', zIndex: -2}}>
          <Image style={styles.image} source={require('../assets/carousel/pantry.png')}/>
          <Text style={styles.text}>{Strings.translate('emptyPantry')}</Text>
        </View>
      )}
    </View>
  );
};

export default PantryScreen;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    width: "100%",
    height: '100%',
    paddingHorizontal: 10
  },

  searchBarContainer: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    margin: 20,
  },

  searchbar: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: Colors.background,
    borderColor: Colors.black,
    borderWidth: 1,
  },

  pantryContainer: {
    flexDirection: "column",
  },

  recipesContainer: {
    flexGrow: 1,
    paddingTop: 10,
  },

  bottomButtons: {
    position: "absolute",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 20,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: '20%',
    marginBottom: 80,
    alignSelf: 'center',
    zIndex: -1
  },

  text: {
    textAlign: 'center',
    margin: -50,
    zIndex: -1
  }
});
