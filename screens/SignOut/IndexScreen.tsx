import React, { useContext } from "react";
import { Dimensions, PixelRatio, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundSVG from "../../assets/landing/BackgroundSVG";
import ChatGPTSVG from "../../assets/landing/ChatGPTSVG";
import LogoSVG from "../../assets/landing/LogoSVG";
import PoweredSVG from "../../assets/landing/PoweredSVG";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";

const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 24;

// @ts-ignore
const IndexScreen = ({navigation}) => {

  const insets = useSafeAreaInsets();
  const Strings = useContext(LanguageContext);

  

  return (
    <SafeAreaView style={{...styles.container, paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,}}>
       <BackgroundSVG style={styles.background}></BackgroundSVG>
    
        <LogoSVG/>
        <Text style={styles.title} >COOK SMART !</Text>

       
          <TouchableOpacity style={styles.buttons}  onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>{Strings.t('logIn')}</Text>
          </TouchableOpacity>
     
  
          <TouchableOpacity style={{...styles.buttons, backgroundColor: Colors.secondary}} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>{Strings.t('register')}</Text>
          </TouchableOpacity>
       

        <View style={styles.poweredSection}>

          <ChatGPTSVG style={styles.poweredSectionSVG} ></ChatGPTSVG>
          <PoweredSVG style={styles.poweredSectionSVG}/>
        </View>

        <Text style={styles.poweredIATitle}>{Strings.t('powered')}</Text>

      </SafeAreaView>
  );
}

export default IndexScreen;


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
  background: {
    ...StyleSheet.absoluteFillObject
  },
  
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '6%',
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.primary,
    width: '75%',
    marginTop: 30
  },

  
  buttonText: {
    fontSize: adjustedFontSize,
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
  
  poweredSectionSVG: {
    width: 40,
    height: 40,
    margin: 30
  },

  poweredIATitle: {
    fontSize: adjustedFontSize,
    margin: 50
  }
});
