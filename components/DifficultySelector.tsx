import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Iconify } from "react-native-iconify";
import { Strings } from "../constants/Strings";
import Colors from "../constants/Colors";

const DificultySelector = (props: {size: number}) => {

  const size = props.size;

  // Estado para rastrear el nivel de dificultad seleccionado
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  // Función para manejar la selección de dificultad
  const handleDifficultySelection = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return (    
    <View style={styles.container}>
      <Text style={styles.text}>Dificultad</Text>

      <TouchableOpacity
        style={[
          styles.dificulty,
          selectedDifficulty === 'easy' && styles.selectedDifficulty,
        ]}
        onPress={() => handleDifficultySelection('easy')}
      >      
        <Iconify icon="solar:chef-hat-broken" style={styles.icons} size={size} color="black" />
        <Text style={styles.dificultyText}>{Strings.t('easy')}</Text>
        {selectedDifficulty === 'easy' && (
          <Iconify icon="charm:tick" size={10} color="black" style={styles.selectedIcon} />
        )}
      </TouchableOpacity>

      

      <TouchableOpacity
        style={[
          styles.dificulty,
          selectedDifficulty === 'normal' && styles.selectedDifficulty,
        ]}
        onPress={() => handleDifficultySelection('normal')}
      >
        <View style={styles.icons}>
          <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
          <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        </View>
        <Text style={styles.dificultyText}>{Strings.t('normal')}</Text>
        {selectedDifficulty === 'normal' && (
          <Iconify icon="charm:tick" size={10} color="black" style={styles.selectedIcon} />
        )}
      </TouchableOpacity>

      
      <TouchableOpacity
        style={[
          styles.dificulty,
          selectedDifficulty === 'difficult' && styles.selectedDifficulty,
        ]}
        onPress={() => handleDifficultySelection('difficult')}
      >
        <View style={styles.icons}>
          <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
          <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
          <Iconify icon="solar:chef-hat-broken" size={size} color="black" />
        </View>
        <Text style={styles.dificultyText}>{Strings.t('difficult')}</Text>
        {selectedDifficulty === 'difficult' && (
          <Iconify icon="charm:tick" size={10} color="black" style={styles.selectedIcon} />
        )}
      </TouchableOpacity>

    </View>
  );
}

export default DificultySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5
  },
  
  text: {
    justifyContent: 'center',
    alignSelf: 'center', 
    marginRight: 10, 
  },
  
  dificulty: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
    width: '20%',
    height: 60,
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: 'transparent', // Borde transparente por defecto
  },
  
  dificultyText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  icons: {
    alignSelf: 'center',
    flexDirection: 'row'
  },

  selectedDifficulty: {
    borderColor: 'black', // Borde negro cuando está seleccionado
  },

  selectedIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
