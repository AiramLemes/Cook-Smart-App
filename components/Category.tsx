import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";

const CategoryList = (props: { onChange: string; error: boolean, initialValue?: string}) => {
  
  const initialValue = props.initialValue;
  
  useEffect(() => {
    if (initialValue) {
      setSelectedCategory(initialValue);
      props.onChange(initialValue);
    } 

  }, []);


  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const data = ['Salads', 'Pasta', 'Meat', 'Fish', 'Vegetarian', 'Desserts', 'Soups', 'Drinks', 'Breakfast'];

  const Category = (props: { category: string, onChange: string; }) => {
    const categoryName = props.category;

    const handleCategoryPress = () => {
      const newSelectedCategory = categoryName === selectedCategory ? null : categoryName;
      setSelectedCategory(newSelectedCategory);
      props.onChange(newSelectedCategory)
    };

    const getImageSource = (categoryName: string) => {
      const categoryImageMapping = {
        'Salads': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fsalad.png?alt=media&token=ad67635f-c83b-4c7e-901a-db6b42876e55',
        'Pasta': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fpasta.png?alt=media&token=eddacece-d52a-4b4a-91bb-a87bd2ce0139',
        'Meat': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fmeat.png?alt=media&token=3da33b0f-9afd-48ce-b115-7eee1a32641e',
        'Fish': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Ffish.png?alt=media&token=895c69c0-cf6a-41d4-8736-a73eb6a81cc1',
        'Vegetarian': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fvegetarian.png?alt=media&token=645b02a6-bf2c-4251-b74f-7e37fe4c0e40',
        'Desserts': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fdesserts.png?alt=media&token=062a6537-702b-4e89-9671-8d9bb23c5f66',
        'Soups': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fsoup.png?alt=media&token=37b5b55c-5453-4718-9131-9b632fe6ded9',
        'Drinks': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fdrinks.png?alt=media&token=adfdd5bf-f19a-455e-a3fc-089ca390d3df',
        'Breakfast': 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/foodCategories%2Fbreakfast.png?alt=media&token=41df66ee-3fa3-4a0f-b471-3c349a38eb86'
      };
      //@ts-ignore
      return categoryImageMapping[categoryName];
    };

    const getBackgroundColor = (categoryName: string) => {
      const categoryBackGroundColor = {
        'Salads': '#DEFFC0',
        'Pasta': '#FFE4AE',
        'Meat': '#C1A79B',
        'Fish': '#FFE1C2',
        'Vegetarian': '#FFE5D8',
        'Desserts': '#FFD0EC',
        'Soups': '#FFE19B',
        'Drinks': '#E5FDF1',
        'Breakfast': '#FFEBE0',
      };

      //@ts-ignore
      return categoryBackGroundColor[categoryName];
    };

    return (
      <TouchableOpacity
        style={{
          ...styles.categoryContainer,
          backgroundColor: getBackgroundColor(categoryName),
          borderColor: selectedCategory === categoryName ? Colors.primary : Colors.black,
          borderWidth: selectedCategory === categoryName ? 2 : 1,
        }}
        onPress={handleCategoryPress}
      >
        {selectedCategory === categoryName && (
          <View style={styles.selectedIcon}>
            <Iconify icon="charm:tick" size={20} color="black" />
          </View>
        )}
        <Image source={{ uri: getImageSource(categoryName) }} style={styles.image} />
        <Text style={styles.text}>{categoryName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.titleSection}>
        <Text>Categoría</Text>
        { props.error &&
        <Text style={{color: 'red'}}>Seleccione una categoría</Text> }
      </View>
      <FlatList
        horizontal
        data={data}
        style={styles.flatList}
        renderItem={({ item }) => <Category category={item} onChange={props.onChange}/>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryContainer: {
    width: 120,
    height: 140,
    borderRadius: 24,
    borderBlockColor: Colors.black,
    borderWidth: 1,
    flex: 1,
    margin: 5,
    position: 'relative',
  },

  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  image: {
    flex: 3,
    width: '80%',
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: 10,
  },

  text: {
    flex: 1,
    textAlign: 'center',
    marginTop: 5,
  },

  selectedIcon: {
    position: 'absolute',
    top: 5,
    left: 10,
  },

  flatList: {
    marginTop: 20,
    alignSelf: 'center'
  }
});
