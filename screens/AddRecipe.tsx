import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';
import * as ImagePicker from 'expo-image-picker';
import DificultySelector from '../components/DifficultySelector';
import Servings from '../components/Servings';
import IngredientPicker from '../components/IngredientPicker';

//@ts-ignore
const AddRecipe = ({ navigation }) => {

  const [imagesList, setImagesList] = useState(['']);

  const addImage = (uri: string) => {
    setImagesList([...imagesList, uri]);
  };

  const addImageItem = () => {
    return (
      <View style={styles.images}>
        <TouchableOpacity onPress={pickImage}>
          <Iconify style={{alignSelf: 'center'}} icon="gala:add" size={45} color="black" />
        </TouchableOpacity>
      </View>
    );
  }


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const uri: string = result.assets[0].uri;
      addImage(uri);
      
    }
  };
 
  return (
    <ScrollView style={styles.container}>

      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        {/* <Text style={styles.title}>{renderRecipe.title}</Text> */}

        <TouchableOpacity>
          <Iconify icon="mdi:tick-circle-outline" size={33} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <TextInput placeholder='TITULO RECETA' style={styles.title}></TextInput>
        <Iconify icon="iconamoon:edit" size={15} color="black" />
      </View>

      <FlatList
        horizontal
        style={styles.imagesList}
        data={imagesList} // Utiliza el estado como fuente de datos
        renderItem={({ item }) =>  item == '' ? addImageItem() : <Image source={{ uri: item }} style={styles.images}/>}
        keyExtractor={(item) => item.toString()}
      />

      <DificultySelector size={20}></DificultySelector>

      <Servings/>
      
      <IngredientPicker/>
      
      {/* <CategoryList></CategoryList> */}
      {/* <View style={styles.scrollViewContent}>

      <
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

      </View> */}
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

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },


  title: {
    textAlign: 'center',
    fontSize: 20,
    
  },

  imagesList: {
    paddingTop: 10,
    margin: 20,
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

export default AddRecipe;
