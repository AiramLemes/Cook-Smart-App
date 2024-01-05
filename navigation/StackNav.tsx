import React from "react";
import SettingsScreen from "../screens/Header/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import UserProfileScreen from "../screens/Header/UserProfileScreen";
import ProductScreen from "../screens/ProductScreen";

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

  </Stack.Navigator>
);

export default StackNav;
