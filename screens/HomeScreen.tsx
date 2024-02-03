import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
  const handleGoButtonPress = () => {
    navigation.navigate('AddRecipeForm1');
  };
  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
        {/* <Text style={{color: Colors.textPrimary}}>HOME</Text> */}

        <TouchableOpacity onPress={handleGoButtonPress}><Text>ADD RECIPE</Text></TouchableOpacity>
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
