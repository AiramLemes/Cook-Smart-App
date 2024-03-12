import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';
import Recipe from '../model/Recipe';
import Dificulty from '../components/Dificulty';
import IngredientItem from '../components/IngredientItem';
import { translateIngredientsToEnglish, translateRecipe } from '../services/TransaltionService';
import { Strings } from '../constants/Strings';
import { auth } from '../firebaseConfig';
import { handleRecipeLike } from '../repository/FirebaseRecipes';
import { getUserNameById } from '../repository/FirebaseUser';
import StarsPicker from '../components/StarsPicker';

//@ts-ignore
const RecipeScreen = ({ navigation, route }) => {
  const recipe: Recipe = route.params;
  const userId = auth.currentUser!!.uid;
  const editable = recipe.userId === userId;

  const [renderRecipe, setRenderRecipe] = useState(recipe);
  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | undefined>();

  const [isAiRecipe, setIsAiRecipe] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {  
      setUserName(await getUserNameById(recipe.userId)); 
      if (recipe.lang != Strings.locale) {
        setLoading(true);
        try {
          const translatedRecipe = await translateRecipe(recipe.lang, recipe);
          setRenderRecipe(translatedRecipe);
        
        } catch (error) {
          console.error('Error translating:', error);
        }
        setLoading(false);
      }
  
    };

  
    fetchData(); 
    setLiked(recipe.likedUsersId.includes(userId));

    setIsAiRecipe(recipe.userId === 'chat-gpt');

  }, []); 


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>{Strings.t('translating')}</Text>
      </View>
    );
  }

  const handleLike = async () => {

    const likedUsersId = await handleRecipeLike(userId, recipe.id);
    if (likedUsersId) setLiked(likedUsersId.includes(userId));

  }

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'recipeTitle':
        return (
          <View style={styles.recipeTitle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Iconify icon="lets-icons:back" size={33} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>{renderRecipe.title}</Text>
            {!editable && (
              <TouchableOpacity onPress={handleLike}>
                {liked ? (
                  <Iconify icon="mdi:favourite" size={33} color="red" />
                ) : (
                  <Iconify icon="mdi:favourite-border" size={33} color="red" />
                )}
              </TouchableOpacity>
            )}
            {editable && (
              <TouchableOpacity onPress={() => navigation.navigate('AddRecipeForm1', recipe)}>
                <Iconify icon="iconamoon:edit" size={33} color="black" />
              </TouchableOpacity>
            )}
          </View>
        );
      case 'userName':
        return <Text style={styles.userName}>@{userName}</Text>;
      case 'imagesList':
        return (
          <>
          <FlatList
            horizontal
            style={styles.imagesList}
            data={renderRecipe.images}
            renderItem={({ item: image }) => <Image source={{ uri: image }} style={styles.images} />}
            keyExtractor={(image) => image}
          />

          {isAiRecipe && (   
            <Image src={recipe.mainImage} style={styles.aiImage}/>
           )}
     
           {!isAiRecipe && (
             <StarsPicker recipe={recipe}></StarsPicker>
           )}
           </>
        );
      case 'preparation':
        return (
          <>
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
                <Text style={styles.personText}>{ recipe.servings + ' ' + (recipe.servings > 1 ? Strings.t('servings') : Strings.t('serving'))}</Text>
                <Iconify icon="pepicons-pencil:people" size={30} color="black" />
              </View>
            </View>
  
            <FlatList
              data={renderRecipe.ingredients}
              renderItem={({ item, index }) => (
                <IngredientItem ingredient={item} size={30}/>
              )}
              keyExtractor={(item, index) => item.name}
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
          </>

        );
      default:
        return null;
    }
  };

  const sections = [
    { type: 'recipeTitle', key: 'recipeTitle' },
    { type: 'userName', key: 'userName' },
    { type: 'imagesList', key: 'imagesList' },
    { type: 'preparation', key: 'preparation' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>{Strings.t('translating')}</Text>
      </View>
    );
  }

  return <FlatList data={sections} renderItem={renderItem} keyExtractor={(item) => item.key} contentContainerStyle={styles.container} />;
};
  


const styles = StyleSheet.create({
  container: {
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
    margin: 20,
    marginTop: 10,
    alignSelf: 'center'
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
    flexGrow: 1,
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
    backgroundColor: Colors.lightGray,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    textAlignVertical: 'center',
    alignItems: 'center',
    marginBottom: 25
  },

  preparationItemIcon: {
    width: '13%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9
  },

  preparationItemText: {
    textAlignVertical: 'center',
    fontSize: 15,
    marginLeft: 10,
    
  },

  preparationItemDuration: {
    textAlignVertical: 'center',
    fontSize: 15,
    position: 'absolute',
    right: 25,
  },

  stepsSection: {
    flexGrow: 1,
    width: '98%',
    backgroundColor: Colors.lightGray,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingBottom: 50
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

  userName: {
    textAlign: 'center',
    textDecorationLine: 'underline'
  },

  aiImage: {
    width: '80%',
    height: '10%',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    alignSelf: 'center',
    objectFit: 'contain',
    margin: 20,
  }


});

export default RecipeScreen;