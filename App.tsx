import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import IndexScreen from './screens/IndexScreen';
import LoginScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen
            name='Index'
            component={IndexScreen}
            options={{ headerShown: false,}}
            
          />

          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
 
  );
}

export default App;
