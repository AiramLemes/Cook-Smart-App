import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';
import Recipe from '../model/Recipe';
import Dificulty from '../components/Dificulty';
import IngredientItem from '../components/IngredientItem';
import { translateIngredientsToEnglish, translateRecipe } from '../services/TransaltionService';
import { Strings } from '../constants/Strings';

//@ts-ignore
const RecipeScreen = ({ navigation, route }) => {
  const recipe: Recipe = route.params;

  const [renderRecipe, setRenderRecipe] = useState(recipe);
  const [loading, setLoading] = useState(false);
  const [translatedIngredientsToEnglish, setTranslatedIngredientsToEnglish] = useState(recipe.ingredients);
  const [steps, setSteps] = useState('');
  useEffect(() => {
    const fetchData = async () => {  
      if (recipe.lang != Strings.locale) {
        setLoading(true);
        try {
          const translatedRecipe = await translateRecipe(recipe.lang, recipe);
          setRenderRecipe(translatedRecipe);
          const translatedIngredients = await translateIngredientsToEnglish(recipe.lang, recipe.ingredients);
          setTranslatedIngredientsToEnglish(translatedIngredients);
          // console.log('trad: ', translation); 
          // const recipe1 = translation;
        } catch (error) {
          console.error('Error al traducir:', error);
        }
        setLoading(false);
      }
    
      else if (recipe.lang != 'en-US') {
        const translatedIngredients = await translateIngredientsToEnglish(recipe.lang, recipe.ingredients);
        setTranslatedIngredientsToEnglish(translatedIngredients);
      }

    };

  
    fetchData(); 
  }, []); 


  // let ingredients = [
  //   'milk', 'chicken', 'beef', 'pork', 'rice', 'pasta', 'lettuce', 'cucumber',
  //   'onion', 'garlic', 'potato', 'sweetpotato', 'spinach', 'cauliflower', 'asparagus',
  //   'peas', 'corn', 'strawberry', 'orange', 'lemon', 'lime', 'blueberry', 'raspberry',
  //   'cherry', 'watermelon', 'melon', 'kiwi', 'pineapple', 'mango', 'avocado', 'olive',
  //   'almond', 'peanut', 'salmon', 'tuna', 'shrimp', 'crab', 'lobster', 'oyster',
  //   'clam', 'scallops', 'octopus', 'squid', 'turkey', 'duck', 'lamb', 'rabbit', 'snail',
  //   'tofu', 'soymilk', 'quinoa', 'water'
  // ];

  // const ingredients = [
  //   'banana', 'cumin', 'coriander', 'turmeric', 'paprika', 'cinnamon', 'ginger',
  //   'garlicpowder', 'onionpowder', 'blackpepper', 'oregano', 'thyme',
  //   'rosemary', 'basil', 'parsley', 'cilantro', 'dill', 'cayenne',
  //   'mustard', 'nutmeg', 'pumpkinspice', 'vanilla', 'saffron',
  //   'cloves', 'cardamom', 'fennel', 'caraway', 'allspice', 'bayleaf',
  //   'chilipowder', 'currypowder', 'whitepepper', 'turmeric', 'smokedpaprika',
  //   'sumac', 'tarragon', 'sage', 'juniper', 'anise', 'marjoram',
  //   'fenugreek', 'poppyseed', 'sesameseed', 'lavender', 'wasabi', 'sichuanpepper',
  //   'chervil', 'lovage', 'savory', 'thaispice', 'garammasala', 'celeryseed', 'quinoa', 'yeast',
  //   'milk', 'chicken', 'beef', 'pork', 'rice', 'pasta', 'lettuce', 'cucumber', 'onion', 'garlic',
  //   'potato', 'sweetpotato', 'spinach', 'cauliflower', 'asparagus', 'peas', 'corn', 'strawberry',
  //   'orange', 'lemon', 'lime', 'blueberry', 'raspberry', 'cherry', 'watermelon', 'melon', 'kiwi',
  //   'pineapple', 'mango', 'avocado', 'olive', 'almond', 'peanut', 'salmon', 'tuna', 'shrimp', 'crab',
  //   'lobster', 'oyster', 'clam', 'scallops', 'octopus', 'squid', 'turkey', 'duck', 'lamb', 'rabbit',
  //   'snail', 'tofu', 'soymilk', 'salt', 'sugar', 'pepper', 'oil', 'wine', 'vinegar', 'cheese', 'tomato',
  //   'egg', 'flour', 'yogurt', 'coffee', 'water', 'beans', 'carrot', 'broccoli', 'greenbean', 'eggplant',
  //   'mushroom', 'pepperoni', 'sausage', 'bacon', 'mayo', 'mustard', 'ketchup', 'pickles', 'soysauce',
  //   'honey', 'jalapeno', 'salsa', 'guacamole', 'sourcream'
  // ];



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>{Strings.t('translating')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>{renderRecipe.title}</Text>

        <TouchableOpacity>
          <Iconify icon="mdi:favourite-border" size={33} color="red" />
        </TouchableOpacity>
      </View>


      <View style={styles.scrollViewContent}>
        <FlatList
          horizontal
          style={styles.imagesList}
          data={renderRecipe.images}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.images} />}
          keyExtractor={(item) => item}
        />


        <View style={styles.preparation}>
          <View style={styles.preparationGeneralInfo}>
            <Text>{Strings.t('preparation')}</Text>
            <View style={styles.preparationPeopleInfo}>
              <Dificulty dificulty={recipe.difficulty} size={25}/>
            </View>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="ri:knife-line" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>{Strings.t('preparation')}</Text>
            <Text style={styles.preparationItemDuration}>{recipe.preparation}</Text>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="mdi:pot-mix-outline" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>{Strings.t('cooking')}</Text>
            <Text style={styles.preparationItemDuration}>{recipe.cooking}</Text>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="carbon:smoke" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>{Strings.t('rest')}</Text>
            <Text style={styles.preparationItemDuration}>{recipe.rest}</Text>
          </View>

        </View>
        
        <View style={styles.preparation}>
          <View style={styles.preparationGeneralInfo}>
            <Text>{Strings.t('ingredients')}</Text>
            <View style={styles.preparationPeopleInfo}>
              <Text style={styles.personText}>{ recipe.serving + ' ' + (recipe.serving > 1 ? Strings.t('servings') : Strings.t('serving'))}</Text>
              <Iconify icon="pepicons-pencil:people" size={30} color="black" />
            </View>
          </View>

          <FlatList
            data={renderRecipe.ingredients}
            renderItem={({ item, index }) => (
              <IngredientItem name={item} size={30} englishVersion={translatedIngredientsToEnglish[index]}/>
            )}
            keyExtractor={(item) => item}
          />
        </View>

        <View style={styles.preparation}>
          <View style={styles.preparationGeneralInfo}>
            <Text>{Strings.t('steps')}</Text>
          </View>

          <View style={styles.stepsSection}>
            <Text style={styles.stepsText}>{renderRecipe.steps.map((item, index) => `${index + 1}.- ${item}\n\n`).join('')}</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollViewContent: {
    width: '97%',
  },

  recipeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10, 
    paddingTop: 20,
  },


  title: {
    textAlign: 'center',
    fontSize: 20,
  },

  imagesList: {
    paddingTop: 10,
    margin: 20
  },
  

  images: {
    // width: '40%',
    width: 150,
    height: 220,
    // margin: 5, // Espaciado entre imágenes
    borderColor: Colors.primary,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15
  },

  preparation: {
    margin: 20,
  },

  preparationGeneralInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 20
  },

  preparationPeopleInfo: {
    flexDirection: 'row',
    alignItems: 'center', 
  },

  personText: {
    marginRight: 10, 
  },

  preparationItem: {
    width: '98%',
    height: 36,
    backgroundColor: '#FBF8F8',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 25
  },

  preparationItemIcon: {
    width: '13 %',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9
  },

  preparationItemText: {
    textAlignVertical: 'center',
    fontSize: 15,
    marginLeft: 10
  },

  preparationItemDuration: {
    textAlignVertical: 'center',
    fontSize: 15,
    position: 'absolute',
    right: 25,
    top: '20%'
  },

  stepsSection: {
    width: '98%',
    minHeight: 40,
    backgroundColor: '#FBF8F8',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 25
  },

  stepsText: {
    padding: 20,
    textAlign: 'justify'
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary,
  },


});

export default RecipeScreen;
