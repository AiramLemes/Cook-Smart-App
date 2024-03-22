import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { auth } from "../../firebaseConfig";
import SearchScreen from "../SearchScreen";



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
