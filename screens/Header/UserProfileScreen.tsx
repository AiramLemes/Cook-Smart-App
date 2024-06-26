import * as ImagePicker from 'expo-image-picker';
import { sendPasswordResetEmail, updateEmail } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, PixelRatio, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import Toast from "react-native-root-toast";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import { auth } from "../../firebaseConfig";
import User from "../../model/User";
import { checkEmail, checkEmailPattern, checkUserName, getCurrentUser, updateUser, uploadImageAsync } from "../../repository/FirebaseUser";
import ToastUtil from "../../utils/ToastUtil";

const imageDimensions = (Dimensions.get('window').width / 2) - (10 * 2);
const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 24;

//@ts-ignore
const UserProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [userName, setUserName] = useState<string>("");

  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const Strings = useContext(LanguageContext);
  
  useEffect(() => {
    const getUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
      setImage(user?.image);
    };

    getUser();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri: string = result.assets[0].uri;

      if (await uploadImageAsync(uri)) {
        setImage(uri);
        ToastUtil.showToast(Strings.t('updateImage'), Toast.durations.SHORT);
      }
      else {
        ToastUtil.showToast(Strings.t('errorUpdatingImage'), Toast.durations.SHORT);
      }
      
    }
  };


  async function handleUpdateEmail() {
    if (email) {
      if (checkEmailPattern(email)) {

        if (await checkEmail(email)) {
          updateEmail(auth.currentUser!!, email).then(() => {
            ToastUtil.showToast(Strings.t('updateEmailMsg'), Toast.durations.SHORT);
            setEmailError(false);
          }).catch((e) => {
            console.log(e);
            
            ToastUtil.showToast(Strings.t('errorUpdatingEmail'), Toast.durations.SHORT);
          });
        }
    
        else {
          setEmailError(true);
          ToastUtil.showToast(Strings.t('errorCheckingEmail'), Toast.durations.SHORT);
        }
      }
      else {
        ToastUtil.showToast(Strings.t('invalidEmail'), Toast.durations.SHORT);
      }
    }
    else {
      ToastUtil.showToast(Strings.t('emptyEmail'), Toast.durations.SHORT);
    }
   
  }

  async function handleUpdateUserName() {
    if (userName) {
      if (await checkUserName(userName)) {
        let message;

        const result = await updateUser({userName: userName});

        if (result) {
          message = Strings.t('changeUserNameMsg')
        } 
        else {
          message = Strings.t('errorChangingUserName');
        }  

        ToastUtil.showToast(message, Toast.durations.SHORT);
        
        if (result) {
          const updatadedUser = {
            ...user!!,
            userName: userName,
          };
          setUser(updatadedUser);
          setUserName("");
          setUserNameError(false);
        }

      }
      else {
        ToastUtil.showToast(Strings.t('usedUserName'), Toast.durations.SHORT);
        setUserNameError(true);
      }
    }
    else {
      ToastUtil.showToast(Strings.t('emptyUserName'), Toast.durations.SHORT);
    }
  }

  function handleChangePassword() {
    sendPasswordResetEmail(auth, user!!.email)
    ToastUtil.showToast(Strings.t('recoverPasswordMsg'), Toast.durations.SHORT);
  }

  return (

    <ScrollView style={styles.scrollViewContent}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.topButtons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Iconify icon="lets-icons:back" size={33} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('LikedRecipes')}>
            <Text style={{marginRight: 10}}>{Strings.translate('favouriteRecipes')}</Text>
            <Iconify icon="solar:list-heart-minimalistic-bold" size={33} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imageSection} onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.userImage} />
        </TouchableOpacity>
          <Text style={styles.imageSectionText}>{Strings.t('changeProfileImage')}</Text>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>{Strings.t('userName')}</Text>
          <View style={styles.userDataInputWithIcon}>
            <Text style={styles.userDataInputText}>{user?.userName}</Text>
            <Iconify icon="mdi:user" size={24} color="black" />
          </View>
        </View>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>{Strings.t('email')}</Text>
          <View style={styles.userDataInputWithIcon}>
            <Text style={styles.userDataInputText}>{user?.email}</Text>
            <Iconify icon="ic:baseline-email" size={24} color="black" />
          </View>
        </View>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>{Strings.t('changeEmail')}</Text>
          <TextInput style={[styles.userDataInputWithIcon, emailError ? {color: Colors.error} : {color: Colors.black}]} 
            value={email} keyboardType='email-address' onChangeText={setEmail} placeholder="prueba@prueba.com"/>          
        </View>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>{Strings.t('changeUserName')}</Text>
          <TextInput style={[styles.userDataInputWithIcon, userNameError ? {color: Colors.error} : {color: Colors.black}]} 
          value={userName} onChangeText={setUserName} placeholder="@NuevoNombreUsuario"/>          
        </View>

        <View style={styles.sectionUserData}>
          <TouchableOpacity style={styles.button} onPress={() => {handleUpdateEmail()}}>
            <Text style={styles.buttonText}>{Strings.t('updateEmail')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionUserData}>
          <TouchableOpacity style={styles.button} onPress={() => {handleUpdateUserName()}}>
            <Text style={styles.buttonText}>{Strings.t('updateUserName')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionUserData}>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>{Strings.t('changePassword')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>


  );
};

const styles = StyleSheet.create({

  scrollViewContent: {
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20, 
    paddingTop: 10
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10
  },

  topButtons: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%'
  },

  userImage: {
    width: imageDimensions,
    height: imageDimensions,
    borderRadius: 200,
    borderColor: Colors.imageBorder,
    borderWidth: 1,
    marginTop: 40
  },

  imageSectionText: {
    fontSize: adjustedFontSize,
    marginBottom: 50
  },

  sectionUserData: {
    width: '100%',
    marginBottom: 20,
  },

  userDataTitle: {
    textAlign: 'left',
    fontSize: adjustedFontSize,
    margin: 10,
  },

  userDataInputWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(254, 211, 77, 0.28)',
    paddingHorizontal: 10,
  },

  userDataInputText: {
    fontSize: adjustedFontSize,
    letterSpacing: 0.25,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: Colors.primary,
    height: 40,
    marginTop: 10,
  },

  buttonText: {
    fontSize: adjustedFontSize,
    letterSpacing: 0.25,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },
});

export default UserProfileScreen;
