import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Table = (props: any) => {

  const nutritionalInfo = props.product?.nutritionalInformation || {};
  
  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View style={styles.tableCellHeader}>
          <Text style={styles.headerText}>Información nutricional</Text>
        </View>
        <View style={styles.tableCellHeader}>
          <Text style={styles.headerText}>Por cada 100 g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Valor energético</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[0]} kJ/{nutritionalInfo[1]} Kcal</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Grasas</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[2]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Saturadas</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[3]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Hidratos de carbono</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[4]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Azúcares</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[5]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Fibra</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[6]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Proteína</Text>
        </View>
        <View style={styles.tableCell}>
          <Text>{nutritionalInfo[7]} g</Text>
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>Sal</Text>
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
