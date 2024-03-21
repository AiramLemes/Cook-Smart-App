import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import LanguageContext from '../context/LanguageProvider';
import Product from '../model/Product';
import { getProduct } from '../repository/FirebaseProduct';


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
  }, [isFocused]);

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
            <View style={styles.centeredMessageContainer}>
              <Text>{Strings.translate('scanPermissionMessage')}</Text>
            </View>
          ) : hasPermission === false ? (
            <View style={styles.centeredMessageContainer}>
              <Text style={{ textAlign: 'center' }}>{Strings.translate('scanNoPermission')}</Text>
              <TouchableOpacity  onPress={() => {Linking.openSettings()}}>
                <Text style={styles.permissionText}>{Strings.translate('giveCameraPermissions')}</Text>
              </TouchableOpacity>
              
            </View>
            
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
      {productExists && !isHidden && (
        <View style={styles.productCard}>
          {/* Resto del código */}
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcode: {
    width: '100%',
    height: '100%',
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
  },

  permissionText: {
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    color: Colors.blue
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

