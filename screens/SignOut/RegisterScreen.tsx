import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BackgroundSVG from "../../assets/landing/BackgroundSVG";
import LogoSVG from "../../assets/landing/LogoSVG";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import ChatGPTSVG from "../../assets/landing/ChatGPTSVG";
import PoweredSVG from "../../assets/landing/PoweredSVG";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth, firestore } from "../../firebaseConfig";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import ToastUtil from "../../utils/ToastUtil";
import Toast from "react-native-root-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import User from "../../model/User";
import { checkEmailPattern, checkPassword, checkUserName } from "../../repository/FirebaseUser";

// @ts-ignore
const RegisterScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [usedEmail, setUsedEmail] = useState<boolean>(false);

  


  async function register() {
    
    if (email && password && userName) {

      const isValidEmail = checkEmailPattern(email);
      setEmailError(!isValidEmail);
      const isValidPassword= checkPassword(password);
      setPasswordError(!isValidEmail);
      const isValidUserName = await checkUserName(userName);
      setUserNameError(!isValidUserName);

      if (isValidEmail && isValidPassword && isValidUserName) {
        try {
          const userId = (await createUserWithEmailAndPassword(auth, email, password)).user.uid

          const newUser: User = {
            userName: userName,
            email: email,
            image: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/usersImageProfile%2Fdefault.png?alt=media&token=71b49402-5589-4501-88bd-2cc7c56911c0'
          };

          const usersDoc = doc(collection(firestore, 'users'), userId);
          await setDoc(usersDoc, newUser).then(() => {
            ToastUtil.showToast("Usuario creado correctamente!", Toast.durations.SHORT);
          })
        } catch(e) {
          ToastUtil.showToast("Se ha producido un error, por favor, inténtelo de nuevo", Toast.durations.SHORT)
        }
      }

      else {
        ToastUtil.showToast("Por favor, revise todos los campos",
          Toast.durations.SHORT)
      }
    }

  }


  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
       
  
      <BackgroundSVG style={styles.background}></BackgroundSVG>
     
    
      <LogoSVG/>

      <Text style={styles.title} >COOK SMART !</Text>

      <TextInput style={[styles.userNameInput, userNameError && styles.errorInput]} placeholder="Nombre de usuario"
        value={userName} onChangeText={setUserName}/>
        {userNameError && (
          <Text style={styles.errorMessage}>Nombre de usuario en uso!</Text>
        )}


      <TextInput style={[styles.emailInput, emailError && styles.errorInput]}
        value={email} inputMode="email" autoCapitalize="none" 
        keyboardType="email-address" onChangeText={setEmail} placeholder="Correo Electrónico"/>

        {emailError && (
          <Text style={styles.errorMessage}>Correo electrónico {usedEmail? "invalido": "en uso"}</Text>
        )}

      <TextInput style={[styles.passwordInput, passwordError && styles.errorInput]}
        value={password} onChangeText={setPassword} placeholder="Contraseña"
        secureTextEntry={true} autoCorrect={false}/>

        {passwordError && (
          <Text style={styles.errorMessage}>La contraseña debe tener un mínimo de 6 caracteres</Text>
        )}


      <TouchableOpacity style={styles.registerButton} onPress={register}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      

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

  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },

  errorMessage: {
    fontSize: 10,
    color: Colors.error
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
