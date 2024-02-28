import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";
import { Dialog } from "react-native-paper";

const ConfirmationDialog = (props: {text: string, isVisible: boolean, onClose: any}) => {


  return (
    <Dialog visible={props.isVisible} style={styles.dialogContainer}>
      <View style={styles.dialogContent}>
        <Text style={styles.text}>{props.text}</Text>
       
      </View>

      <Dialog.Actions style={{alignSelf: 'center'}}>
        
        <View>
          <Button
            title="Aceptar"
            onPress={() => {props.onClose(true)}}
            color={Colors.primary}
          />
        </View>

        <View>
          <Button
            title="Cancelar"
            onPress={() => {props.onClose(false)}}
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
    width: '60%',
    alignSelf: 'center'
  },

  dialogContent: {
    padding: 20,
  },

  text: {
   justifyContent: 'center',
   textAlign: 'center'
  },


  closeButton: {
    borderRadius: 6,
    backgroundColor: Colors.secondary,
  },

});

export default ConfirmationDialog;

