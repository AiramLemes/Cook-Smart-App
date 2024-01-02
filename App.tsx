import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { auth } from './firebaseConfig';
import { User } from 'firebase/auth';
import IndexScreen from './screens/SignOut/IndexScreen';
import LoginScreen from './screens/SignOut/LogInScreen';
import RegisterScreen from './screens/SignOut/RegisterScreen';
import BottomTab from './navigation/BottomTab';
import Header from './navigation/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNav from './navigation/StackNav';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  function isSignedIn(): boolean {
    return user !== null;
  }

  return (
    <SafeAreaProvider>
      <RootSiblingParent>
        <NavigationContainer>
          {isSignedIn() ? (
            <>
            <Header/>
              <StackNav navigation={undefined}/>
            </>
          ) : (
            <>
              <Stack.Navigator>
                <Stack.Screen
                  name='Index'
                  component={IndexScreen}
                  options={{ headerShown: false }}
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
            </>
          )}
        </NavigationContainer>
      </RootSiblingParent>
    </SafeAreaProvider>
  );
}

export default App;
