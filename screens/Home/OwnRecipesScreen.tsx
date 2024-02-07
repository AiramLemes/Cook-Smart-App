import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchScreen from "../SearchScreen";
import { auth } from "../../firebaseConfig";
import { isUserRecipesIdsNotEmpty } from "../../repository/FirebaseRecipes";



// @ts-ignore
const OwnRecipesScreen = ({navigation}) => {

  const userId = auth.currentUser?.uid
  
  return (
    <SearchScreen userId={userId}/>
  );
}

export default OwnRecipesScreen;


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
