import LottieView from 'lottie-react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, PixelRatio, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Toast from 'react-native-root-toast';
import CategoryList from '../components/Category';
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';
import Recipe from '../model/Recipe';
import { addRecipe, updateRecipe } from '../repository/FirebaseRecipes';
import { assignRecipeToUser } from '../repository/FirebaseUser';
import ToastUtil from '../utils/ToastUtil';
import SelectDropdown from 'react-native-select-dropdown';


const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 28;

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
  const [preparationTimeUnit, setPreparationTimeUnit] = useState('');
  const [cookingTimeUnit, setCookingTimeUnit] = useState('');
  const [restingTimeUnit, setRestingTimeUnit] = useState('');

  
  const Strings = useContext(LanguageContext);
  
  const timeUnits = [Strings.translate('minutes'), Strings.translate('hours'), Strings.translate('days')];

  const preparationTimeUnitRef = useRef();
  const cookingTimeUnitRef = useRef();
  const restingTimeUnitRef = useRef();

  useEffect(() => {
    if (editable) {
      setPreparation(recipe.preparation.amount.toString());
      setPreparationTimeUnit(recipe.preparation.unit);
      preparationTimeUnitRef.current.selectIndex(recipe.preparation.index);


      setCooking(recipe.cooking.amount.toString());
      setCookingTimeUnit(recipe.cooking.unit);
      cookingTimeUnitRef.current.selectIndex(recipe.cooking.index);



      setResting(recipe.rest.amount.toString());
      setRestingTimeUnit(recipe.rest.unit);
      restingTimeUnitRef.current.selectIndex(recipe.rest.index);

      setSteps(recipe.steps.join('/n'));
    }
  }, []);

  const [categoryError, setCategoryError] = useState(false);
  const [preparationError, setPreparationError] = useState(false);
  const [cookingError, setCookingError] = useState(false);
  const [restingError, setRestingError] = useState(false);
  const [timeUnitError, setTimeUnitError] = useState(false);
  const [stepsError, setStepsError] = useState(false);

  
  const getTimeSelectorIndex = (unit: string) => {
    
    let index;
    
    switch (unit) {
      case Strings.translate('minutes'):
        index = 0;
        break;

      case Strings.translate('hours'):
        index = 1;
        break;

      case Strings.translate('days'):
        index = 2;
        break;
    }

    return index;
  };

  const createRecipe = async () => {

    if (validateForms()) {
      recipe.steps = formatSteps(steps);

      recipe.preparation = {
        amount: parseInt(preparation), 
        unit: preparationTimeUnit,
        index: getTimeSelectorIndex(preparationTimeUnit)
      };

      recipe.cooking = {
        amount: parseInt(cooking), 
        unit: cookingTimeUnit,
        index: getTimeSelectorIndex(cookingTimeUnit)
      };

      recipe.rest = {
        amount: parseInt(resting), 
        unit: restingTimeUnit,
        index: getTimeSelectorIndex(restingTimeUnit)
      };

      recipe.category = category;

      await saveRecipe();

    }

    else {
      ToastUtil.showToast(Strings.translate('emptyInputs'), Toast.durations.SHORT);
    }

  };


  const saveRecipe= async () => {

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

      else {
        ToastUtil.showToast(Strings.translate('generalError'), Toast.durations.SHORT);
      }
    }
  }



  const validateForms = () => {

    const categoryResult = isCategoryValid();
    const stepsResult = isStepsValid();
    const preparationResult = arePreparationItemsValid();
    const timeUnits = cookingTimeUnit != '' && restingTimeUnit != '' && preparationTimeUnit != '';
    setTimeUnitError(!timeUnits);
    return categoryResult && stepsResult && preparationResult && timeUnits;

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

    const preparationResult = parseInt(preparation) <= 0 || preparation == '';
    const cookingResult = parseInt(cooking) <= 0 || cooking == '';
    const restingResult = parseInt(resting) <= 0 || resting == '';
    
    setPreparationError(preparationResult);
    setCookingError(cookingResult);
    setRestingError(restingResult);

    return !preparationResult && !cookingResult && !restingResult;;

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

          <SelectDropdown
            ref={preparationTimeUnitRef}
            data={timeUnits}
            defaultButtonText={Strings.translate('time')} 
            buttonStyle={styles.selector}
            buttonTextStyle={{fontSize: adjustedFontSize, color: timeUnitError && preparationTimeUnit === '' ? 'red' : 'black' }}
            dropdownStyle={{borderRadius: 10, marginTop: -30}}
            onSelect={(selectedItem, index) => {setPreparationTimeUnit(selectedItem)}}
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
            rowTextForSelection={(item, index) => { return item }}
          />

          <TextInput placeholder='0' keyboardType='numeric'  placeholderTextColor={preparationError? 'red' : 'black'}
            value={preparation} onChangeText={setPreparation}  style={[
              styles.preparationItemDuration,
              { color: parseInt(cooking) <= 0  && resting !== '' ? 'red' : 'black' }
            ]} />
          
        </View>

        <View style={styles.preparationItem}>
          <View style={styles.preparationItemIcon}>
            <Iconify icon="mdi:pot-mix-outline" style={{alignSelf: 'center'}} size={30} color="black" />
          </View>
          <Text style={styles.preparationItemText}>{Strings.t('cooking')}</Text>

          <SelectDropdown
            ref={cookingTimeUnitRef}
            data={timeUnits}
            defaultButtonText={Strings.translate('time')} 
            buttonStyle={styles.selector}
            buttonTextStyle={{fontSize: adjustedFontSize, color: timeUnitError && cookingTimeUnit === '' ? 'red' : 'black' }}
            dropdownStyle={{borderRadius: 10, marginTop: -30}}
            onSelect={(selectedItem, index) => {setCookingTimeUnit(selectedItem)}}
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
            rowTextForSelection={(item, index) => { return item }}
            />
          <TextInput placeholder='0' keyboardType='numeric'  placeholderTextColor={cookingError ? 'red' : 'black'}
            value={cooking} onChangeText={setCooking}  style={[
            styles.preparationItemDuration,
            { color: parseInt(cooking) <= 0  && resting !== '' ? 'red' : 'black' }
          ]} />
        </View>

        <View style={styles.preparationItem}>
          <View style={styles.preparationItemIcon}>
            <Iconify icon="carbon:smoke" style={{alignSelf: 'center'}} size={30} color="black" />
          </View>
          <Text style={styles.preparationItemText}>{Strings.t('rest')}</Text>

          <TextInput placeholder='0' keyboardType='numeric'  placeholderTextColor={restingError? 'red' : 'black'}
            value={resting} onChangeText={setResting}  style={[
            styles.preparationItemDuration,
            { color: parseInt(cooking) <= 0  && resting !== '' ? 'red' : 'black' }
          ]} />

          <SelectDropdown
            ref={restingTimeUnitRef}
            data={timeUnits}
            defaultButtonText={Strings.translate('time')} 
            buttonStyle={styles.selector}
            buttonTextStyle={{fontSize: adjustedFontSize, color: timeUnitError && restingTimeUnit === '' ? 'red' : 'black' }}
            dropdownStyle={{borderRadius: 10, marginTop: -30}}
            onSelect={(selectedItem, index) => {setRestingTimeUnit(selectedItem)}}
            buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
            rowTextForSelection={(item, index) => { return item }}
            />
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
    right: '25%',
    marginRight: 20,
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

  selector: {
    backgroundColor: 'transparent',
    width: '30%',
    height: '98%',
    position: 'absolute',
    right: -20,
    borderRadius: 10,
    alignSelf: 'center',
    fontSize: adjustedFontSize
  },


});

export default AddRecipeForm2;

