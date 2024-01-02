import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { Iconify } from "react-native-iconify";

// @ts-ignore
const UserProfileScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>

        <Pressable style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Iconify icon="lets-icons:back" size={33} color="black"/>
        </Pressable>

        <Text style={styles.title} >PROFILE</Text>
        
       
    
      </SafeAreaView>
  );
}

export default UserProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  
  title: {
    fontSize: 22,
    padding: 20
  },
  
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 10,
  }
});
