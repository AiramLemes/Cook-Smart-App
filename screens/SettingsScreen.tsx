import { Pressable, SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import BackIcon from "../assets/icons/BackIcon";
import User from "../model/user";
import { getUserData, loadUserData } from "../model/FirebaseUser";
import { auth } from "../firebaseConfig";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Iconify } from 'react-native-iconify';

// @ts-ignore
const SettingsScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();
  const [userData, setUserData] = useState<User | null>(null);

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
      <SafeAreaView style={{...styles.container, paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,}}>
  
        <Pressable style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Iconify icon="lets-icons:back" size={33} color="black"/>
        </Pressable>
  
        <View style={{marginBottom: 20}}>
          <Image
            source={{ uri: userData?.imageURL }}
            style={styles.userImage}
          />
  
          <Text style={styles.userName}>@{userData?.userName}</Text>
        </View>
  
        <View>
          <Pressable style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>Idioma</Text>
            <Iconify icon="emojione-v1:flag-for-spain" size={24} color="black"/>
          </Pressable>
  
          <Pressable style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>Contáctanos</Text>
            <Iconify icon="game-icons:talk" size={24} color="black"/>
          </Pressable>

          <Pressable style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>Tema</Text>
            <Iconify icon="fluent:dark-theme-24-regular" size={24} color="black"/>
          </Pressable>

          <Pressable style={styles.buttonWithIcon}>
            <Text style={styles.buttonText}>Sobre la app</Text>
            <Iconify icon="material-symbols:info-outline" size={24} color="black"/>
          </Pressable>

          <Pressable style={styles.buttonWithIcon} onPress={() => {navigation.navigate('UserProfile')}}>
            <Text style={styles.buttonText}>Mi Perfil</Text>
            <Iconify icon="mdi:user" size={24} color="black"/>
          </Pressable>
  
        </View>
  
        <Pressable style={{...styles.logOutButton, backgroundColor: Colors.secondary}} onPress={() => {auth.signOut()}}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>
  
      </SafeAreaView>
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
    width: 140,
    height: 140,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: Colors.imageBorder,
    marginBottom: 20,
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
