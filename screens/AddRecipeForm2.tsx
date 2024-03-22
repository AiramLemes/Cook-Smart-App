import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-root-toast';
import CategoryList from '../components/Category';
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';
import Recipe from '../model/Recipe';
import { addRecipe, updateRecipe } from '../repository/FirebaseRecipes';
import { assignRecipeToUser } from '../repository/FirebaseUser';
import ToastUtil from '../utils/ToastUtil';

//@ts-ignore
const AddRecipeForm2 = ({ navigation, route }) => {

  const recipe: Recipe = route.params.recipe;
  const editable: boolean = route.params.editable;

  const [preparation, setPreparation] = useState('');
  const [cooking, setCooking] = useState('');
  const [resting , setResting] = useState('');
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');
  const [creatingRecipe, setCreatingRecipe] = useState(false);

  const Strings = useContext(LanguageContext);


  useEffect(() => {
    if (editable) {
      setPreparation(recipe.preparation);
      setCooking(recipe.cooking);
      setResting(recipe.rest);
      setSteps(recipe.steps.join('/n'));
    }
  }, []);

  const [categoryError, setCategoryError] = useState(false);
  const [preparationsError, setPreparationsError] = useState(false);
  const [stepsError, setStepsError] = useState(false);


  const createRecipe = async () => {

    if (validateForms()) {
      recipe.steps = formatSteps(steps);
      recipe.cooking = cooking;
      recipe.rest = resting;
      recipe.preparation = preparation;
      recipe.category = category;


      if (!editable) {
        setCreatingRecipe(true);
        const recipeId = await addRecipe(recipe);
        if (!recipeId) {
          ToastUtil.showToast(Strings.translate('recipeForm2CreateError'), Toast.durations.SHORT);
        }
        else {
          if (await assignRecipeToUser(recipeId)) {
            setCreatingRecipe(false);
            navigation.navigate('Home');
            ToastUtil.showToast(Strings.translate('createRecipe'), Toast.durations.SHORT);
          }
          else {
            setCreatingRecipe(false);
            ToastUtil.showToast(Strings.translate('recipeForm2CreateError'), Toast.durations.SHORT);
          }
        }

        setCreatingRecipe(false);
      }

      else {
        if (await updateRecipe(recipe)) {
          navigation.navigate('Home');
          ToastUtil.showToast(Strings.translate('updateRecipe'), Toast.durations.SHORT);
        }
      }
    }

    else {
      ToastUtil.showToast(Strings.translate('emptyInputs'), Toast.durations.SHORT);
    }

  };



  const validateForms = () => {

    const categoryResult = isCategoryValid();
    const stepsResult = isStepsValid();
    const preparationResult = arePreparationItemsValid();

    return categoryResult && stepsResult && preparationResult;

  }


  const isStepsValid = () => {
    if (steps.length <= 0) {
      setStepsError(true);
      return false;
    }

    setStepsError(false);
    return true;
  }

  const arePreparationItemsValid = () => {

    const pattern = /^\d*\s?[mhs]$/;

    const result =  pattern.test(preparation) && pattern.test(cooking) && pattern.test(resting);
    setPreparationsError(!result);
    return result;

  }

  const isCategoryValid = () => {
    if (!category) {
      setCategoryError(true);
      return false;
    }
    setCategoryError(false);
    return true;

  }

  const formatSteps = (text: string) => {

    const steps: string[] = [];

    text.split('\n').forEach(line => {
      if (line !== "") {
        steps.push(line);
      }
    });
    return steps;
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        {/* <Text style={styles.title}>{renderRecipe.title}</Text> */}

        <TouchableOpacity style={{flexDirection: 'row'}} onPress={createRecipe}>
          <Text style={styles.text}>{editable? Strings.translate('update'): Strings.translate('create')}</Text>
          <Iconify icon="carbon:next-outline" size={33} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 30}}>

        {!editable && (
          <CategoryList onChange={setCategory} error={categoryError} />
        )}
        {editable && (
          <CategoryList initialValue={recipe.category} onChange={setCategory} error={categoryError} />
        )}
      </View>


      <View style={styles.section}>

        <Text style={styles.sectionText}>{Strings.t('preparation')}</Text>

        <View style={styles.preparationItem}>
          <View style={styles.preparationItemIcon}>
            <Iconify icon="ri:knife-line" style={{alignSelf: 'center'}} size={30} color="black" />
          </View>
          <Text style={styles.preparationItemText}>{Strings.t('preparation')}</Text>
          <TextInput placeholder='0 m' placeholderTextColor={preparationsError && preparation === '' ? 'red': 'black'}
            value={preparation} onChangeText={setPreparation}  style={styles.preparationItemDuration}/>
        </View>

        <View style={styles.preparationItem}>
          <View style={styles.preparationItemIcon}>
            <Iconify icon="mdi:pot-mix-outline" style={{alignSelf: 'center'}} size={30} color="black" />
          </View>
          <Text style={styles.preparationItemText}>{Strings.t('cooking')}</Text>
          <TextInput placeholder='0 m' placeholderTextColor={preparationsError && cooking === '' ? 'red': 'black'}
            value={cooking} onChangeText={setCooking}  style={styles.preparationItemDuration}/>
        </View>

        <View style={styles.preparationItem}>
          <View style={styles.preparationItemIcon}>
            <Iconify icon="carbon:smoke" style={{alignSelf: 'center'}} size={30} color="black" />
          </View>
          <Text style={styles.preparationItemText}>{Strings.t('rest')}</Text>
          <TextInput placeholder='0 m' placeholderTextColor={preparationsError && resting === '' ? 'red': 'black'}
            value={resting} onChangeText={setResting}  style={styles.preparationItemDuration}/>
        </View>

      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>{Strings.t('steps')}</Text>

        <TextInput
          multiline={true}
          style={styles.stepsSection}
          value={steps}
          autoCapitalize='sentences'
          onChangeText={setSteps}
          placeholder={Strings.translate('stepsForm')}
          placeholderTextColor= {stepsError? 'red': 'black'}
        />
      </View>

      {creatingRecipe && (
        <View style={styles.loadingContainer}>
          <LottieView source={require('../assets/Creating recipe.json')}
          style={{height: '20%', width: '50%'}}
          autoPlay/>
          <Text style={{fontSize: 20}}>{Strings.translate('publishRecipe')}</Text>
        </View>
      )}

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

  sectionText: {
    marginBottom: 20
  },

  section: {
    margin: 10,
    marginTop: 30,
  },

  preparationItem: {
    width: '100%',
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
    alignSelf: 'center',
    fontSize: 15,
    marginLeft: 10
  },

  preparationItemDuration: {
    fontSize: 15,
    position: 'absolute',
    right: 15,
    alignSelf: 'center'
  },

  stepsSection: {
    width: '100%',
    minHeight: 40,
    backgroundColor: '#FBF8F8',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 25,
    padding: 20,
    textAlign: 'justify',
    paddingTop: 20
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

export default AddRecipeForm2;
