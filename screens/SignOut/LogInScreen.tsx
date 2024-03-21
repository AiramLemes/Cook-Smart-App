import React, { useContext, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundSVG from "../../assets/landing/BackgroundSVG";
import ChatGPTSVG from "../../assets/landing/ChatGPTSVG";
import LogoSVG from "../../assets/landing/LogoSVG";
import PoweredSVG from "../../assets/landing/PoweredSVG";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import { checkEmailPattern, checkPassword, logIn } from "../../repository/FirebaseUser";
import ToastUtil from "../../utils/ToastUtil";



// @ts-ignore
const LoginScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const Strings = useContext(LanguageContext);

  async function handleLogIn() {

    if (email && password) {

      const isValidEmail = checkEmailPattern(email);
      setEmailError(!isValidEmail);
      const isValidPassword= checkPassword(password);
      setPasswordError(!isValidPassword);

      if (isValidEmail && isValidPassword) {
        await logIn(email, password)? ToastUtil.showToast(Strings.t('logInMessage'), Toast.durations.SHORT) : 
        ToastUtil.showToast(Strings.t('wrongLogInMessage'), Toast.durations.SHORT);
      }

      else {
        ToastUtil.showToast(Strings.t('emptyInputs'), Toast.durations.SHORT);
      }
    }

    else {
      ToastUtil.showToast(Strings.t('emptyInputs'), Toast.durations.SHORT);
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

      <TextInput style={[styles.emailInput, emailError && styles.errorInput]}
        value={email} inputMode="email" autoCapitalize="none" 
        keyboardType="email-address" onChangeText={setEmail} placeholder={Strings.t('email')}/>

        {emailError && (
          <Text style={styles.errorMessage}>{Strings.t('invalidEmail')}</Text>
        )}
        

      <TextInput style={[styles.passwordInput, passwordError && styles.errorInput]}
        value={password} onChangeText={setPassword} placeholder={Strings.t('password')}
        secureTextEntry={true} autoCorrect={false}/>

        {passwordError && (
          <Text style={styles.errorMessage}>{Strings.t('invalidPassword')}</Text>
        )}

      <TouchableOpacity style={styles.logInButton} onPress={handleLogIn}>
        <Text style={styles.buttonText}>{Strings.t('logIn')}</Text>
      </TouchableOpacity>
      

        <View style={styles.poweredSection}>

          <ChatGPTSVG style={styles.poweredSectionSVG} ></ChatGPTSVG>
          <PoweredSVG style={styles.poweredSectionSVG}/>
        </View>

        <Text style={styles.poweredIATitle}>{Strings.t('powered')}</Text>

        <Text style={styles.registerNav} onPress={() => navigation.navigate('Register')}>{Strings.t('register')}</Text>

    </SafeAreaView>
  );
}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },

  title: {
    fontSize: 22,
    padding: 20
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },


  emailInput: {
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

  passwordInput: {
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

  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },

  errorMessage: {
    fontSize: 10,
    color: Colors.error
  },

  logInButton: {
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

  registerNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 16, 
    textDecorationLine: "underline"
  }
});
