import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import * as Updates from 'expo-updates';

import esES from '../language/es-ES.json'; 
import deDE from '../language/de-DE.json'; 
import enUS from '../language/en-US.json'; 
import frFR from '../language/fr-FR.json'; 
import itIT from '../language/it-IT.json'; 
import ptPT from '../language/pt-PT.json'; 


async function loadTranslations(i18n: I18n, locale: string) {
  try {
    let translations;
    switch (locale) {
      case 'es-ES':
        translations = esES;
        break;
      case 'de-DE':
        translations = deDE;
        break;
      case 'en-US':
        translations = enUS;
        break;
      case 'fr-FR':
        translations = frFR;
        break;
      case 'it-IT':
        translations = itIT;
        break;
      case 'pt-PT':
        translations = ptPT;
        break;
      default:
        // Manejar el caso en el que no se encuentre el idioma
        break;
    }
    console.log('Translations loaded:', translations);
    i18n.translations[locale] = translations;
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

async function saveLanguagePreference(i18n: I18n, language: string) {
  try {
    await AsyncStorage.setItem('preferredLanguage', language);
    i18n.locale = language;
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
}

async function loadLanguagePreference(i18n: I18n) {
  try {
    const preferredLanguage = await AsyncStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      i18n.locale = preferredLanguage;
    } else {
      i18n.locale = Localization.locale;
    }
  } catch (error) {
    console.error('Error loading language preference:', error);
  }
}

async function changeLanguage(i18n: I18n, language: string) {
  saveLanguagePreference(i18n, language);
  await Updates.reloadAsync();
}

const Strings = new I18n();

export { loadTranslations, saveLanguagePreference, loadLanguagePreference, changeLanguage, Strings };
