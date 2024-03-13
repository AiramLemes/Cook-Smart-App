import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Iconify } from "react-native-iconify";
import { useIsFocused } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import Colors from "../constants/Colors";
import IngredientItem from "../components/IngredientItem";
import Pantry from "../model/Pantry";
import { getPantry, removeIngredientFromPantry } from "../repository/FirebasePantry";
import IngredientDialog from "../components/IngredientDialog";
import Ingredient from "../model/Ingredient";
import ConfirmationDialog from "../components/ConfirmationDialog";
import LanguageContext from "../context/LanguageProvider";

const PantryScreen = () => {
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const isFocused = useIsFocused();

  const [pantry, setPantry] = useState<Pantry>({ products: [] });
  const [currentPantry, setCurrentPantry] = useState<Pantry>({ products: [] });
  const [diaologVisibility, setDialogVisibility] = useState<boolean>(false);
  const [confirmDialogVisible, setconfirmDialogVisible] = useState<boolean>(false);
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
    setconfirmDialogVisible(true);
    // Set the index to be removed in the state
    setRemoveIngredientIndex(index);
  };

  const handleConfirmDialog = (accepted: boolean) => {
    if (accepted && removeIngredientIndex !== undefined) {
      removeIngredientFromPantry(removeIngredientIndex);
      let updatedPantry = { ...pantry! };
      updatedPantry.products.splice(removeIngredientIndex, 1);
      setPantry(updatedPantry);
      setCurrentPantry(updatedPantry);
      setRemoveIngredientIndex(undefined);
    } else {
      setRemoveIngredientIndex(undefined);
    }

    setconfirmDialogVisible(false);
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
        products: pantry!.products.filter((ingredient) =>
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
        data={currentPantry!.products}
        renderItem={({ item, index }) => (
          <IngredientItem
            ingredient={item}
            size={30}
            pantryIngredient={true}
            index={index}
            onRemove={() => {
              setconfirmDialogVisible(true);
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

     
      <TouchableOpacity style={styles.addButton} onPress={() => {setDialogVisibility(true)}}>
        <Shadow style={{ borderRadius: 30 }} distance={3}>
          <Iconify icon="tdesign:add-circle" size={40} color={Colors.primary} />
        </Shadow>
      </TouchableOpacity>

      <IngredientDialog onClose={() => {setDialogVisibility(false)}} isVisible={diaologVisibility}
        onAddProduct={(ingredient: Ingredient) => {addIngredient(ingredient)}}/>

      <ConfirmationDialog text={Strings.translate('pantryConfirmationDialog')} 
        isVisible={confirmDialogVisible} onClose={handleConfirmDialog}/>

      {pantry === null || pantry.products.length <= 0 && (
        <View style={{width: '100%', height: '100%', zIndex: -2}}>
          <Image style={styles.image} src="https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/pantry%2Fpantry.png?alt=media&token=0ed13f05-5963-4964-8319-c00334038dcd"/>
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
  },

  searchBarContainer: {
    width: "95%",
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

  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: '70%',
    zIndex: -1
  },

  text: {
    textAlign: 'center',
    margin: -50,
    zIndex: -1
  }
});
