import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import BackgroundSVG from "../assets/landing/BackgroundSVG";
import React from "react";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ToastUtil from "../utils/ToastUtil";
import Toast from "react-native-root-toast";
import traducirTexto from "../services/TransaltionService";

// @ts-ignore
const HomeScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();

  function logOut() {
    signOut(auth).then( result => {
      ToastUtil.showToast(result!!, Toast.durations.SHORT)
      console.log("Sesión cerrada")
    })
    
  }

  traducirTexto()

  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
        <Text style={{color: Colors.textPrimary}}>HOME</Text>
      </SafeAreaView>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },

  background: {
    ...StyleSheet.absoluteFillObject
  },
  
});
