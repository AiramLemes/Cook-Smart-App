import axios from "axios";
import { Strings } from "../constants/Strings";
import Recipe from "../model/Recipe";

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
  
  if (Strings.locale === textLang && !forceEnglish) {
    return text;
  }

  const url = 'https://api-free.deepl.com/v2/translate';
  const authKey = deepLAuthKey
  // console.log('Locale: ', Strings.locale)
  // console.log('Mapping: ', language_mapping[Strings.locale])
  const targetLang = forceEnglish ? 'EN-US' : language_mapping[Strings.locale];
  const sourceLang = language_mapping[textLang];
  // console.log('TARGET_ ', targetLang)

 
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

  // const textToTranslate = 'Hi!';
  // const targetLanguage = 'IT';
  
  // try {
  //   translateText(textToTranslate, targetLanguage);
  // } catch (error) {
  //   console.error('Translation error:', error);
  // }
  // // console.log('Is already in the current language?', textLang === currentLanguage);

  // await translateText( 'Hola', 'EN-BR');

  try {
    const translatedRecipe: Recipe = {
      title: await translateText(textLang, recipe.title) as string,
      images: recipe.images,
      ingredients: await Promise.all(recipe.ingredients.map(item => translateText(textLang, item))) as string[],
      steps: await Promise.all(recipe.steps.map(item => translateText(textLang, item))) as string[],
      mainImage: recipe.mainImage,
      assessment: recipe.assessment,
      id: recipe.id,
      lang: recipe.lang,
      preparation: recipe.preparation,
      cooking: recipe.cooking,
      rest: recipe.rest,
      serving: recipe.serving,
      difficulty: recipe.difficulty
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



export { translateText, translateRecipe, translateIngredientsToEnglish };
