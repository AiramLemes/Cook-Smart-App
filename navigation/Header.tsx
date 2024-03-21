import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { getUserImage } from "../repository/FirebaseUser";

const Header = () => {
  
  const insets = useSafeAreaInsets();
  const [imageURL, setImageURL] = useState('https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/usersImageProfile%2Fdefault.png?alt=media&token=71b49402-5589-4501-88bd-2cc7c56911c0');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserImage = async () => {
      getUserImage((image: string) => {
        setImageURL(image);
      });
    };
  
    fetchUserImage();
  }, []);

  return (
    <View style={{ ...styles.container, paddingTop: insets.top}}>
      
      <Pressable onPress={() => navigation.navigate('UserProfile' as never)}>
        <Image
          source={{ uri: imageURL }}
          style={styles.userImage}
        />
      </Pressable>
      <Text style={styles.title}>COOK SMART</Text>
      <MaterialCommunityIcons
        style={styles.settings}
        name="cog"
        size={33}
        color={Colors.imageBorder}
        onPress={() => {navigation.navigate('Settings' as never)}}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal:  10,
    paddingBottom: 10
  },

  userImage: {
    width: 33,
    height: 33,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.imageBorder,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },

  settings: {
    marginLeft: 'auto',  
  },
});
