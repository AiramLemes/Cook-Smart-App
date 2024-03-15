import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import User from "../../model/User";
import { getUserData, loadUserData } from "../../repository/FirebaseUser";
import { auth } from "../../firebaseConfig";
import { Iconify } from 'react-native-iconify';
import LanguagePicker from "../../components/LanguagePicker";
import LanguageContext from "../../context/LanguageProvider";

// @ts-ignore
const SettingsScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState<User | null>(null);

  const Strings = useContext(LanguageContext);
  

  useEffect(() => {
    const fetchData = async () => {
      await loadUserData();
      const user = getUserData();
      // @ts-ignore
      setUserData(user)
    };

    fetchData();
  }, []);



    return (
      <View style={styles.container}>
  
        <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Iconify icon="lets-icons:back" size={33} color="black"/>
        </TouchableOpacity>
  
        <View>
          <Image
            source={{ uri: userData?.image }}
            style={styles.userImage}
          />
  
          <Text style={styles.userName}>@{userData?.userName}</Text>
        </View>
  
        <View>

          <LanguagePicker/>

          <TouchableOpacity style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>{Strings.t('contactUs')}</Text>
            <Iconify icon="game-icons:talk" size={24} color="black"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>{Strings.t('theme')}</Text>
            <Iconify icon="fluent:dark-theme-24-regular" size={24} color="black"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>{Strings.t('aboutApp')}</Text>
            <Iconify icon="material-symbols:info-outline" size={24} color="black"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWithIcon} onPress={() => {navigation.navigate('UserProfile')}}>
            <Text style={styles.buttonText}>{Strings.t('profile')}</Text>
            <Iconify icon="mdi:user" size={24} color="black"/>
          </TouchableOpacity>
  
        </View>
  
        <TouchableOpacity style={{...styles.logOutButton, backgroundColor: Colors.secondary}} onPress={() => {auth.signOut()}}>
          <Text style={styles.buttonText}>{Strings.t('logOut')}</Text>
        </TouchableOpacity>
  
      </View>
    );
}

export default SettingsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  
  title: {
    fontSize: 22,
    padding: 20
  },
  
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 10,
  },

  userImage: {
    width: 160,
    height: 160,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: Colors.imageBorder,
    marginBottom: 20,
  },

  picker: {
    flexDirection: 'row',
    backgroundColor: 'rgba(254, 211, 77, 0.28)',
    borderRadius: 100,
    width: 330,
    height: 40,
    marginTop: 25,
    // paddingHorizontal: 10, // Añade algún espacio entre el texto y el icono
  },

  buttonWithIcon: {
    flexDirection: 'row', // Alinea el texto y el icono en la misma fila
    justifyContent: 'space-between', // Espacio entre el texto y el icono
    alignItems: 'center', // Centra verticalmente el texto y el icono
    borderRadius: 10,
    backgroundColor: 'rgba(254, 211, 77, 0.28)',
    width: 330,
    height: 40,
    marginTop: 25,
    paddingHorizontal: 10, // Añade algún espacio entre el texto y el icono
  },

  logOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    width: 330,
    marginTop: 40
  },

  userName: {
    textAlign: "center"
  },

  buttonText: {
    fontSize: 16,
    letterSpacing: 0.25,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },
});
