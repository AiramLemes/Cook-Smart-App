import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import LanguageContext from "../context/LanguageProvider";
import PantryScreen from "../screens/PantryScreen";
import ScanScreen from "../screens/ScanScreen";
import SearchScreen from "../screens/SearchScreen";
import HomeTopTab from "./HomeTopTab";
import AIScreen from '../screens/AIScreen';


const Tab = createBottomTabNavigator();

const imageDimensions = (Dimensions.get('window').width / 8);
const iconDimension = (Dimensions.get('window').width / 16);

const BottomTab = () => {
  
  const Strings = useContext(LanguageContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: Colors.secondary}
      }}
    >
      <Tab.Screen
        name={Strings.t('home')}
        component={HomeTopTab}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={iconDimension} />
          ),
          tabBarAllowFontScaling: true
        }}
      />


      <Tab.Screen
        name={Strings.t('pantry')}
        component={PantryScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fridge-outline" color={color} size={iconDimension} />
            ),
            tabBarAllowFontScaling: true
          }}
      />

      <Tab.Screen
        name={Strings.t('search')}
        component={SearchScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={iconDimension} />
          ),
          tabBarAllowFontScaling: true
        }}
      />


      <Tab.Screen
        name={Strings.t('scan')}
        component={ScanScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={iconDimension} />
          ),
          tabBarAllowFontScaling: true
        }}
      />

      <Tab.Screen
        name={Strings.t('ai')}
        component={AIScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Iconify icon="fluent:brain-circuit-24-regular" color={color} size={iconDimension}/>
            ),
            tabBarAllowFontScaling: true
          }}
      />

    </Tab.Navigator>
    </KeyboardAvoidingView>
  );

}

export default BottomTab;