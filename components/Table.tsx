import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Product from '../model/Product';
import LanguageContext from '../context/LanguageProvider';


const Table = (props: { product: Product }) => {

  const nutritionalInfo = props.product?.nutritionalInformation || {};
  const Strings = useContext(LanguageContext);
  
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

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('energy')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[0]} kJ/{nutritionalInfo[1]} Kcal</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('fats')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[2]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('saturated')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[3]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('carbohydrates')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[4]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('sugars')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[5]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('fibre')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[6]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('protein')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[7]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{Strings.t('salt')}</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[8]} g</Text>
        </View>
      </View>

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
