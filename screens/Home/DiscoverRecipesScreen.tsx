import { useIsFocused } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import RecipeItem from "../../components/Recipe";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import Recipe from "../../model/Recipe";
import { getBestRecipes, getNewestRecipes } from "../../repository/FirebaseRecipes";

const DiscoverRecipesScreen = ({ navigation }) => {

  const bestRecipesList = useRef();
  const newestRecipesList = useRef();
  const onFocus = useIsFocused();
  const numberOfRecipes = 7;
  const initialIndex = 3;
  
  const Strings = useContext(LanguageContext);

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
  }, [onFocus]);


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
      image: require('../../assets/carousel/chat-gpt.png'),
      title: Strings.translate('carouselImageTitle1')
    },
    {
      image: require('../../assets/carousel/scan.png'),
      title: Strings.translate('carouselImageTitle2')
    },
    {
      image: require('../../assets/carousel/pantry.png'),
      title: Strings.translate('carouselImageTitle3')
    },
  ];






  const renderItem = ({item, index}: any, parallaxProps: any) => {
    return (
      <View>
        <ParallaxImage
          source={item.image}
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
        <Text style={styles.categoryText}>{Strings.translate('bestRecipes')}</Text>
        <FlatList
          ref={bestRecipesList}
          data={bestRecipes}
          horizontal
          renderItem={({ item }) => <View style={{ padding: 20 }}><RecipeItem recipe={item} userId={''} /></View>}
          keyExtractor={(item) => item.id} />
          {/* // getItemLayout={getItemLayout}  */}
      </View>
      
      <View style={styles.listContainer}>
          <Text style={styles.categoryText}>{Strings.translate('newestRecipes')}</Text>
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
