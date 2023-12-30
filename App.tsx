import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './screens/IndexScreen';
import LoginScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name=' ' component={IndexScreen}  
        options={{ headerShown: false,}} />

        <Stack.Screen name='  ' component={LoginScreen}  
        options={{ headerShown: false,}} />

        <Stack.Screen name='   ' component={RegisterScreen}  
        options={{ headerShown: false,}} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;