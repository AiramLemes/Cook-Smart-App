import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';
import * as ImagePicker from 'expo-image-picker';
import DificultySelector from '../components/DifficultySelector';
import Servings from '../components/Servings';
import IngredientPicker from '../components/IngredientPicker';
import Recipe from '../model/Recipe';
import ToastUtil from '../utils/ToastUtil';
import Toast from 'react-native-root-toast';

//@ts-ignore
const AddRecipeForm1 = ({ navigation }) => {

  const [imagesList, setImagesList] = useState(['']);
  const [title, setTitle] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>();
  const [servings, setServings] = useState<number>();
  const [ingredients, setIngredients] = useState<[string]>([]);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [difficultyError, setDifficultyError] = useState<boolean>(false);
  


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
          <Text style={styles.errorMessage}>You must upload at least 1 image</Text>
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
      ToastUtil.showToast('The ingredients list can not be empty!', Toast.durations.SHORT); 
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

      const recipe: Recipe = {
        title: title,
        mainImage: '', //images[0],
        assessment: 0,
        id: '',
        images: images,
        ingredients: ingredients,
        steps: [],
        lang: '',
        preparation: '',
        cooking: '',
        rest: '',
        serving: servings!!,
        difficulty: difficulty!!,
        category: ''
      }
  
      navigation.navigate('AddRecipeForm2', recipe);
    }
  }
 
  return (
    <ScrollView style={styles.container}>

      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        {/* <Text style={styles.title}>{renderRecipe.title}</Text> */}

        <TouchableOpacity style={{flexDirection: 'row'}} onPress={validateForms}>
          <Text style={styles.text}>Next</Text>
          <Iconify icon="carbon:next-outline" size={33} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <TextInput placeholder='TITULO RECETA' value={title} onChangeText={setTitle} style={styles.title}></TextInput>
        <Iconify icon="iconamoon:edit" size={15} color="black" />
      </View>
        {titleError && (
          <Text style={styles.errorMessage}>Title can't be empty</Text>
        )}
        
    
      
      <FlatList
        horizontal
        style={styles.imagesList}
        data={imagesList} // Utiliza el estado como fuente de datos
        renderItem={({ item, index }) =>  item == '' ? addImagePicker() : addImageItem(item, index)}
        keyExtractor={(item) => item.toString()}
      />
      
      <View style={{marginBottom: 20}}>
        <DificultySelector size={20} onChange={setDifficulty} error={difficultyError}/>
      </View>

      <View style={{marginBottom: 20}}>
        <Servings onChange={setServings}/>
      </View>

      <View>
        <IngredientPicker onChange={setIngredients}/>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: '3%'
  },

  scrollViewContent: {
    width: '97%',
  },

  recipeTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
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
    alignSelf: 'center'
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
