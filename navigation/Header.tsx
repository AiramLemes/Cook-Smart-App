import { SafeAreaView, StyleSheet, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import getUserImage from "../model/FirebaseUser";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  
  const insets = useSafeAreaInsets();
  const [imageURL, setImageURL] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const image = await getUserImage();
        setImageURL(image);
      } catch (error) { setImageURL(" ") }
    };

    fetchUserImage();
  }, []); 

  return (
    <SafeAreaView style={{ ...styles.container, paddingTop: insets.top }}>
      <Image
        source={{ uri: imageURL }}
        style={styles.userImage}
      />
      <Text style={styles.title}>COOK SMART</Text>
      <MaterialCommunityIcons
        style={styles.settings}
        name="cog"
        size={33}
        color={Colors.imageBorder}
        onPress={() => {navigation.navigate('Settings' as never)}}
      />
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    height: 80,
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
