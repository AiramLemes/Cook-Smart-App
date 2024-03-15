import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import SearchScreen from '../screens/SearchScreen';
import Colors from '../constants/Colors';
import OwnRecipesScreen from '../screens/Home/OwnRecipesScreen';
import DiscoverRecipesScreen from '../screens/Home/DiscoverRecipesScreen';
import LanguageContext from '../context/LanguageProvider';


const Tab = createMaterialTopTabNavigator();

const HomeTopTab = () => {

  const Strings = useContext(LanguageContext);
  
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
      <Tab.Screen name={Strings.translate('homeInspiration')} component={DiscoverRecipesScreen} />
      <Tab.Screen name={Strings.translate('homeUserRecipes')} component={OwnRecipesScreen} />
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