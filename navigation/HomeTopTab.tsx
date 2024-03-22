import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useContext } from "react";
import { Dimensions, PixelRatio, StyleSheet } from "react-native";
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';
import DiscoverRecipesScreen from '../screens/Home/DiscoverRecipesScreen';
import OwnRecipesScreen from '../screens/Home/OwnRecipesScreen';


const Tab = createMaterialTopTabNavigator();


const adjustedFontSize = PixelRatio.getFontScale() * Dimensions.get('window').width / 30;

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
        tabBarLabelStyle: { fontSize: adjustedFontSize, marginTop: 2 },
        
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