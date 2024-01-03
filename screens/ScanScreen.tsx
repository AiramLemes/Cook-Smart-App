import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';


// @ts-ignore
const ScanScreen = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(false);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  // @ts-ignore
  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data);
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
          <Text style={styles.title}>Prueba a escanear algún producto!</Text>
          {hasPermission === null ? (
            <Text>Requesting for camera permission</Text>
          ) : hasPermission === false ? (
            <Text>No access to camera</Text>
          ) : (
            <Camera
              style={StyleSheet.absoluteFill}
              ratio='16:9'
              onBarCodeScanned={handleBarCodeScanned}
            />
          )}
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
    fontSize: 20
  },

  barcode: {
    width: '100%',
    height: '100%',
    start: 0,
    bottom: 0,
  }
});


export default ScanScreen;
