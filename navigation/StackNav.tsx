import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddRecipeForm1 from "../screens/AddRecipeForm1";
import AddRecipeForm2 from "../screens/AddRecipeForm2";
import SettingsScreen from "../screens/Header/SettingsScreen";
import UserProfileScreen from "../screens/Header/UserProfileScreen";
import ProductScreen from "../screens/ProductScreen";
import RecipeScreen from "../screens/RecipeScreen";
import BottomTab from "./BottomTab";

const Stack = createNativeStackNavigator();

// @ts-ignore
const StackNav = ({navigation}) => (
  <Stack.Navigator>

    <Stack.Screen
      name="HomeTab"
      component={BottomTab}
      options={{ headerShown: false}}
    />

    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: false}}
    />

    <Stack.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{ headerShown: false}}
    />

    <Stack.Screen
      name="Product"
      component={ProductScreen}
      options={{ headerShown: false}}
    />

    <Stack.Screen
      name="Recipe"
      component={RecipeScreen}
      options={{ headerShown: false}}
    />

    <Stack.Screen
      name="AddRecipeForm1"
      component={AddRecipeForm1}
      options={{ headerShown: false}}
    />

    <Stack.Screen
      name="AddRecipeForm2"
      component={AddRecipeForm2}
      options={{ headerShown: false}}
    />

  </Stack.Navigator>
);

export default StackNav;
