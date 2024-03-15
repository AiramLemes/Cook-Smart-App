import React, { createContext } from "react";
import { I18n } from "i18n-js";


const LanguageContext = createContext<I18n>(new I18n());

export default LanguageContext;



