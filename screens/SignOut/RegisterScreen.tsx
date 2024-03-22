import React, { useContext, useState } from "react";
import { Dimensions, PixelRatio, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundSVG from "../../assets/landing/BackgroundSVG";
import ChatGPTSVG from "../../assets/landing/ChatGPTSVG";
import LogoSVG from "../../assets/landing/LogoSVG";
import PoweredSVG from "../../assets/landing/PoweredSVG";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import { checkEmail, checkEmailPattern, checkPassword, checkUserName, createUser } from "../../repository/FirebaseUser";
import ToastUtil from "../../utils/ToastUtil";


const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 24;

// @ts-ignore
const RegisterScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [usedEmailError, setUsedEmailError] = useState<boolean>(false);

  const Strings = useContext(LanguageContext);


  async function register() {
    
    if (email && password && userName) {

      const isValidEmail = checkEmailPattern(email);
      setEmailError(!isValidEmail);
      const isValidPassword= checkPassword(password);
      setPasswordError(!isValidPassword);
      const isValidUserName = await checkUserName(userName);
      setUserNameError(!isValidUserName);

      if (isValidEmail && isValidPassword && isValidUserName) {

        if (await checkEmail(email)) {
          setUsedEmailError(false);
          if (await createUser(email, password, userName)) {
            ToastUtil.showToast(Strings.t('createUser'), Toast.durations.SHORT);
          }
          
          else {
            ToastUtil.showToast(Strings.t('generalError'), Toast.durations.SHORT);
          }
        }

        else {
          ToastUtil.showToast(Strings.t('createUserError'), Toast.durations.SHORT);
          setUsedEmailError(true);
        }
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
       
      <ScrollView style={{width: '100%', flexGrow: 1}} contentContainerStyle={[styles.container]}>

        <BackgroundSVG style={styles.background}></BackgroundSVG>
      
          <LogoSVG/>
        <Text style={styles.title} >COOK SMART !</Text>

        <TextInput style={[styles.inputs, userNameError && styles.errorInput]} placeholder={Strings.t('userName')}
          value={userName} onChangeText={setUserName}/>
          {userNameError && (
            <Text style={styles.errorMessage}>{Strings.t('invalidUserName')}</Text>
          )}


        <TextInput style={[styles.inputs, emailError && styles.errorInput, usedEmailError && styles.errorInput, {backgroundColor: Colors.secondary}]}
          value={email} inputMode="email" autoCapitalize="none" 
          keyboardType="email-address" onChangeText={setEmail} placeholder={Strings.t('email')}/>

        {emailError && (
          <Text style={styles.errorMessage}>{Strings.t('invalidEmail')}</Text>
        )}

        {usedEmailError && (
          <Text style={styles.errorMessage}>{Strings.t('usedEmail')}</Text>
        )}

        <TextInput style={[styles.inputs, passwordError && styles.errorInput, {backgroundColor: Colors.terciary}]}
          value={password} onChangeText={setPassword} placeholder="Contraseña"
          secureTextEntry={true} autoCorrect={false}/>

        {passwordError && (
          <Text style={styles.errorMessage}>{Strings.t('invalidPassword')}</Text>
        )}


        <TouchableOpacity style={{...styles.inputs, backgroundColor: Colors.cuaternary}} onPress={register}>
          <Text style={styles.buttonText}>{Strings.t('register')}</Text>
        </TouchableOpacity>
      

        <View style={styles.poweredSection}>

          <ChatGPTSVG style={styles.poweredSectionSVG} ></ChatGPTSVG>
          <PoweredSVG style={styles.poweredSectionSVG}/>
        </View>

        <Text style={styles.poweredIATitle}>{Strings.t('powered')}</Text>

        <Text style={styles.LogInNav} onPress={() => navigation.navigate('Login')}>{Strings.t('logIn')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },

  title: {
    fontSize: 22,
    padding: 20,
  },

  background: {
    ...StyleSheet.absoluteFillObject
  },

  inputs: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.primary,
    width: '75%',
    fontSize: adjustedFontSize,
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.cuaternary,
    width: '75%',
    marginTop: 30,
  },

  buttonText: {
    fontSize: adjustedFontSize,
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
    marginTop: 20, // Opcional: para ajustar el espacio en la parte superior,
  },

  poweredSectionSVG: {
    width: 40,
    height: 40,
    margin: 30,
  },

  poweredIATitle: {
    fontSize: adjustedFontSize,
    margin: 50,
  },

  LogInNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 16, 
    textDecorationLine: "underline"
  }
});
