import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Iconify } from "react-native-iconify";
import { useIsFocused } from "@react-navigation/native";
import { Shadow } from "react-native-shadow-2";
import Colors from "../constants/Colors";
import { Strings } from "../constants/Strings";
import IngredientItem from "../components/IngredientItem";
import Pantry from "../model/Pantry";
import { getPantry } from "../repository/FirebasePantry";
import IngredientDialog from "../components/IngredientDialog";
import Ingredient from "../model/Ingredient";

const PantryScreen = () => {
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const isFocused = useIsFocused();

  const [pantry, setPantry] = useState<Pantry>({ products: [] });
  const [currentPantry, setCurrentPantry] = useState<Pantry>({ products: [] });
  const [diaologVisibility, setDialogVisibility] = useState<boolean>(false);

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
    let updatedPantry = { ...pantry! };
    updatedPantry.products.splice(index, 1);
    setPantry(updatedPantry);
    setCurrentPantry(updatedPantry); 
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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          inputStyle={{ alignSelf: "center" }}
          style={styles.searchbar}
          placeholder={Strings.t("search") + "..."}
          onChangeText={handleSearch}
          value={search}
        />
      </View>

      {pantry != null && pantry.products.length > 0 && (
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
              removeIngredient(index);
            }}
          />
        )}
        keyExtractor={(item) => item.name}
        numColumns={1}
        contentContainerStyle={styles.recipesContainer}
        />
      )}

     
      <TouchableOpacity style={styles.addButton} onPress={() => {setDialogVisibility(true)}}>
        <Shadow style={{ borderRadius: 30 }} distance={3}>
          <Iconify icon="tdesign:add-circle" size={40} color={Colors.primary} />
        </Shadow>
      </TouchableOpacity>

      <IngredientDialog onClose={() => {setDialogVisibility(false)}} isVisible={diaologVisibility}
        onAddProduct={(ingredient: Ingredient) => {addIngredient(ingredient)}}/>

    </SafeAreaView>
  );
};

export default PantryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    width: "100%",
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
});
