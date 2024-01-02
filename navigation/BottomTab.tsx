import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../screens/HomeScreen";
import IAScreen from "../screens/IAScreen";
import PantryScreen from "../screens/PantryScreen";
import QRScreen from "../screens/QRScreen";
import SearchScreen from "../screens/SearchScreen";
import React from "react";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Iconify } from "react-native-iconify";


const Tab = createBottomTabNavigator();

const BottomTab = () => {

  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: Colors.secondary }
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={size} />
          ),
        }}
      />


      <Tab.Screen
        name='Pantry'
        component={PantryScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="fridge-outline" color={color} size={size} />
            ),
          }}
      />

      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />


      <Tab.Screen
        name='QR'
        component={QRScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='IA'
        component={IAScreen}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Iconify icon="fluent:brain-circuit-24-regular" size={size} color={color}/>
            ),
          }}
      />

    </Tab.Navigator>
  );

}

export default BottomTab;