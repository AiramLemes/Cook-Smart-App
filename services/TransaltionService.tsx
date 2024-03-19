import axios from "axios";
import Recipe from "../model/Recipe";
import Ingredient from "../model/Ingredient";
import { auth } from "../firebaseConfig";
import LanguageContext from '../context/LanguageProvider';
import { useContext } from "react";
import { currentLanguage } from "../constants/Strings";

const deepLAuthKey = '4baaa94c-9ff2-876b-19d2-25aaee96c25f:fx';

const language_mapping: Record<string, string> = {
  'bg-BG': 'BG',
  'cs-CZ': 'CS',
  'da-DK': 'DA',
  'de-DE': 'DE',
  'el-GR': 'EL',
  'en-GB': 'EN-GB',
  'en-US': 'EN-US',
  'es-ES': 'ES',
  'et-EE': 'ET',
  'fi-FI': 'FI',
  'fr-FR': 'FR',
  'hu-HU': 'HU',
  'id-ID': 'ID',
  'it-IT': 'IT',
  'ja-JP': 'JA',
  'ko-KR': 'KO',
  'Iv-LV': 'LV',
  'lt-LT': 'LT',
  'no-NO': 'NB',
  'nl-NL': 'NL',
  'pt-PT': 'PT-PT',
  'pt-BR': 'PT_BR',
  'PT-BT': 'BT',
  'ro-RO': 'RO',
  'ru-RU': 'RU',
  'sk-SK': 'SK',
  'sl-SI': 'SL',
  'sv-SE': 'SV',
  'tr-TR': 'TR',
  'uk-UA': 'UK',
  'zh-CN': 'ZH',
};


const translateText = async (textLang: string, text: string, forceEnglish: boolean = false) => {
  
  if (currentLanguage === textLang && !forceEnglish) {
    return text;
  }

  const url = 'https://api-free.deepl.com/v2/translate';
  const authKey = deepLAuthKey
  // console.log('Locale: ', Strings.locale)
  // console.log('Mapping: ', language_mapping[Strings.locale])
  const targetLang = forceEnglish ? 'EN-US' : language_mapping[currentLanguage];
  let sourceLang = language_mapping[textLang];

  if (sourceLang.length > 2) {
    sourceLang = sourceLang.substring(0,2) // Translating API does not allow country code in sourceLang
  }

 
  const headers = {
    'Authorization': `DeepL-Auth-Key ${authKey}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  };

  const data = new URLSearchParams();
  data.append('text', text);
  data.append('target_lang', targetLang);
  data.append('source_lang', sourceLang);



  try {
    const response = await axios.post(url, data.toString(), { headers });

    if (!response.data.translations || response.data.translations.length === 0) {
      throw new Error('No translations found in the response.');
    }

    const translation = response.data.translations[0].text;
    const detectedSourceLanguage = response.data.translations[0].detected_source_language;

    // console.log(`Translation: ${translation}`);
    // console.log(`Detected Source Language: ${detectedSourceLanguage}`);

    return translation;
  } catch (error) {
    console.error('Error translating: ', error);
    throw error;
  }
};

// Ejemplo de uso
const translateRecipe = async (textLang: string, recipe: Recipe) => {
  try {
    const translatedIngredients: Ingredient[] = await Promise.all(
      recipe.ingredients.map(async (item) => {
        const translatedName = await translateText(textLang, item.name);
        const translatedAmount =
          typeof item.amount === 'string'
            ? await translateText(textLang, item.amount)
            : item.amount;
        
          const tanslatedUnit = item.amount.toString().includes(item.unit)? '' : await translateText(textLang, item.unit); // Omit duplicated data
        
          return {
          ...item,
          name: translatedName,
          unit: tanslatedUnit,
          amount: translatedAmount,
        };
      })
    );

    const translatedRecipe: Recipe = {
      ...recipe,
      title: (await translateText(textLang, recipe.title)) as string,
      ingredients: translatedIngredients,
      steps: await Promise.all(recipe.steps.map((item) => translateText(textLang, item))) as string[],
    };

    // console.log('Translated Recipe:', translatedRecipe);
    return translatedRecipe;
  } catch (error) {
    console.error('Error translating recipe:', error);
    throw error;
  }
};


const translateIngredientsToEnglish = async (textLang: string, ingredients: string[]) => {
  return await Promise.all(ingredients.map(item => translateText(textLang, item, true))) as string[]
}

const translateIngredientToEnglish = async (textLang: string, ingredient: string) => {
  return translateText(textLang, ingredient, true);
}



export { translateText, translateRecipe, translateIngredientsToEnglish, translateIngredientToEnglish };
