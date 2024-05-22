import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import LanguageContext from '../context/LanguageProvider';
import Product from '../model/Product';


const Table = (props: { product: Product }) => {

  const nutritionalInfo = props.product?.nutritionalInformation || {};
  const Strings = useContext(LanguageContext);


  const nutrients = [
    { name: 'energy', unit: 'kJ/Kcal' },
    { name: 'fats', unit: 'g' },
    { name: 'saturated', unit: 'g' },
    { name: 'carbohydrates', unit: 'g' },
    { name: 'sugars', unit: 'g' },
    { name: 'fibre', unit: 'g' },
    { name: 'protein', unit: 'g' },
    { name: 'salt', unit: 'g' },
  ];


  const TableRow = (index: number, name: string, unit: string) => (
    <View style={styles.tableRow} key={name}>
      <View style={styles.tableCell}>
        <Text>{Strings.t(name)}</Text>
      </View>
      <View style={styles.tableCell}>
        {index == 0 ? (
          <Text>{nutritionalInfo[index].split('/')[0]} {unit.split('/')[0]} {nutritionalInfo[index].split('/')[1]} {unit.split('/')[1]}</Text>
        ) : (
          <Text>{nutritionalInfo[index]} {unit}</Text>
        )}
      </View>
    </View>
  );


  
  return (
    <View style={styles.table}>

      <View style={styles.tableRow}>
        <View style={styles.tableCellHeader}>
          <Text style={styles.headerText}>{Strings.t('nutritionalValues')}</Text>
        </View>
        <View style={styles.tableCellHeader}>
          <Text style={styles.headerText}>{Strings.t('scale')}</Text>
        </View>
      </View>
      
        {nutrients.map((nutrient, index) => {
          return TableRow(index, nutrient.name, nutrient.unit);
        })}

    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    flex: 1,
    padding: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableCellHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    aspectRatio: 4,
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 5,
  },
});
export default Table;
