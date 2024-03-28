import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/Colors";
import { Iconify } from "react-native-iconify";

const IngredientUnitSelector = (props: {onChange: any}) => {

  const [selectedUnit, setSelectedUnit] = useState<number>(); 

  const options = [
    { key: 0, label: 'kg'},
    { key: 1, label: 'gr'},
    { key: 2, label: 'ml'},
    { key: 3, label: 'L'},
    // { key: 4, label: 'u'},
  ];

  const handleSelectUnit = (option: { key: number; label: string; }) => {

    setSelectedUnit(option.key);
    props.onChange(option.label);

  };



  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity onPress={() => {handleSelectUnit(option)}} style={[styles.unitContainer, selectedUnit === option.key && {borderColor: Colors.black}]}>

          <Text key={option.key} style={styles.text}>
            {option.label}
          </Text>

          {selectedUnit === option.key && (
            <Iconify icon="charm:tick" size={8} color="black" style={styles.selectedIcon} />
          )}
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flexGrow:1 ,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5
  },

  text: {
    textAlign: 'center'
  },

  unitContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    padding: 10
  },
  
  selectedIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default IngredientUnitSelector;