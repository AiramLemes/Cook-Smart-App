import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { Iconify } from 'react-native-iconify';

const Servings = () => {
  const [servingsCount, setServinsCount] = useState(0);

  const handleServingsCount = (operation: string) => {
    if (operation === 'up') {
      setServinsCount(servingsCount + 1);

    }
     else if (operation === 'down' && servingsCount > 0) {
      setServinsCount(servingsCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.servingsText}>Nº de personas</Text>

      <View style={styles.servingsCotainer}>
        <TouchableOpacity onPress={() => handleServingsCount('up')}>
          <Iconify icon="ic:baseline-plus" size={25} color={Colors.black} />
        </TouchableOpacity>

        <Text style={styles.text}>{servingsCount}</Text>

        <TouchableOpacity onPress={() => handleServingsCount('down')}>
          <Iconify icon="ic:baseline-minus" size={25} color={Colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between', // add space between items
  },

  servingsText: {
    fontSize: 15,
    textAlignVertical: 'center',
  },

  servingsCotainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    alignItems: 'center', // align items vertically in the center
    justifyContent: 'space-between', // add space between items
    width: 230, // increase width
    height: 40,
    paddingHorizontal: 20, // add horizontal padding
  },

  text: {
    fontSize: 18,
    textAlignVertical: 'center',
  
  },
});

export default Servings;
