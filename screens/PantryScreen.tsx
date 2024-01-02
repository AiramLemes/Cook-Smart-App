import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// @ts-ignore
const PantryScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
   
        <Text style={{color: Colors.textPrimary}}>PantryScreen</Text>
    </SafeAreaView>
  );
}

export default PantryScreen;


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