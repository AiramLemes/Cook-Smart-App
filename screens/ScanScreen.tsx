import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Platform } from 'react-native';
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { getProduct } from '../repository/FirebaseProduct';
import Product from '../model/Product';
import FaceColor from '../utils/RatingFaceColor';
import LanguageContext from '../context/LanguageProvider';


// @ts-ignore
const ScanScreen = ({ navigation }) => {
  const [productExists, setProductExists] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const Strings = useContext(LanguageContext);
  
  let currentProductId = "";

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = (await Camera.requestCameraPermissionsAsync());
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  // @ts-ignore
  const handleBarCodeScanned = async ({ data }) => {
    if (data != currentProductId) {
      const product = await getProduct(data);
      if (product != null) {
        setProductExists(true);
        setScannedProduct(product);
        currentProductId = data;
        setIsHidden(false);
      }
    }
  };
  // navigation.navigate('Product', scannedProduct)
  const handleGoButtonPress = () => {
    navigation.navigate('Product', scannedProduct);
  };

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      {isFocused && (
        <View style={styles.barcode}>
          {hasPermission === null ? (
            <Text>{Strings.translate('scanPermissionMessage')}</Text>
          ) : hasPermission === false ? (
            <Text style={{textAlign: 'center'}}>{Strings.translate('scanNoPermission')}</Text>
          ) : (
            <Camera
              style={StyleSheet.absoluteFill}
              ratio='16:9'
              onBarCodeScanned={handleBarCodeScanned}
            />
          )}

        </View>
      )}
{/* productExists */}
    { productExists && !isHidden && (
      <View style={styles.productCard}>
        <View style={styles.column}>
          <Image source={{ uri: scannedProduct!!.image }} style={styles.productImage} />
        </View>
        <View style={{ ...styles.column, flex: 3, left: 10}}>
          <Text style={{fontSize: 17}} >{scannedProduct!!.name}</Text>
          <Text>{scannedProduct!!.brand}</Text>
          <View style={styles.rating}>
            <FaceColor rate={scannedProduct!!.rate} size={20}/>
            <Text>  {scannedProduct!!.rate}/100</Text>
          </View>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setIsHidden(true)}>
            <Iconify icon="material-symbols:close" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.goButton} onPress={handleGoButtonPress}>
            <Iconify icon="carbon:next-filled" size={33} color="black" />
          </TouchableOpacity>
        </View>
      </View>
  )}

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
  },
  barcode: {
    width: '100%',
    height: '100%',
  },
  productCardContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 1
  },
  productCard: {
    width: '85%',
    flexDirection: 'row',
    borderColor: Colors.primary,
    borderWidth: 4,
    borderRadius: 10,
    backgroundColor: Colors.background,
    zIndex: 1,
    position: 'absolute',
    bottom: 50,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  productImage: {
    width: 60,
    height: 60,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 30,
  },
  closeButton: {
    padding: 5,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  goButton: {
    padding: 5,
    marginTop: 30,
  },
  rating:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  }
});

export default ScanScreen;

