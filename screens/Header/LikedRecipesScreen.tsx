import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import RecipeItem from '../../components/Recipe';
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import Recipe from '../../model/Recipe';
import { getRecipesById } from '../../repository/FirebaseRecipes';
import { getCurrentUser } from "../../repository/FirebaseUser";

const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 24;

//@ts-ignore
const LikedRecipesScreen = ({ navigation }) => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [likedRecipesIds, setLikedRecipesIds] = useState<string[]>([]);
  const [lastVisible, setLastVisible] = useState<Recipe|null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const Strings = useContext(LanguageContext);
  const pageSize = 10;
  const onFocus = useIsFocused();
  
  useEffect(() => {
    const getRecipes = async () => {
      const user = await getCurrentUser();
      setLikedRecipesIds(user!!.likedRecipes);
      setRecipes([]);
      fetchRecipes(user!!.likedRecipes, lastVisible, pageSize);
    };

    getRecipes();
  }, [onFocus]);


  const fetchRecipes = useCallback(async (recipesIds: string[], lastVisibleRef: Recipe | null, pageSize: number, ) => {
    try {
      setLoading(true);
      const {recipes, lastVisible} = await getRecipesById(recipesIds, lastVisibleRef, pageSize);
      setLastVisible(lastVisible);
      
        setRecipes((prevRecipes) => {
          const uniqueRecipes = recipes.filter((newRecipe) => !prevRecipes.some((prevRecipe) => prevRecipe.id === newRecipe.id));
          return [...prevRecipes, ...uniqueRecipes];
        });
      

    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  

  const handleEndReached = () => {
    fetchRecipes(likedRecipesIds, lastVisible, pageSize)
  }

  return (
    <View style={styles.likedRecipesScreen}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingHorizontal: 10}}>
        <Iconify icon="lets-icons:back" size={33} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{Strings.translate('favouriteRecipes').toUpperCase()}</Text>
    
      <FlatList
        data={recipes}
        renderItem={({ item, index }) => (
          <RecipeItem recipe={item} userId={''}/>
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        keyExtractor={(item) => item.id}
        numColumns={2}
        />

      {recipes.length <= 0 && (
        <View style={styles.noRecipes}>
          <Text style={styles.title}>{Strings.translate('noRecipes')} :(</Text>
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
  
  likedRecipesScreen: {
    paddingHorizontal: 5, 
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: Colors.background,
  },

  title: {
    alignSelf: 'center',
    fontSize: adjustedFontSize,
    paddingBottom: 50,
    fontWeight: '400'
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
  }

  
});

export default LikedRecipesScreen;
