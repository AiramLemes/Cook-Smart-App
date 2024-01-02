import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import BackgroundSVG from "../assets/landing/BackgroundSVG";
import React from "react";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import ToastUtil from "../utils/ToastUtil";
import Toast from "react-native-root-toast";

// @ts-ignore
const HomeScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();

  function logOut() {
    signOut(auth).then( result => {
      ToastUtil.showToast(result!!, Toast.durations.SHORT)
      console.log("Sesión cerrada")
    })
    
  }

  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
      <Pressable style= {{width:300, height:50, backgroundColor: Colors.primary}} onPress={logOut}>
        <Text style={{color: Colors.textPrimary}}>CERRAR SESIÓN</Text>
      </Pressable>
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
