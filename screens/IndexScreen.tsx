import { Pressable, StyleSheet, Text, View } from "react-native";
import BackgroundSVG from "../assets/landing/BackgroundSVG";
import LogoSVG from "../assets/landing/LogoSVG";
import React from "react";
import Colors from "../constants/Colors";
import ChatGPTSVG from "../assets/landing/ChatGPTSVG";
import PoweredSVG from "../assets/landing/PoweredSVG";


const IndexScreen = () => {
  
  return (
    <View style={styles.container}>
       <BackgroundSVG style={styles.background}></BackgroundSVG>
    
        <LogoSVG style={styles.brand}/>
        <Text style={styles.title} >COOK SMART !</Text>

       
          <Pressable style={styles.logInButton}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>
     
  
          <Pressable style={styles.registerButton}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </Pressable>
       

        <View style={styles.poweredSection}>

          <ChatGPTSVG style={styles.poweredSectionSVG} ></ChatGPTSVG>
          <PoweredSVG style={styles.poweredSectionSVG}/>
        </View>

        <Text style={styles.poweredIATitle}>Potenciado por IA</Text>

      </View>
  );
}

export default IndexScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
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
  
  logInButton: {
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

  registerButton: {
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
  
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    textAlign: 'center'
  },
  
  poweredSection: {
    flexDirection: 'row',
    width: 200,
    height: 50,
    justifyContent: 'space-around',
    marginTop: 20 // Opcional: para ajustar el espacio en la parte superior
  },

  brand: {
    marginTop: 120
  },
  
  poweredSectionSVG: {
    width: 40,
    height: 40,
    margin: 30
  },

  poweredIATitle: {
    fontSize: 18,
    margin: 50
  }
});
