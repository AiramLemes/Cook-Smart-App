import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import IAScreen from "../screens/IAScreen";
import PantryScreen from "../screens/PantryScreen";
import SearchScreen from "../screens/SearchScreen";
import React, { useContext } from "react";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Iconify } from "react-native-iconify";
import ScanScreen from "../screens/ScanScreen";
import { KeyboardAvoidingView, Platform } from "react-native";
import HomeTopTab from "./HomeTopTab";
import LanguageContext from "../context/LanguageProvider";


const Tab = createBottomTabNavigator();

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
        tabBarStyle: { backgroundColor: Colors.secondary }
      }}
    >
      <Tab.Screen
        name={Strings.t('home')}
        component={HomeTopTab}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />


      <Tab.Screen
        name={Strings.t('pantry')}
        component={PantryScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fridge-outline" color={color} size={size} />
            ),
          }}
      />

      <Tab.Screen
        name={Strings.t('search')}
        component={SearchScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />


      <Tab.Screen
        name={Strings.t('scan')}
        component={ScanScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={Strings.t('ai')}
        component={IAScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Iconify icon="fluent:brain-circuit-24-regular" size={size} color={color}/>
            ),
          }}
      />

    </Tab.Navigator>
    </KeyboardAvoidingView>
  );

}

export default BottomTab;