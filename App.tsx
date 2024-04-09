import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { User } from 'firebase/auth';
import { I18n } from 'i18n-js';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { loadLanguagePreference, loadTranslations } from './constants/Strings';
import LanguageContext from './context/LanguageProvider';
import { auth } from './firebaseConfig';
import Header from './navigation/Header';
import StackNav from './navigation/StackNav';
import IndexScreen from './screens/SignOut/IndexScreen';
import LoginScreen from './screens/SignOut/LogInScreen';
import RegisterScreen from './screens/SignOut/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [strings, setStrings] = useState(new I18n);

  useEffect(() => {

    const translations = async () => {
      await loadLanguagePreference(strings);
      await loadTranslations(strings, strings.locale);
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
    setNotifications();
    
    return () => unsubscribe();
  }, [strings.onChange]);

  function isSignedIn(): boolean {
    return user !== null;
  }

  return (
    <SafeAreaProvider>
      <LanguageContext.Provider value={strings}>
        <RootSiblingParent>
          <NavigationContainer>
            {isSignedIn() ? (
              <>
                <Header/>
                <StackNav navigation={undefined}/>
              </>
            ) : (
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
            )}
          </NavigationContainer>
        </RootSiblingParent>
      </LanguageContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
