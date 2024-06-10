import axios from "axios";
import { currentLanguage } from "../../constants/Strings";
import Ingredient from "../../model/Ingredient";
import Recipe from "../../model/Recipe";

const deepLAuthKey = process.env.EXPO_PUBLIC_DEEPL_API_KEY;

const languageMapping: Record<string, string> = {
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


const getDeepLHeaders = () => ({
  'Authorization': `DeepL-Auth-Key ${deepLAuthKey}`,
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
});

const buildDeepLData = (text: string, targetLang: string, sourceLang: string) => {
  const data = new URLSearchParams();
  data.append('text', text);
  data.append('target_lang', targetLang);
  data.append('source_lang', sourceLang.substring(0, 2)); // Remove country code if present
  return data;
};

const translateText = async (textLang: string, text: string, forceEnglish = false) => {
  if (currentLanguage === textLang && !forceEnglish) return text;

  const targetLang = forceEnglish ? 'EN-US' : languageMapping[currentLanguage];
  const sourceLang = languageMapping[textLang];
  const url = 'https://api-free.deepl.com/v2/translate';

  try {
    const response = await axios.post(url, buildDeepLData(text, targetLang, sourceLang).toString(), {
      headers: getDeepLHeaders(),
    });

    if (!response.data.translations || response.data.translations.length === 0) {
      throw new Error('No translations found in the response.');
    }

    return response.data.translations[0].text;
  } catch (error) {
    console.error('Error translating: ', error);
    throw error;
  }
};

const translateIngredients = async (textLang: string, ingredients: Ingredient[]) => {
  return await Promise.all(
    ingredients.map(async (item) => {
      const translatedName = await translateText(textLang, item.name);
      const translatedAmount = typeof item.amount === 'string' ? await translateText(textLang, item.amount) : item.amount;
      const translatedUnit = item.amount.toString().includes(item.unit) ? '' : await translateText(textLang, item.unit); // Omit duplicated data

      return { ...item, name: translatedName, unit: translatedUnit, amount: translatedAmount };
    })
  );
};

const translateRecipe = async (textLang: string, recipe: Recipe) => {
  try {
    const translatedIngredients = await translateIngredients(textLang, recipe.ingredients);

    const translatedRecipe: Recipe = {
      ...recipe,
      title: await translateText(textLang, recipe.title),
      ingredients: translatedIngredients,
      steps: await Promise.all(recipe.steps.map(step => translateText(textLang, step))),
      
      preparation: {
        amount: recipe.preparation.amount,
        unit: await translateText(textLang, recipe.preparation.unit),
        index: recipe.preparation.index,
      },
      cooking: {
        amount: recipe.cooking.amount,
        unit: await translateText(textLang, recipe.cooking.unit),
        index: recipe.cooking.index,
      },
      rest: {
        amount: recipe.rest.amount,
        unit: await translateText(textLang, recipe.rest.unit),
        index: recipe.rest.index,
      },
    };

    return translatedRecipe;
  } catch (error) {
    console.error('Error translating recipe:', error);
    throw error;
  }
};

const translateIngredientsToEnglish = async (textLang: string, ingredients: string[]) => {
  return await Promise.all(ingredients.map(ingredient => translateText(textLang, ingredient, true)));
};

const translateIngredientToEnglish = async (textLang: string, ingredient: string) => {
  return translateText(textLang, ingredient, true);
};

export { translateIngredientToEnglish, translateIngredientsToEnglish, translateRecipe, translateText };