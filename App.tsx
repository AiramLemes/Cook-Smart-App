import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';
import { auth } from './firebaseConfig';
import { User } from 'firebase/auth';
import IndexScreen from './screens/SignOut/IndexScreen';
import LoginScreen from './screens/SignOut/LogInScreen';
import RegisterScreen from './screens/SignOut/RegisterScreen';
import Header from './navigation/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNav from './navigation/StackNav';
import { useState, useEffect, createContext } from 'react';
import { I18n } from 'i18n-js';
import { loadLanguagePreference, loadTranslations } from './constants/Strings';
import LanguageContext from './context/LanguageProvider';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [Strings, setStrings] = useState(new I18n);

  useEffect(() => {

    const translations = async () => {
      await loadLanguagePreference(Strings);
      await loadTranslations(Strings, Strings.locale);
      setStrings(Strings);  
    }
    
    const setNotifications = async () => {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
    
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      SplashScreen.hideAsync();
    });

    translations();
    SplashScreen.preventAutoHideAsync();

    return () => unsubscribe();
  }, [Strings.onChange]);

  function isSignedIn(): boolean {
    return user !== null;
  }

  return (
    <SafeAreaProvider>
      <LanguageContext.Provider value={Strings}>
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
      </LanguageContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
