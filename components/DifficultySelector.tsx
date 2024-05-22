import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import Colors from "../constants/Colors";
import LanguageContext from "../context/LanguageProvider";

const DificultySelector = (props: {initialValue?: number; onChange: any; error: boolean; size: number }) => {

  const {initialValue, size} = props;
  const Strings = useContext(LanguageContext);
  
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const difficulties = [
    { level: 'easy', hats: 1 },
    { level: 'normal', hats: 2 },
    { level: 'difficult', hats: 3 },
  ];

  useEffect(() => {
    
    if (initialValue) {
      switch(initialValue) {
        case 0:
          handleDifficultySelection('easy');
          break;
  
        case 1:
          handleDifficultySelection('normal');
          break;
  
        case 2:
          handleDifficultySelection('difficult');
          break;
      }
    }
  }, []);

  const handleDifficultySelection = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    if (difficulty === 'easy') {props.onChange(1)};
    if (difficulty === 'normal') {props.onChange(2)};
    if (difficulty === 'difficult') {props.onChange(3)};

    // console.log(difficulty)
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{Strings.translate('difficulty')}</Text>
      <View style={styles.difficultyContainer}>
        {difficulties.map(({ level, hats }) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.difficulty,
              selectedDifficulty === level && styles.selectedDifficulty,
              props.error && styles.error
            ]}
            onPress={() => handleDifficultySelection(level)}
          >
            <View style={styles.icons}>
              {Array.from({ length: hats }, (_, i) => (
                <Iconify key={i} icon="solar:chef-hat-broken" size={size} color="black" />
              ))}
            </View>
            <Text style={styles.difficultyText}>{Strings.t(level)}</Text>
            {selectedDifficulty === level && (
              <Iconify icon="charm:tick" size={10} color="black" style={styles.selectedIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default DificultySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  text: {
    justifyContent: 'center',
    alignSelf: 'center', 
    textAlign: 'center',
    maxWidth: '25%'  
  },

  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  difficulty: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    width: '24%',
    height: 60,
    backgroundColor: Colors.lightGray,
    borderWidth: 1,
    borderColor: 'transparent', // Borde transparente por defecto
  },
  
  difficultyText: {
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

  error: {
    borderWidth: 1,
    borderColor: 'red'
  }
});
