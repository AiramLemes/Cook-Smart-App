import React, { useState, useCallback, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";
import { Searchbar } from 'react-native-paper';
import { deleteRecipe, getAllRecipes, getRecipesByUserWithSearch, isUserRecipesIdsNotEmpty } from "../repository/FirebaseRecipes";
import RecipeItem from "../components/Recipe";
import Recipe from "../model/Recipe";
import { Strings } from "../constants/Strings";
import { Iconify } from "react-native-iconify";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ToastUtil from "../utils/ToastUtil";
import Toast from "react-native-root-toast";

const SearchScreen = (props: {userId: string| undefined}) => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastVisible, setLastVisible] = useState<Recipe | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [previousSearch, setPreviousSearch] = useState<string>('');
  const [isRecipesIdsNotEmpty, setIsRecipesIdsNotEmpty] = useState<boolean>(false);
  const [deletedItemId, setDeletedItemId] = useState<string|undefined>(undefined);
  const [updatedList, setUpdatedList] = useState<boolean>(false);
  const [deleteRecipeDialog, setDeleteRecipeDialog] = useState<boolean>(false);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const userId = props.userId;

  useEffect(() => {
    if (userId) {
      isUserRecipesIdsNotEmpty(userId).then((result) => {
        setIsRecipesIdsNotEmpty(result);
      });
    }

    if (isFocused) {
      fetchRecipes(20, null, ''); 
      setRecipes([]);
    }
    
  }, [userId, isFocused, updatedList]);

  const fetchRecipes = useCallback(async (pageSize: number, lastVisibleRef: Recipe | null, query: string) => {
    try {
      setLoading(true);
      
      const recipesData = props.userId ? await getRecipesByUserWithSearch(props.userId, pageSize, lastVisibleRef, query) : await getAllRecipes(pageSize, lastVisibleRef, query);
      
      if (query !== previousSearch) {
        // Si la búsqueda cambió, resetea lastVisible y recetas
        setLastVisible(null);
        setRecipes(recipesData.recipes);
      } else {
        // Si la búsqueda no cambió, concatena los resultados
        setRecipes((prevRecipes) => {
          // Filtramos los duplicados antes de concatenar
          const uniqueRecipes = recipesData.recipes.filter((newRecipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id));
          return [...prevRecipes, ...uniqueRecipes];
        });
      }

      setLastVisible(recipesData.lastVisible);
      setPreviousSearch(query);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, [previousSearch]);

  const handleSearch = (text: string) => {
    setSearch(text);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchRecipes(10, null, text);
    }, 500);

    setSearchTimeout(newTimeout);
  };

  const handleEndReached = () => {
    if (lastVisible && !loading) {
      fetchRecipes(10, lastVisible, search);
    }
  };

  const handleDeleteRecipe = async (result: boolean) => {
    if (result && deletedItemId !== undefined) {
      
      if (await deleteRecipe(deletedItemId)) {
        ToastUtil.showToast(Strings.translate('deleteRecipe'), Toast.durations.SHORT);
        setUpdatedList(!updatedList);
      }
      
      else {
        ToastUtil.showToast(Strings.translate('deleteRecipeError'), Toast.durations.SHORT);
      }
      
    }
    
    setDeleteRecipeDialog(false);
  };

  // useEffect solo para inicialización
  useEffect(() => {
    fetchRecipes(20, null, ''); // No establecer dependencias aquí para evitar bucles infinitos
  }, []); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
      {userId && isRecipesIdsNotEmpty && (
        <Searchbar
          inputStyle={{alignSelf: 'center'}}
          style={styles.searchbar}
          placeholder={Strings.t('search') + '...'}
          onChangeText={handleSearch}
          value={search}
        />
        )}

      {!userId && (
        <Searchbar
        inputStyle={{alignSelf: 'center'}}
        style={styles.searchbar}
        placeholder={Strings.t('search') + '...'}
        onChangeText={handleSearch}
        value={search}
      />

      )}
      </View>


      {userId && isRecipesIdsNotEmpty && (
        <>
        <FlatList
        style={styles.recipesContainer}
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} userId={userId} onDelete={(recipeId: string) => {setDeletedItemId(recipeId), setDeleteRecipeDialog(true)}} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipesContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        />

        <ConfirmationDialog text={Strings.translate('deleteRecipeConfirmationDialog')} 
        isVisible={deleteRecipeDialog} onClose={handleDeleteRecipe}/>
        </>
      )}

      {!userId && (
        <FlatList
        style={styles.recipesContainer}
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} userId={''} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipesContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        />
      )}

      {userId && !isRecipesIdsNotEmpty && (
        <View style={styles.noRecipesTextContainer}>
          <Text style={styles.noRecipesText}>{Strings.translate('noRecipes')} </Text>
        </View>
      )}

      {userId && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {navigation.navigate('AddRecipeForm1' as never)}}
        >
          <Iconify icon="gala:add" size={33} color={Colors.primary} />
        </TouchableOpacity>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  searchBarContainer: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
  },

  searchbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: Colors.terciary,
    borderColor: Colors.gray,
    borderWidth: 1
  },

  recipesContainer: {
    flexGrow: 1,
    paddingTop: 10
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

  noRecipesTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noRecipesText: {
    fontSize: 20,
    color: Colors.black, // Puedes ajustar el color según tus preferencias
  },

  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
});

export default SearchScreen;