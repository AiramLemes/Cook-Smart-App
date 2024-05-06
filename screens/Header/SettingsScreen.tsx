import * as Linking from 'expo-linking';
import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from 'react-native-iconify';
import LanguagePicker from "../../components/LanguagePicker";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import { auth } from "../../firebaseConfig";
import User from "../../model/User";
import { getCurrentUser } from "../../repository/FirebaseUser";

const imageDimensions = (Dimensions.get('window').width / 2) - (10 * 2);
const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 24;

// @ts-ignore
const SettingsScreen = ({navigation}) => {

  const [user, setUser] = useState<User | null>(null);

  const Strings = useContext(LanguageContext);

  

  useEffect(() => {
    const getUser = async () => {
      setUser(await getCurrentUser());
    };

    getUser();
  }, []);



  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
        <Iconify icon="lets-icons:back" size={33} color="black"/>
      </TouchableOpacity>

      <View style={{alignContent: 'center'}}>
        <Image
          source={{ uri: user?.image }}
          style={styles.userImage}
        />

        <Text style={styles.userName}>@{user?.userName}</Text>
      </View>

      <View>

        <LanguagePicker/>

        <TouchableOpacity style={styles.buttonWithIcon} onPress={() => {Linking.openURL('mailto:support@cooksmartapp.com')}}>
          <Text style={styles.buttonText}>{Strings.t('contactUs')}</Text>
          <Iconify icon="game-icons:talk" size={24} color="black"/>
        </TouchableOpacity>

        
        <TouchableOpacity style={styles.buttonWithIcon} onPress={() => {Linking.openURL('https://airam28074.wixsite.com/cooksmart-app')}}>
          <Text style={styles.buttonText}>{Strings.t('aboutApp')}</Text>
          <Iconify icon="material-symbols:info-outline" size={24} color="black"/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWithIcon} onPress={() => {navigation.navigate('UserProfile')}}>
          <Text style={styles.buttonText}>{Strings.t('profile')}</Text>
          <Iconify icon="mdi:user" size={24} color="black"/>
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={{...styles.logOutButton, backgroundColor: Colors.secondary}} onPress={() => {signOut(auth)}}>
        <Text style={styles.buttonText}>{Strings.t('logOut')}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

export default SettingsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: Colors.background,
    width: '100%',
  },
  
  
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 10,
    zIndex: 1
  },

  userImage: {
    width: imageDimensions,
    height: imageDimensions,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: Colors.imageBorder,
    marginBottom: 50,
    marginTop: 50,
    alignSelf: 'center'
  },

  picker: {
    flexDirection: 'row',
    backgroundColor: 'rgba(254, 211, 77, 0.28)',
    borderRadius: 100,
    width: '80%',
    height: 40,
    marginTop: 25,
    paddingHorizontal: 10, // Añade algún espacio entre el texto y el icono
  },

  buttonWithIcon: {
    flexDirection: 'row', // Alinea el texto y el icono en la misma fila
    justifyContent: 'space-between', // Espacio entre el texto y el icono
    alignItems: 'center', // Centra verticalmente el texto y el icono
    borderRadius: 10,
    backgroundColor: 'rgba(254, 211, 77, 0.28)',
    width: '80%',
    height: 40,
    marginTop: 25,
    paddingHorizontal: 10, // Añade algún espacio entre el texto y el icono.
    alignSelf: 'center'
  },

  logOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    width: '80%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40
  },

  userName: {
    textAlign: "center",
    fontSize: adjustedFontSize
  },

  buttonText: {
    fontSize: adjustedFontSize,
    letterSpacing: 0.25,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },
});
