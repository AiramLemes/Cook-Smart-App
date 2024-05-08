import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Dialog } from "react-native-paper";
import Colors from "../../constants/Colors";
import LanguageContext from "../../context/LanguageProvider";
import { useIsFocused } from "@react-navigation/native";
import ToastUtil from "../../utils/ToastUtil";
import Toast from "react-native-root-toast";

const TextInputDialog = (props: { text: string, isVisible: boolean, onClose: any }) => {

  const Strings = useContext(LanguageContext);
  const [inputValue, setInputValue] = useState("");

  const handleOnClose = (option: boolean) => {

    if (option) {
      if (inputValue.trim().length == 0) {
        ToastUtil.showToast(Strings.t('emptyInputs'), Toast.durations.SHORT);
      }
      else {
        props.onClose(option, inputValue);
        setInputValue('');
      }
    }
    else {
      props.onClose(option);
      setInputValue('');
    }


  }

  return (
    <Dialog visible={props.isVisible} style={styles.dialogContainer}>
      <View style={styles.dialogContent}>
        <View style={styles.title}>
          <Image style={styles.image} source={require('../../assets/images/robot.png')} />
          <Text style={styles.text}>{props.text}</Text>
        </View>
        <TextInput
          style={styles.input}
          multiline
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={'Escribe aquí...'}
        />
      </View>

      <Dialog.Actions style={{ alignSelf: 'center' }}>
        <View style={styles.button}>
          <Button
            title={Strings.t('accept')}
            onPress={() => {handleOnClose(true)}}
            color={Colors.primary}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={Strings.t('cancel')}
            onPress={() => {handleOnClose(false)}}
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
    width: '75%',
    alignSelf: 'center',
    justifyContent: 'center'
  },

  dialogContent: {
    padding: 20,
  },

  
  input: {
    height: 200,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top'
  },
  
  button: {
    marginRight: 10,
  },
  
  title: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  
  text: {
    textAlign: 'left',
    maxWidth: '68%'
  },
  
  image: {
    width: 90,
    height:75,
  }
});

export default TextInputDialog;
