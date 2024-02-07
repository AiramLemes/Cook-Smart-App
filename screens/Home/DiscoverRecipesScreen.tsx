import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions, ActivityIndicator, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Recipe from "../../model/Recipe";
import { getBestRecipes, getNewestRecipes } from "../../repository/FirebaseRecipes";
import RecipeItem from "../../components/Recipe";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Title } from "react-native-paper";

const DiscoverRecipesScreen = ({ navigation }) => {

  const bestRecipesList = useRef();
  const newestRecipesList = useRef();
  const onFocus = useIsFocused();
  const numberOfRecipes = 7;
  const initialIndex = 3;

  const [bestRecipes, setBestRecipes] = useState<Recipe[]>([]);
  const [newestRecipes, setNewestRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setBestRecipes(await getBestRecipes(numberOfRecipes));
      setNewestRecipes(await getNewestRecipes(numberOfRecipes));
      
      // bestRecipesList.current!!.scrollToIndex({ animated: false, index: initialIndex });
      // newestRecipesList.current!!.scrollToIndex({ animated: false, index: initialIndex });
      setLoading(false);
    };

  
    fetchData();
  }, []);


  // const getItemLayout = (_: any, index: number) => {
  //   const screenWidth = Dimensions.get('window').width;
  //   const recipeWidth = 145;
  //   return {
  //     length: screenWidth,
  //     offset: recipeWidth/screenWidth * index,
  //     index,
  //   };
  // };

  const {width: screenWidth} = Dimensions.get('window');
  const carouselRef = useRef(null);

 
  
  const entries = [
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/carousel%2Fchat-gpt.png?alt=media&token=f4790a12-423a-4a6a-b447-2138f06a8771',
      title: 'Unlock Culinary Creativity with ChatGPT-Powered Recipe Creation!'
    },
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/carousel%2Fscan.png?alt=media&token=74fba929-33b1-40b3-bfcb-70f259c627c6',
      title: 'Seamless Supermarket Experience: Explore Product Information Instantly!'
    },
    {
      image: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/carousel%2Fpantry.png?alt=media&token=882a2ac0-5a79-4aac-bde1-de8771b86f40',
      title: 'Organize Your Virtual Pantry Effortlessly!'
    },
  ];






  const renderItem = ({item, index}: any, parallaxProps: any) => {
    return (
      <View>
        <ParallaxImage
          source={{uri: item.image}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
            {item.title}
        </Text>
      </View>
    );
  };
  


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Carousel 
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        autoplay={true}
        loop
        scrollAnimationDuration={5000}
        renderItem={renderItem}
        hasParallaxImages={true}
      />


      <View style={styles.listContainer}>
        <Text style={styles.categoryText}>Best Recipes</Text>
        <FlatList
          ref={bestRecipesList}
          data={bestRecipes}
          horizontal
          renderItem={({ item }) => <View style={{ padding: 20 }}><RecipeItem recipe={item} userId={''} /></View>}
          keyExtractor={(item) => item.id} />
          {/* // getItemLayout={getItemLayout}  */}
      </View>
      
      <View style={styles.listContainer}>
          <Text style={styles.categoryText}>Newest Recipes</Text>
          <FlatList
            ref={newestRecipesList}
            data={newestRecipes}
            horizontal
            renderItem={({ item }) => <View style={{ padding: 20 }}><RecipeItem recipe={item} userId={''} /></View>}
            keyExtractor={(item) => item.id} />
            {/* // getItemLayout={getItemLayout}  */}
      </View>

    {loading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )}

    </ScrollView>
  );
};

export default DiscoverRecipesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    
  },

  listContainer: {
    height: 300,
    width: '100%'
  },
  
  categoryText: {
    fontSize: 20,
    marginLeft: 16,
    marginBottom: 8,
    textDecorationLine: 'underline'
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

  imageContainer: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },

  title: {
    marginBottom: 40,
    textAlign: 'center'
  }
});
