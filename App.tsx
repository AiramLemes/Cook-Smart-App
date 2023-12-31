import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import IndexScreen from './screens/IndexScreen';
import LoginScreen from './screens/LogInScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <RootSiblingParent>
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
    </RootSiblingParent>
  );
}

export default App;
