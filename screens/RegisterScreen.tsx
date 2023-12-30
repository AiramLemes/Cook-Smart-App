import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import BackgroundSVG from "../assets/landing/BackgroundSVG";
import LogoSVG from "../assets/landing/LogoSVG";
import React from "react";
import Colors from "../constants/Colors";
import ChatGPTSVG from "../assets/landing/ChatGPTSVG";
import PoweredSVG from "../assets/landing/PoweredSVG";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// @ts-ignore
const RegisterScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
       
  
      <BackgroundSVG style={styles.background}></BackgroundSVG>
     
    
      <LogoSVG/>

      <Text style={styles.title} >COOK SMART !</Text>

      <TextInput style={styles.userNameInput} placeholder="Nombre de usuario"/>

      <TextInput style={styles.emailInput} placeholder="Correo electrónico"/>

      <TextInput style={styles.passwordInput} placeholder="Contraseña" secureTextEntry={true} autoCorrect={false}/>

      <Pressable style={styles.registerButton}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
      

        <View style={styles.poweredSection}>

          <ChatGPTSVG style={styles.poweredSectionSVG} ></ChatGPTSVG>
          <PoweredSVG style={styles.poweredSectionSVG}/>
        </View>

        <Text style={styles.poweredIATitle}>Potenciado por IA</Text>

        <Text style={styles.LogInNav} onPress={() => navigation.navigate('Login')}>Iniciar sesión</Text>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },

  title: {
    fontSize: 22,
    padding: 20
  },

  background: {
    ...StyleSheet.absoluteFillObject
  },


  userNameInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.primary,
    width: 300,
    marginTop: 30
  },

  emailInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.secondary,
    width: 300,
    marginTop: 30
  },

  passwordInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.terciary,
    width: 300,
    marginTop: 30
  },

  registerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.cuaternary,
    width: 300,
    marginTop: 30
  },

  buttonText: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textDecorationLine: 'underline',
  },

  poweredSection: {
    flexDirection: 'row',
    width: 200,
    height: 50,
    justifyContent: 'space-around',
    marginTop: 20 // Opcional: para ajustar el espacio en la parte superior
  },

  poweredSectionSVG: {
    width: 40,
    height: 40,
    margin: 30
  },

  poweredIATitle: {
    fontSize: 14,
    margin: 50
  },

  LogInNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 16, 
    textDecorationLine: "underline"
  }
});
