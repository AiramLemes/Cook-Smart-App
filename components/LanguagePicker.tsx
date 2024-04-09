import React, { useContext, useRef, useState } from "react";
import { Dimensions, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import ModalSelector from "react-native-modal-selector";
import { changeLanguage } from "../constants/Strings";
import LanguageContext from "../context/LanguageProvider";

const windowWidth = Dimensions.get('window').width;
const adjustedFontSize = PixelRatio.getFontScale() * windowWidth / 24;

const LanguagePicker = () => {
  
  const Strings = useContext(LanguageContext);
  const [language, setLanguage] = useState(Strings.locale);
  const modalRef = useRef(null);

  const data = [
    { key: 0, label: "English", code: 'en-US',},
    { key: 1, label: "French", code: 'fr-FR' },
    { key: 2, label: "German", code: 'de-DE',},
    { key: 3, label: "Italian", code: 'it-IT' },
    { key: 4, label: "Portuguese", code: 'pt-PT',},
    { key: 5, label: "Spanish", code: 'es-ES' },
  ];

  const handlePress = () => {
    if (modalRef.current) {
      // @ts-ignore
      modalRef.current.open();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} >
      <ModalSelector
        ref={modalRef}
        style={styles.buttonWithIcon}
        data={data}
        onChange={async (lang) => {
          setLanguage(lang.code);
          await changeLanguage(Strings, lang.code);
        }}
        cancelText={Strings.t("cancel")}
      >
        <View style={styles.modalSelectorContainer}>
          <Text style={styles.buttonText}>{Strings.t("lang")}</Text>

          {language == 'es-ES' && 
            <Iconify icon="emojione-v1:flag-for-spain" size={24} color="black" style={{ marginLeft: 10 }}/>
          }
        
          {language == 'en-US' && 
            <Iconify icon="emojione-v1:flag-for-united-states" size={24} color="black" style={{ marginLeft: 10 }}/>
          }  

          {language == 'fr-FR' && 
            <Iconify icon="emojione-v1:flag-for-france" size={24} color="black" style={{ marginLeft: 10 }}/>
          }
        
          {language == 'de-DE' && 
            <Iconify icon="emojione-v1:flag-for-germany" size={24} color="black" style={{ marginLeft: 10 }}/>
          }

          {language == 'it-IT' && 
            <Iconify icon="emojione-v1:flag-for-italy" size={24} color="black" style={{ marginLeft: 10 }}/>
          }
        
          {language == 'pt-PT' && 
            <Iconify icon="emojione-v1:flag-for-portugal" size={24} color="black" style={{ marginLeft: 10 }}/>
          }      
      
        </View>
      </ModalSelector>
    </TouchableOpacity>
  );
};

export default LanguagePicker;

const styles = StyleSheet.create({
  buttonWithIcon: {
    borderRadius: 10,
    backgroundColor: "rgba(254, 211, 77, 0.28)",
    width: '80%',
    alignSelf: 'center',
    height: 40,
    marginTop: 25,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  modalSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },

  buttonText: {
    fontSize: adjustedFontSize,
    letterSpacing: 0.25,
    fontWeight: "normal",
    color: "black",
    textAlign: "center",
  },
});
