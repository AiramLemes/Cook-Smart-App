import React from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text, StyleSheet, FlatList, VirtualizedList } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';
import Recipe from '../model/Recipe';
import Dificulty from '../components/Dificulty';
import IngredientItem from '../components/IngredientItem';

//@ts-ignore
const RecipeScreen = ({ navigation, route }) => {
  const recipe: Recipe = route.params;
  return (
    <ScrollView style={styles.container}>

      <View style={styles.recipeTitle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>{recipe.title}</Text>

        <TouchableOpacity>
          <Iconify icon="mdi:favourite-border" size={33} color="red" />
        </TouchableOpacity>
      </View>


      <View style={styles.scrollViewContent}>
        <FlatList
          horizontal
          style={styles.imagesList}
          data={recipe.images}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.images} />}
          keyExtractor={(item) => item}
        />


        <View style={styles.preparation}>
          <View style={styles.preparationGeneralInfo}>
            <Text>Preparación</Text>
            <View style={styles.preparationPeopleInfo}>
              <Dificulty dificulty={2} size={25}/>
            </View>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="ri:knife-line" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>Preparación</Text>
            <Text style={styles.preparationItemDuration}>0 m</Text>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="mdi:pot-mix-outline" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>Cocinado</Text>
            <Text style={styles.preparationItemDuration}>0 m</Text>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="carbon:smoke" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>Reposo</Text>
            <Text style={styles.preparationItemDuration}>0 m</Text>
          </View>

        </View>
        
        <View style={styles.preparation}>
          <View style={styles.preparationGeneralInfo}>
            <Text>Ingredientes</Text>
            <View style={styles.preparationPeopleInfo}>
              <Text style={styles.personText}>4 personas</Text>
              <Iconify icon="pepicons-pencil:people" size={30} color="black" />
            </View>
          </View>

              PONLO AQUÍ

          <FlatList
            data={recipe.ingredients}
            renderItem={({ item }) => (
              <IngredientItem icon={item.icon} title={item.title} duration={item.duration} />
            )}
            keyExtractor={(item) => item.title}
          />
          {/* <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="ri:knife-line" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>Preparación</Text>
            <Text style={styles.preparationItemDuration}>0 m</Text>
          </View>
º
          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="mdi:pot-mix-outline" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>Cocinado</Text>
            <Text style={styles.preparationItemDuration}>0 m</Text>
          </View>

          <View style={styles.preparationItem}>
            <View style={styles.preparationItemIcon}>
              <Iconify icon="carbon:smoke" style={{alignSelf: 'center'}} size={30} color="black" />
            </View>
            <Text style={styles.preparationItemText}>Reposo</Text>
            <Text style={styles.preparationItemDuration}>0 m</Text>
          </View> */}

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
  
  backButton: {
     
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
    left: '85%',
    top: '20%'
  },

  ingredientsText: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    height: 200,
    width: '100%',
    textAlignVertical: 'top', // Alinear el texto en la parte superior
  },
  
});

export default RecipeScreen;
