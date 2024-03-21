import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Iconify } from "react-native-iconify";
import { Dialog, TextInput } from "react-native-paper";
import Toast from "react-native-root-toast";
import Colors from "../constants/Colors";
import LanguageContext from "../context/LanguageProvider";
import Ingredient from "../model/Ingredient";
import { addIngredientToPantry } from "../repository/FirebasePantry";
import { translateIngredientToEnglish } from "../services/TransaltionService";
import ToastUtil from "../utils/ToastUtil";

const IngredientDialog = (props: { [x: string]: any;onClose: any; isVisible: boolean }) => {

  const [name, setName] = useState<string>('');  
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);  
  const [amountError, setAmountError] = useState<boolean>(false);
  const [unitError, setUnitError] = useState<boolean>(false);

  const Strings = useContext(LanguageContext);
  
  function isEmpty(text: string) {
    return text.trim().length === 0;
  }

  const checkAllFields = () => {
    let result = true;

    if (isEmpty(name)) {
      result = result && false; 
      setNameError(true);
    }
    else {
      result = result && true;
      setNameError(false);
    }


    if (amount === undefined || amount <= 0 ) {
      result = result && false;
      setAmountError(true);
    }
    else {
      result = result && true;
      setAmountError(false);
    }


    if (isEmpty(unit)) {
      result = result && false; 
      setUnitError(true);
    }
    else {
      result = result && true;
      setUnitError(false);
    }


    return result;
  };

  const clearForm = () => {
    setName('');
    setAmount(0);
    setUnit('');
  };


  const addIngredient = async () => {
    
    if (checkAllFields()) {
      
      const ingredientEnglishVersion = await translateIngredientToEnglish(Strings.locale, name);
      
      const newIngredient: Ingredient = {
        name: name,
        unit: unit,
        amount: amount!,
        englishVersion: ingredientEnglishVersion
      }
      if (await addIngredientToPantry(newIngredient)) {
        props.onAddProduct(newIngredient);
        props.onClose();
        clearForm();
      }
      else {
        clearForm();
        ToastUtil.showToast(Strings.t('itemAlreadyInPantryMessage'), Toast.durations.SHORT);
      }
    }

  };

  const handleClose = () => {
    clearForm();
    props.onClose();
  };

  return (
    <Dialog visible={props.isVisible} style={styles.dialogContainer}>
      <View style={styles.dialogContent}>
        <Text>{Strings.translate('enterIngredientName')}:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            placeholder={Strings.translate('ingredientNameInput')}
            placeholderTextColor={nameError? Colors.error : Colors.black}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
          <Iconify icon="material-symbols-light:shelves-outline" size={24} color="black" style={{ marginLeft: 10 }}/>
        </View>

        <Text>{Strings.translate('amount')}:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {setAmount(parseInt(text))}}
            value={amount?.toString()}
            keyboardType="numeric"
            placeholder={Strings.translate('ingredientAmountInput')}
            placeholderTextColor={amountError? Colors.error : Colors.black}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
          <Iconify icon="material-symbols-light:balance" size={24} color="black" style={{ marginLeft: 10 }}/>
        </View>

        <Text>{Strings.translate('unit')}:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setUnit}
            value={unit}
            placeholder={Strings.translate('ingredientUnitInput')}
            placeholderTextColor={unitError? Colors.error : Colors.black}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
          <Iconify icon="ph:calculator-light" size={24} color="black" style={{ marginLeft: 10 }}/>
        </View>
      </View>

      <Dialog.Actions>
        
        <View>
          <Button
            title={Strings.translate('accept')}
            onPress={() => {addIngredient()}}
            color={Colors.primary}
          />
        </View>

        <View>
          <Button
            title={Strings.translate('cancel')}
            onPress={handleClose}
            color={Colors.primary}
          />
        </View>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({

  dialogContainer: {
    backgroundColor: Colors.terciary,
  },

  dialogContent: {
    padding: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.primary,
    backgroundColor: Colors.terciary,
  },

  closeButton: {
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },

});

export default IngredientDialog;

