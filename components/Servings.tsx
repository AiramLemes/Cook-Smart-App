import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';

const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 28;


const Servings = (props: {initialValue?: number; onChange: any}) => {
  const [servingsCount, setServinsCount] = useState(1);
  // props.onChange(1);
  const Strings = useContext(LanguageContext);
  const initialValue = props.initialValue;

  useEffect(() => {
    if (initialValue) {
      setServinsCount(initialValue);
      props.onChange(initialValue);
    }
  });

  const handleServingsCount = (operation: string) => {
    
    let count = servingsCount;
    if (operation === 'up') {
      count += 1;
    }
     else if (operation === 'down' && servingsCount > 1) {
      count -= 1;
    }

    props.onChange(count);
    setServinsCount(count);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.servingsText}>{Strings.translate('numberOfPeople')}</Text>

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
    justifyContent: 'space-between', // add space between items
    textAlignVertical: 'center',
    alignItems: 'center',
  },

  servingsText: {
    fontSize: adjustedFontSize,
    textAlignVertical: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  servingsCotainer: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: Colors.lightGray,
    alignItems: 'center', // align items vertically in the center
    justifyContent: 'space-between', // add space between items
    width: '55%', // increase width
    height: 40,
    paddingHorizontal: 20, // add horizontal padding,
    textAlignVertical: 'center',
  },

  text: {
    fontSize: adjustedFontSize,
    textAlignVertical: 'center',
  
  },
});

export default Servings;
