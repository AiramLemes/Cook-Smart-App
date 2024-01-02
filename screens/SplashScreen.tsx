import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import SplashScreenSVG from "../assets/SplashScreenSVG";

// @ts-ignore
const SplashScreen = () => {

  return (
    <View style={styles.container}>



       
      </View>
  );
}

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  

});
