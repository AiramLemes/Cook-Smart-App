import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';
import CategoryList from '../components/Category';
import { Strings } from '../constants/Strings';
import Recipe from '../model/Recipe';
import { addRecipe, updateRecipe } from '../repository/FirebaseRecipes';
import ToastUtil from '../utils/ToastUtil';
import Toast from 'react-native-root-toast';
import { assignRecipeToUser } from '../repository/FirebaseUser';

//@ts-ignore
const AddRecipeForm2 = ({ navigation, route }) => {

  const recipe: Recipe = route.params.recipe;
  const editable: boolean = route.params.editable;

  const [preparation, setPreparation] = useState('');
  const [cooking, setCooking] = useState('');
  const [resting , setResting] = useState('');
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');


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


      console.log(recipe)

      if (!editable) {
        const recipeId = await addRecipe(recipe);
        if (!recipeId) {
          ToastUtil.showToast('Se ha producido un error al crear la receta', Toast.durations.SHORT);
        }
        else {
          if (await assignRecipeToUser(recipeId)) {
            navigation.navigate('Home');
            ToastUtil.showToast('Receta creada correctamente', Toast.durations.SHORT);
          }
          else {
            ToastUtil.showToast('Se ha producido un error al crear la receta', Toast.durations.SHORT);
          }
        }
      }

      else {
        if (await updateRecipe(recipe)) {
          navigation.navigate('Home');
          ToastUtil.showToast('Receta actualizada correctamente', Toast.durations.SHORT);
        }
      }
    }

    else {
      ToastUtil.showToast('Por favor, revise todos los campos', Toast.durations.SHORT);
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
    const lines = text.split('\n');
    console.log(lines);

    // const formattedLines = lines.map((line, index) => {
    //   const expectedPrefix = `${index + 1}.-`;

    //   console.log(`empieza con ${expectedPrefix} ?`, line.startsWith(expectedPrefix));

    //   // Verificar si la línea ya tiene el formato esperado
    //   if (line.startsWith(expectedPrefix)) {
    //     return line;
    //   }

    //   // Verificar si se eliminaron caracteres y la línea ahora tiene el formato esperado
    //   const trimmedLine = line.trim();
    //   if (trimmedLine.startsWith(expectedPrefix)) {
    //     return trimmedLine;
    //   }

    //   // Agregar el formato si no cumple con ninguna de las condiciones anteriores
    //   return `${expectedPrefix} ${line}`;
    // });

    // console.log('modificado: ', formattedLines.join('\n'));

    // setSteps(formattedLines.join('\n'));
    return lines;
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        {/* <Text style={styles.title}>{renderRecipe.title}</Text> */}

        <TouchableOpacity style={{flexDirection: 'row'}} onPress={createRecipe}>
          <Text style={styles.text}>{editable? 'Update': 'Create'}</Text>
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
  {/*
      <View style={styles.section}>
        <Text style={styles.sectionText}>{Strings.t('')}</Text>
        <TextInput style={styles.stepsSection}/>
      </View> */}

    <View style={styles.section}>
      <Text style={styles.sectionText}>{Strings.t('steps')}</Text>

      <TextInput
        multiline={true}
        style={styles.stepsSection}
        value={steps}
        autoCapitalize='sentences'
        onChangeText={setSteps}
        placeholder="Escribe tus pasos aquí..."
        placeholderTextColor= {stepsError? 'red': 'black'}
      />
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
    marginTop: 30
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
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 25,
    padding: 20,
    textAlign: 'justify'
  },



});

export default AddRecipeForm2;
