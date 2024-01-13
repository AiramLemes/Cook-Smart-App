// PreparationItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Iconify } from 'react-native-iconify';
import Colors from '../constants/Colors';

const IngredientItem = (props: {icon: string, title: string, duration: string}) => {
  const { icon, title, duration } = props

  return (
    <View style={styles.preparationItem}>
      <View style={styles.preparationItemIcon}>
        <Iconify icon={require(icon)} style={{ alignSelf: 'center' }} size={30} color="black" />
      </View>
      <Text style={styles.preparationItemText}>{title}</Text>
      <Text style={styles.preparationItemDuration}>{duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  preparationItem: {
    width: '98%',
    height: 36,
    backgroundColor: '#FBF8F8',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },

  preparationItemIcon: {
    width: '13 %',
    height: '100%',
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
  },

  preparationItemText: {
    textAlignVertical: 'center',
    fontSize: 15,
    marginLeft: 10,
  },
  
  preparationItemDuration: {
    textAlignVertical: 'center',
    fontSize: 15,
    position: 'absolute',
    left: '85%',
    top: '20%',
  },
});

export default IngredientItem;
