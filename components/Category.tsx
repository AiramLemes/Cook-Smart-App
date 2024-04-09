import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import LanguageContext from "../context/LanguageProvider";

const CategoryList = (props: { onChange: string; error: boolean, initialValue?: string}) => {
  
  const initialValue = props.initialValue;
  const Strings = useContext(LanguageContext);
  
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
        'Salads': require('../assets/foodCategories/salad.png'),
        'Pasta': require('../assets/foodCategories/pasta.png'),
        'Meat': require('../assets/foodCategories/meat.png'),
        'Fish': require('../assets/foodCategories/fish.png'),
        'Vegetarian': require('../assets/foodCategories/vegetarian.png'),
        'Desserts': require('../assets/foodCategories/desserts.png'),
        'Soups': require('../assets/foodCategories/soup.png'),
        'Drinks': require('../assets/foodCategories/drinks.png'),
        'Breakfast': require('../assets/foodCategories/breakfast.png')
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
        <Image source={getImageSource(categoryName)} style={styles.image} />
        <Text style={styles.text}>{categoryName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.titleSection}>
        <Text>{Strings.translate('category')}</Text>
        { props.error &&
        <Text style={{color: 'red'}}>{Strings.translate('selectCategory')}</Text> }
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
    borderColor: Colors.black,
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