import axios from "axios";

const deepLAuthKey = '4baaa94c-9ff2-876b-19d2-25aaee96c25f:fx';

const language_mapping: Map<string, string> = {
    'bg_BG': 'BG',
    'cs_CZ': 'CS',
    'da_DK': 'DA',
    'de_DE': 'DE',
    'el_GR': 'EL',
    'en_GB': 'EN-GB',
    'en_US': 'EN-US',
    'es_ES': 'ES',
    'et_EE': 'ET',
    'fi_FI': 'FI',
    'fr_FR': 'FR',
    'hu_HU': 'HU',
    'id_ID': 'ID',
    'it_IT': 'IT',
    'ja_JP': 'JA',
    'ko_KR': 'KO',
    'lt_LT': 'LT',
    'lv_LV': 'LV',
    'nb_NO': 'NB',
    'nl_NL': 'NL',
    'pl_PL': 'PL',
    'pt_BR': 'PT-BR',
    'pt_PT': 'PT-PT',
    'ro_RO': 'RO',
    'ru_RU': 'RU',
    'sk_SK': 'SK',
    'sl_SI': 'SL',
    'sv_SE': 'SV',
    'tr_TR': 'TR',
    'uk_UA': 'UK',
    'zh_CN': 'ZH',
}

const currentLanguage = String


const translateText = async (text: string) => {
  const url = 'https://api-free.deepl.com/v2/translate';

  const data = new URLSearchParams({
    text: text,
    target_lang: 'EN-GB',
  });

  const headers = {
    'Authorization': `DeepL-Auth-Key ${deepLAuthKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    // const response = await axios.post(url, data.toString(), { headers });
    // const traduccion = response.data.translations[0].text;
    // return traduccion;
  } catch (error) {
    console.error('Error al traducir:', error);
    throw error;
  }
}; 

export default translateText;
