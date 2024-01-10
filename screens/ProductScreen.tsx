import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Iconify } from "react-native-iconify";
import Collapsible from 'react-native-collapsible';
import Table from "../components/Table";
import { getBetterProducts } from "../repository/FirebaseProduct";
import Product from "../model/Product";
import FaceColor from "../utils/RatingFaceColor";

// @ts-ignore
const ProductScreen = ({ navigation, route }) => {
  const product: Product = route.params;
  const insets = useSafeAreaInsets();

  const [isIngredientsCollapsed, setIsIngredientsCollapsed] = React.useState(false);
  const [isNutritionalValuesCollapsed, setIsNutritionalValuesCollapsed] = React.useState(true);

  const [betterProducts, setBetterProducts] = React.useState([]);

  useEffect(() => {
    const fetchBetterProducts = async () => {
      const products = await getBetterProducts(product.name, product.rate);
      // @ts-ignore
      setBetterProducts(products);
    };

    fetchBetterProducts();
  }, []);


  return (
    <SafeAreaView style={{ ...styles.container, paddingBottom: insets.bottom }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        <View style={styles.productCard}>
          <View style={{ ...styles.column, flex: 1 }}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
          </View>
          <View style={{ ...styles.column, flex: 2 }}>
            <Text style={{fontSize: 20, marginBottom: 10}}>{product.name}</Text>
            <Text style={{fontSize: 13, marginBottom: 10}}>{product.brand}</Text>
            <View style={styles.rating}>
              <FaceColor rate={product.rate} size={20}/>
              <Text>  {product.rate}/100</Text>
          </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={() => setIsIngredientsCollapsed(!isIngredientsCollapsed)}>
            <View style={styles.sections}>
              <Text style={styles.sectionTitle}>Ingredientes</Text>
              {isIngredientsCollapsed ? (
                <Iconify icon="bxs:right-arrow" style={{ marginTop: 3 }} size={14} color="black" />
              ) : (
                <Iconify icon="bxs:down-arrow" style={{ marginTop: 3 }} size={14} color="black" />
              )}
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={isIngredientsCollapsed}>
            <Text style={styles.firstSectionBody}>{product.ingredients}</Text>
          </Collapsible>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={() => setIsNutritionalValuesCollapsed(!isNutritionalValuesCollapsed)}>
            <View style={styles.sections}>
              <Text style={styles.sectionTitle}>Información Nutricional</Text>
              {isNutritionalValuesCollapsed ? (
                <Iconify icon="bxs:right-arrow" style={{ marginTop: 3 }} size={14} color="black" />
                ) : (
                <Iconify icon="bxs:down-arrow" style={{ marginTop: 3 }} size={14} color="black" />
              )}
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={isNutritionalValuesCollapsed} style={styles.secondSectionBody}>
            <Table product={product}></Table>
          </Collapsible>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sections}>
              <Text style={styles.sectionTitle}>Productos mejor valorados:</Text>
          </View>
          <View style={styles.thirdSectionBody}>

          {betterProducts.length > 0 ? (
            <View style={styles.betterProducts}>
              
              { betterProducts.length >= 1 &&
              <TouchableOpacity style={styles.betterProductItemGroup} onPress={() => {navigation.push('Product', betterProducts[0])}}>
                <Image source={{ uri: betterProducts[0].image }} style={styles.betterProductImage}/>
              </TouchableOpacity>
              }

              { betterProducts.length >= 2 &&
              <TouchableOpacity style={styles.betterProductItemGroup} onPress={() => {navigation.push('Product', betterProducts[1])}}>
                <Image source={{ uri: betterProducts[1].image }} style={styles.betterProductImage}/>
              </TouchableOpacity>
              }

              { betterProducts.length >= 3 &&
              <TouchableOpacity style={styles.betterProductItemGroup} onPress={() => {navigation.push('Product', betterProducts[2])}}>
                <Image source={{ uri: betterProducts[2].image }} style={styles.betterProductImage}/>
              </TouchableOpacity>
              }

            </View>
            ) : (
              <Text style={{marginTop: 20}}>No hay productos disponibles</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    padding: 10,
  },
  productCard: {
    width: '90%',
    aspectRatio: 5 / 2,
    flexDirection: 'row',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.background,
    marginVertical: 60,
    alignSelf: 'center',
    elevation: 5
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    borderColor: Colors.imageBorder,
    borderWidth: 1,
    marginLeft: 30,
    borderRadius: 10,
  },

  rating:{
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },

  sectionContainer:{
    marginBottom: 30
  },

  sections: {
    flexDirection: "row",
    flex: 1,
    marginLeft: '5%',
  },
  sectionTitle: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },

  firstSectionBody: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    width: '90%',
    textAlign: 'justify'
  },

  secondSectionBody: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center'
  },

  thirdSectionBody: {
    marginTop: 30,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  
  betterProducts: {
    width: '90%',
    aspectRatio: 5 / 2,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.background,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between'

  },

  betterProductItemGroup: {
    width: '30%',
    aspectRatio: 1,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.background,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    overflow: 'hidden',
  },

  betterProductImage: {
    width: '100%',
    height: '100%',
  },

  betterProductText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 5,
  },
  
});
