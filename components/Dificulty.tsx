import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Iconify } from "react-native-iconify";
import LanguageContext from "../context/LanguageProvider";

const Dificulty = (props: {dificulty: number, size: number}) => {

  const Strings = useContext(LanguageContext);
  
  const dificulty = props.dificulty;
  const size = props.size
  return (

    <View style={styles.dificulty}>
      {dificulty == 1 && <>
        <Text style={styles.dificultyText}>{Strings.t('easy')}</Text>
        <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        </>
      }

      {dificulty == 2 && <>
        <Text style={styles.dificultyText}>{Strings.t('normal')}</Text>
        <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        </>
      }

      {dificulty == 3 && <>
        <Text style={styles.dificultyText}>{Strings.t('difficult')}</Text>
        <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        </>
      }
    </View>
  );
}

export default Dificulty;

const styles = StyleSheet.create({
  dificulty: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  
  dificultyText: {
    marginRight: 10, 
  },
});
