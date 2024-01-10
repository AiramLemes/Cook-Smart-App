import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Image, View, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { Iconify } from "react-native-iconify";
import User from "../../model/User";
import { checkEmail, checkEmailPattern, checkUserName, getUserData, loadUserData, updateUserName, uploadImageAsync } from "../../repository/FirebaseUser";
import * as ImagePicker from 'expo-image-picker';
import ToastUtil from "../../utils/ToastUtil";
import Toast from "react-native-root-toast";
import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail, updateCurrentUser, updateEmail, verifyPasswordResetCode } from "firebase/auth";


//@ts-ignore
const UserProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState<User | null>(null);
  const [image, setImage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  
  useEffect(() => {
    const fetchData = async () => {
      await loadUserData();
      const user = getUserData();
      // @ts-ignore
      setUserData(user);
      setImage(user!!.image);
    };

    fetchData();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri: string = result.assets[0].uri;

      if (await uploadImageAsync(uri)) {
        setImage(uri);
        ToastUtil.showToast('Imagen actualizada correctamente!', Toast.durations.SHORT);
      }
      else {
        ToastUtil.showToast('Error actualizando la imagen', Toast.durations.SHORT);
      }
      
    }
  };


  async function handleUpdateEmail() {
    if (email) {
      if (checkEmailPattern(email)) {

        if (await checkEmail(email)) {
          updateEmail(auth.currentUser!!, email).then(() => {
            ToastUtil.showToast("Correo electrónico actualizado correctamente", Toast.durations.SHORT);
          }).catch((e) => {
            console.log(e)
            ToastUtil.showToast("Se ha producido un error al actualizar el correo electrónico, por favor, inténtelo de nuevo", Toast.durations.SHORT);
          });
        }
    
        else {
          ToastUtil.showToast("Se ha producido un error al verificar el correo electrónico, por favor, inténtelo de nuevo", Toast.durations.SHORT);
        }
      }
      else {
        ToastUtil.showToast("Email inválido", Toast.durations.SHORT);
      }
    }
    else {
      ToastUtil.showToast("Email vacío!", Toast.durations.SHORT);
    }
   
  }

  async function handleUpdateUserName() {
    if (userName) {
      if (await checkUserName(userName)) {
        let message;
        const result = await updateUserName(userName)
        result ? message = "Nombre de usuario actualizado correctamente" : message = 'Se ha producido un error al actualizar el nombre de usuario';
          ToastUtil.showToast(message, Toast.durations.SHORT);
        
        if (result) {
          const user: User = {
            userName: userName,
            email: userData!!.email,
            image: userData!!.image
          };
          setUserData(user);
          setUserName("");
        }
      }
      else {
        ToastUtil.showToast("Nombre de usuario en uso!", Toast.durations.SHORT);
      }
    }
    else {
      ToastUtil.showToast("Nombre de usuario vacío!", Toast.durations.SHORT);
    }
  }

  function handleChangePassword() {
    sendPasswordResetEmail(auth, userData!!.email)
    ToastUtil.showToast("Se ha enviado un correo para recuperar la contraseña", Toast.durations.SHORT);
  }

  return (

    <ScrollView style={styles.scrollViewContent}>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Iconify icon="lets-icons:back" size={33} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageSection} onPress={pickImage}>
          <Image source={{ uri: image }} style={styles.userImage} />
        </TouchableOpacity>
          <Text style={styles.imageSectionText}>Toca para cambiar la foto de perfil!</Text>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>Nombre de usuario</Text>
          <View style={styles.userDataInputWithIcon}>
            <Text style={styles.userDataInputText}>{userData?.userName}</Text>
            <Iconify icon="mdi:user" size={24} color="black" />
          </View>
        </View>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>Email</Text>
          <View style={styles.userDataInputWithIcon}>
            <Text style={styles.userDataInputText}>{userData?.email}</Text>
            <Iconify icon="ic:baseline-email" size={24} color="black" />
          </View>
        </View>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>Cambiar email</Text>
          <TextInput style={styles.userDataInputWithIcon} value={email} onChangeText={setEmail} placeholder="prueba@prueba.com"/>          
        </View>

        <View style={styles.sectionUserData}>
          <Text style={styles.userDataTitle}>Cambiar nombre de usuario</Text>
          <TextInput style={styles.userDataInputWithIcon} value={userName} onChangeText={setUserName} placeholder="@NuevoNombreUsuario"/>          
        </View>

        <View style={styles.sectionUserData}>
          <TouchableOpacity style={styles.button} onPress={() => {handleUpdateEmail()}}>
            <Text style={styles.buttonText}>Actualizar email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionUserData}>
          <TouchableOpacity style={styles.button} onPress={() => {handleUpdateUserName()}}>
            <Text style={styles.buttonText}>Actualizar nombre de usuario</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionUserData}>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Cambiar contraseña</Text>
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
  },

  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 10,
  },

  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },

  userImage: {
    width: 160,
    height: 160,
    borderRadius: 200,
    borderColor: Colors.imageBorder,
    borderWidth: 1,
  },

  imageSectionText: {
    fontSize: 18,
    marginBottom: 50
  },

  sectionUserData: {
    width: '90%',
    marginBottom: 20,
  },

  userDataTitle: {
    textAlign: 'left',
    fontSize: 15,
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
    fontSize: 16,
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
    fontSize: 16,
    letterSpacing: 0.25,
    fontWeight: 'normal',
    color: 'black',
    textAlign: 'center',
  },
});

export default UserProfileScreen;
