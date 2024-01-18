import React, { useState, useCallback, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";
import { Searchbar } from 'react-native-paper';
import { getAllRecipes } from "../repository/FirebaseRecipes";
import RecipeItem from "../components/Recipe";
import Recipe from "../model/Recipe";
import { Strings } from "../constants/Strings";

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastVisible, setLastVisible] = useState<Recipe | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [previousSearch, setPreviousSearch] = useState<string>('');

  const fetchRecipes = useCallback(async (pageSize: number, lastVisibleRef: Recipe | null, query: string) => {
    try {
      setLoading(true);

      const recipesData = await getAllRecipes(pageSize, lastVisibleRef, query);

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

  // useEffect solo para inicialización
  useEffect(() => {
    fetchRecipes(20, null, ''); // No establecer dependencias aquí para evitar bucles infinitos
  }, []); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          style={styles.searchbar}
          placeholder={Strings.t('search') + '...'}
          onChangeText={handleSearch}
          value={search}
        />
      </View>

      <FlatList
        style={styles.recipesContainer}
        data={recipes}
        renderItem={({ item }) => <RecipeItem recipe={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipesContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />

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
});

export default SearchScreen;