import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from "../screens/Home/HomeScreen";
import React from "react";
import { StyleSheet } from "react-native";
import SearchScreen from '../screens/SearchScreen';
import Colors from '../constants/Colors';
import OwnRecipesScreen from '../screens/Home/OwnRecipesScreen';
import DiscoverRecipesScreen from '../screens/Home/DiscoverRecipesScreen';


const Tab = createMaterialTopTabNavigator();

const HomeTopTab = () => {

  return (
    <Tab.Navigator
    initialRouteName="OwnRecipes"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: {
          backgroundColor: 'black', // Color de la línea indicadora
        },
        tabBarStyle: styles.tab,
        tabBarLabelStyle: { fontSize: 14, marginTop: 2 },
        
      }}
    >
      <Tab.Screen name="Inspiración" component={DiscoverRecipesScreen} />
      <Tab.Screen name="Tus recetas" component={OwnRecipesScreen} />
    </Tab.Navigator>
  );

}


const styles = StyleSheet.create({
  tab: { 
    height: 40,
    textAlign: 'center',
    alignContent: 'center',
    backgroundColor: Colors.secondary,
  },
});

export default HomeTopTab;