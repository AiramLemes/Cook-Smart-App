import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Iconify } from "react-native-iconify";
import LanguageContext from "../context/LanguageProvider";

const Dificulty = (props: {dificulty: number, size: number}) => {

  const Strings = useContext(LanguageContext);
  
  const difficulty = props.dificulty;
  const size = props.size

  const difficultyLevels = ['easy', 'normal', 'difficult'];
  return (
    <View style={styles.difficulty}>
      <Text style={styles.difficultyText}>{Strings.t(difficultyLevels[difficulty - 1])}</Text>
      {Array.from({ length: difficulty }).map((_, i) => (
        <Iconify key={i} icon="solar:chef-hat-broken" size={size} color="black" />
      ))}
    </View>
  );
}

export default Dificulty;

const styles = StyleSheet.create({
  difficulty: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  
  difficultyText: {
    marginRight: 10, 
  },
});
