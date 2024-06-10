import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Dificulty from '../components/Dificulty';
import IngredientItem from '../components/IngredientItem';
import StarsPicker from '../components/StarsPicker';
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';
import { auth } from '../firebaseConfig';
import Recipe from '../model/Recipe';
import { addIngredientsToShoppingList, addOrRemoveLikedRecipe, getCurrentUser, getUserNameById } from '../repository/FirebaseUser';
import { translateRecipe } from '../repository/services/TransaltionService';
import { consumeIngredients } from '../repository/FirebasePantry';
import ConfirmationDialog from '../components/Dialogs/ConfirmationDialog';
import ToastUtil from '../utils/ToastUtil';
import Toast from 'react-native-root-toast';
import Ingredient from '../model/Ingredient';
import TextInputDialog from '../components/Dialogs/TextInputDialog';
import { modifyRecipe } from '../repository/services/Openai';
import LottieView from 'lottie-react-native';


const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 28;

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


  const [outOfStockIngredients, setOutOfStockIngredients] = useState<Ingredient[]>();
  const [missingIngredients, setMissingIngredients] = useState<Ingredient[]>();

  const [missingIngredientsDialogVisibility, setMissingIngredientsDialogVisibility] = useState<boolean>(false);
  const [outOfStockIngredientsDialogVisibility, setOutOfStockIngredientsDialogVisibility] = useState<boolean>(false);
  const [modifyRecipeDialogVisibility, setModifyRecipeDialogVisibility] = useState<boolean>(false);
  const [modifyingRecipe, setModifyingRecipe] = useState<boolean>(false);


  const Strings = useContext(LanguageContext);

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

    const getUserLikedRecipes = async () => {
      const user = await getCurrentUser();

      user?.likedRecipes.find((recipeId) => recipeId === recipe.id ? setLiked(true) : '');

    }


    fetchData();
    getUserLikedRecipes();
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
    setLiked(!liked);
    await addOrRemoveLikedRecipe(recipe.id);
  };


  const handleCloseDialog = async (accepted: boolean, index: number) => {

    if (accepted) {
      if (index == 0) {
        setOutOfStockIngredientsDialogVisibility(false);
        if (await addIngredientsToShoppingList(outOfStockIngredients!!)) {
          ToastUtil.showToast(Strings.t('addIngredientsSuccessfulMessage'), Toast.durations.SHORT);
        }
        setMissingIngredientsDialogVisibility(true);
      }

      else {
        setMissingIngredientsDialogVisibility(false);
        if (await addIngredientsToShoppingList(missingIngredients!!)) {
          ToastUtil.showToast(Strings.t('addIngredientsSuccessfulMessage'), Toast.durations.SHORT);
        }
      }
    }
    else {
      if (index == 0) {
        setOutOfStockIngredientsDialogVisibility(false);
        setMissingIngredientsDialogVisibility(true);
      }

      else {
        setMissingIngredientsDialogVisibility(false);
      }
    }

  };


  const handleConsumeIngredients = async () => {
    const reducedPantryIngredients = await consumeIngredients(renderRecipe.ingredients);
    setOutOfStockIngredients(reducedPantryIngredients.exhaustedIngredients);
    setMissingIngredients(reducedPantryIngredients.missingIngredients);
    if (reducedPantryIngredients.exhaustedIngredients.length >= 1) {
      setOutOfStockIngredientsDialogVisibility(true);
    } else {
      setMissingIngredientsDialogVisibility(true);
    }
  };


  const handleModifyRecipe = async (result: boolean, text?: string) => {
    if (result) {
      if (text) {
        setModifyingRecipe(true);
        const modifiedRecipe = await modifyRecipe(renderRecipe, text);
        if (modifiedRecipe) {
          navigation.push('Recipe', modifiedRecipe);
        }
        else {
          ToastUtil.showToast(Strings.t('iaRecipeError'), Toast.durations.SHORT);
        }
        setModifyingRecipe(false);
      }
    }
    setModifyRecipeDialogVisibility(false);
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
            {!isAiRecipe && (
              <>
                <FlatList
                  horizontal
                  style={styles.imagesList}
                  data={renderRecipe.images}
                  renderItem={({ item: image }) => <Image source={{ uri: image }} style={styles.images} />}
                  keyExtractor={(image) => image}
                />

                <StarsPicker recipe={recipe}></StarsPicker>

              </>
            )}

            {isAiRecipe && (
              <Image src={renderRecipe.mainImage} style={styles.aiImage}/>
            )}

            <View style={styles.recipeOptions}>

              <TouchableOpacity style={styles.recipeButton} onPress={handleConsumeIngredients}>
                <Text style={styles.recipeButtonText}>{Strings.translate('prepareRecipe')}</Text>
                <View style={{alignSelf: 'center'}}>
                  <Iconify icon="lucide:cooking-pot" size={20} color="black" />
                </View>
              </TouchableOpacity>
              
          
              <TouchableOpacity style={styles.recipeButton} onPress={() => {setModifyRecipeDialogVisibility(true)}}>
                <Text style={styles.recipeButtonText}>{Strings.t('modify')}</Text>
                <View style={{alignSelf: 'center'}}>
                  <Iconify icon="ci:edit-pencil-line-01" size={20} color="black" />
                </View>
              </TouchableOpacity>
            
            </View>
          </>
        );
      case 'preparation':
        return (
          <>
          <View style={styles.preparation}>
            <View style={styles.preparationGeneralInfo}>
              <Text>{Strings.t('preparation')}</Text>
              <View style={styles.preparationPeopleInfo}>
                <Dificulty dificulty={renderRecipe.difficulty} size={25}/>
              </View>
            </View>

            <View style={styles.preparationItem}>
              <View style={styles.preparationItemIcon}>
                <Iconify icon="ri:knife-line" style={{alignSelf: 'center'}} size={30} color="black" />
              </View>
              <Text style={styles.preparationItemText}>{Strings.t('preparation')}</Text>
              <Text style={styles.preparationItemDuration}>{renderRecipe.preparation.amount + '   ' + renderRecipe.preparation.unit}</Text>
            </View>

            <View style={styles.preparationItem}>
              <View style={styles.preparationItemIcon}>
                <Iconify icon="mdi:pot-mix-outline" style={{alignSelf: 'center'}} size={30} color="black" />
              </View>
              <Text style={styles.preparationItemText}>{Strings.t('cooking')}</Text>
              <Text style={styles.preparationItemDuration}>{renderRecipe.cooking.amount + '   ' + renderRecipe.cooking.unit}</Text>
            </View>

            <View style={styles.preparationItem}>
              <View style={styles.preparationItemIcon}>
                <Iconify icon="carbon:smoke" style={{alignSelf: 'center'}} size={30} color="black" />
              </View>
              <Text style={styles.preparationItemText}>{Strings.t('rest')}</Text>
              <Text style={styles.preparationItemDuration}>{renderRecipe.rest.amount + '   ' + renderRecipe.rest.unit}</Text>
            </View>

          </View>

          <View style={styles.preparation}>
            <View style={styles.preparationGeneralInfo}>
              <Text>{Strings.t('ingredients')}</Text>
              <View style={styles.preparationPeopleInfo}>
                <Text style={styles.personText}>{ renderRecipe.servings + ' ' + (renderRecipe.servings > 1 ? Strings.t('servings') : Strings.t('serving'))}</Text>
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



  return (
    <>
    {!modifyingRecipe && (

      <>
        <FlatList data={sections} renderItem={renderItem} keyExtractor={(item) => item.key} contentContainerStyle={styles.container}/>
  
        <ConfirmationDialog text={Strings.t('addOutOfStockIngredients')}
          isVisible={outOfStockIngredientsDialogVisibility} onClose={(result: boolean) => {handleCloseDialog(result, 0)}}/>
                  
        <ConfirmationDialog text={Strings.t('addMissingIngredients')}
          isVisible={missingIngredientsDialogVisibility} onClose={(result: boolean) => {handleCloseDialog(result, 1)}}/>
  
        <TextInputDialog text={"Hola! Soy ChefGPT, si quieres modificar algo de la receta solo tienes que decirmelo! "} 
          isVisible={modifyRecipeDialogVisibility} onClose={(result: boolean, text: string) => {handleModifyRecipe(result, text)}}/> 
      </>
    )}
  
    {modifyingRecipe && (
      <View style={{width: '100%', height: '100%', justifyContent: 'center', backgroundColor: Colors.background}}>
        <LottieView source={require('../assets/Cooking Animation.json')}
        style={{height: '30%', width: '100%'}}
        autoPlay/>
        <Text style={styles.modifyingRecipeText}>{Strings.translate('iaAnimationText')}</Text>
      </View>
    )}
  </>
  )
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingHorizontal: 10
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
    maxWidth: '80%'
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
    height: 140,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    alignSelf: 'center',
    objectFit: 'contain',
    margin: 20,
  },

  recipeOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'space-between'
  },

  recipeButtonText: {
    fontSize: adjustedFontSize,
    textAlign: 'center',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    marginRight: 10
  },

  recipeButton: {
    width: 150,
    paddingHorizontal: 20, 
    height: 30,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
  },
  
  modifyingRecipeText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: adjustedFontSize
  }


});

export default RecipeScreen;