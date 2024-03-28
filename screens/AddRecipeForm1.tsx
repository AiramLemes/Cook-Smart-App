import * as ImagePicker from 'expo-image-picker';
import { Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-root-toast';
import DificultySelector from '../components/DifficultySelector';
import IngredientPicker from '../components/IngredientPicker';
import Servings from '../components/Servings';
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';
import Ingredient from '../model/Ingredient';
import Recipe from '../model/Recipe';
import { translateText } from '../services/TransaltionService';
import ToastUtil from '../utils/ToastUtil';

//@ts-ignore
const AddRecipeForm1 = ({ navigation, route }) => {

  const editableRecipe: Recipe = route.params;

  useEffect(() => {
    if (editableRecipe) {
      setImagesList(imagesList.concat(editableRecipe.images));
      setTitle(editableRecipe.title)
    }
  }, []);

  
  const [imagesList, setImagesList] = useState(['']);
  const [title, setTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>();
  const [servings, setServings] = useState<number>(1);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  
  const [titleError, setTitleError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [difficultyError, setDifficultyError] = useState<boolean>(false);

  const Strings = useContext(LanguageContext);
  
  
  const addImage = (uri: string) => {
    setImagesList([...imagesList, uri]);
  };
  
  

  const addImagePicker = () => {
    return (
      <View style={styles.images}>
        <TouchableOpacity onPress={pickImage}>
          <Iconify style={{alignSelf: 'center'}} icon="gala:add" size={45} color="black" />
        </TouchableOpacity>
        {imageError && (
          <Text style={styles.errorMessage}>{Strings.translate('recipeForm1ImageError')}</Text>
        )}
      </View>
    );
  }


  const addImageItem = (uri: string, index: number) => {
    return (
      <View>
        <Image source={{ uri: uri }} style={styles.images}/>
        <TouchableOpacity style={styles.deleteIcon} onPress={() => {removeImage(index)}}>
          <Iconify icon="streamline:delete-1-solid" size={18} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    );
  }

  const removeImage = (index: number) => {
    const updatedImageList = [...imagesList];
    updatedImageList.splice(index, 1);
    setImagesList(updatedImageList);
  
  }



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const uri: string = result.assets[0].uri;
      addImage(uri);
      setImageError(false);
    }
  };

  const isTitleValid = () => {

    if (title == '') {
      setTitleError(true);
      return false;
    }

    setTitleError(false);
    return true;
  }


  const isImageListValid = () => {
    if (imagesList.length <= 1) {
      setImageError(true);
      return false;
    }
    setImageError(false);
    return true;
  }

  const isIngredientsValid = () => {
    if (ingredients.length <= 0) {
      ToastUtil.showToast(Strings.translate('recipeForm1EmptyIngredients'), Toast.durations.SHORT); 
      return false;
    }
    return true;
  }

  const isDifficultyValid = () => {
    if (!difficulty) {
      setDifficultyError(true);
      // ToastUtil.showToast('Fill all the fields', Toast.durations.SHORT); 
      return false;
    }
    setDifficultyError(false);
    return true;
  }
  
  const validateForms = () => {

    const imagesResult = isImageListValid();
    const titleResult = isTitleValid();
    const ingredientsResult = isIngredientsValid();
    const difficultyResult = isDifficultyValid();
  

    const areFormsValid = imagesResult && titleResult && ingredientsResult && difficultyResult;
    
    
    if (areFormsValid) {

      const images = [...imagesList];
      images.splice(0, 1)
      

      ingredients.forEach(async ingredient => {
        ingredient.englishVersion = await translateText(Strings.locale, ingredient.name, true);
      });

      const recipe: Recipe = {
        title: title,
        mainImage: '', //images[0],
        assessment: editableRecipe ? editableRecipe.assessment : 0,
        id: editableRecipe ? editableRecipe.id : '',
        images: images,
        ingredients: ingredients,
        steps: editableRecipe ? editableRecipe.steps : [],
        lang: Strings.locale,
        preparation: editableRecipe ? editableRecipe.preparation : '',
        cooking: editableRecipe ? editableRecipe.cooking : '',
        rest: editableRecipe ? editableRecipe.rest : '',
        servings: servings,
        difficulty: difficulty!!,
        category: editableRecipe ? editableRecipe.category : '',
        userId: editableRecipe ? editableRecipe.userId : '',
        timestamp: editableRecipe ? editableRecipe.timestamp : new Timestamp(0, 0),
        numberOfRatings: 0,
        totalRating: 0,
      }
      // console.log('Ingredientes: ', ingredientsList)
      navigation.navigate('AddRecipeForm2', {recipe: recipe, editable: editableRecipe? true: false});
    }
  }


  const contentUp = () => {
    return (
      <>
      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        {/* <Text style={styles.title}>{renderRecipe.title}</Text> */}

        <TouchableOpacity style={{flexDirection: 'row'}} onPress={validateForms}>
          <Text style={styles.text}>{Strings.translate('next')}</Text>
          <Iconify icon="carbon:next-outline" size={33} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <TextInput placeholder={Strings.translate('recipeTitle')} value={title} onChangeText={setTitle} style={styles.title}></TextInput>
        <Iconify icon="iconamoon:edit" size={15} color="black" />
      </View>
      
      {titleError && (
        <Text style={styles.errorMessage}>{Strings.translate('recipeForm1EmptyTitle')}}</Text>
      )}
        
      <FlatList
        horizontal
        style={styles.imagesList}
        data={imagesList} // Utiliza el estado como fuente de datos
        renderItem={({ item, index }) =>  item == '' ? addImagePicker() : addImageItem(item, index)}
        keyExtractor={(item) => item.toString()}
      />
      </>
    );
  };


  const contentDown = () => {
    return (
      <>
      
      <View style={{marginBottom: 20}}>

        {!editableRecipe && (
          <DificultySelector size={20} onChange={setDifficulty} error={difficultyError}/>
        )}

        {editableRecipe && (
          <DificultySelector size={20} initialValue={editableRecipe.difficulty} onChange={setDifficulty} error={difficultyError}/>
        )}
      </View>

      <View style={{marginBottom: 20}}>

        {!editableRecipe && (
          <Servings onChange={setServings}/>
        )}

        {editableRecipe && (
          <Servings initialValue={editableRecipe.servings} onChange={setServings}/>
        )}
      </View>

      <View>
        {!editableRecipe && (
          <IngredientPicker onChange={setIngredients}/>
        )}

        {editableRecipe && (
          <IngredientPicker initialValue={editableRecipe.ingredients} onChange={setIngredients}/>
        )}
      </View>
      
      </>
    );
  };



 
  return (

    <FlatList
      data={[{ key: 'up' }, { key: 'down' }]}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        item.key === 'up' ?
          contentUp()
        :
          contentDown()       
      )}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    flexGrow:1 
  },

  recipeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    marginBottom: 20
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  errorMessage: {
    fontSize: 10,
    color: Colors.error,
    textAlign: 'center'
  },


  title: {
    textAlign: 'center',
    fontSize: 20,
    
  },

  imagesList: {
    paddingTop: 10,
    alignSelf: 'center',
    paddingBottom: 10
  },
  

  images: {
    // width: '40%',
    width: 150,
    height: 220,
    margin: 10, // Espaciado entre imágenes
    borderColor: Colors.primary,
    borderRadius: 20,
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center'
  },


  text: {
    textAlign: 'center',
    fontSize: 17,
    alignSelf: 'center',
    marginRight: 10,
    textDecorationLine: 'underline',
    color: Colors.primary
  },

  deleteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
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

export default AddRecipeForm1;
