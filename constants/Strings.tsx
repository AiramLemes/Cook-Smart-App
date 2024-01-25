import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import RNRestart from 'react-native-restart';
import { I18n } from 'i18n-js';
import * as Updates from 'expo-updates';

// Set the key-value pairs for the different languages you want to support.
const translations = {

  'es-ES': {

    // logOut
    logIn: 'Iniciar Sesión', 
    register: 'Registrarse',
    powered: 'Potenciado por IA',
    email: 'Correo electrónico',
    password: 'Contraseña',
    userName: 'Nombre de Usuario',


    // Settings
    lang: 'Idioma',
    contactUs: 'Contáctanos',
    theme: 'Tema', 
    aboutApp: 'Sobre la app',
    profile: 'Mi perfil',
    logOut: 'Cerrar Sesión',
    
    
    // Profile
    changeProfileImage: 'Toca para cambiar la foto de perfil',
    changeEmail: 'Cambiar correo electrónico',
    changeUserName: 'Cambiar nombre de usuario',
    updateEmail: 'Actualizar correo',
    updateUserName: 'Actualizar nombre de usuario',
    changePassword: 'Cambiar contraseña',


    //BottomNavBar
    home: 'Home',
    pantry: 'Despensa',
    search: 'Buscar',
    scan: 'Escanear', 
    ai: 'IA',

    
    // Products
    ingredients: 'Ingredientes',
    nutritionalValues: 'Valores nutricionales',
    betterProducts: 'Productos mejor valorados',
    noBetterProductsAvailable: 'No hay productos disponibles',

    scale: 'Por cada 100 g',
    energy: 'Energía',
    fats: 'Grasas',
    saturated: 'Saturadas',
    carbohydrates: 'Carbohidratos',
    sugars: 'Azúcares',
    fibre: 'Fibra',
    protein: 'Proteína',
    salt: 'Sal',


    cancel: 'Cancelar',

    // Messages

      // Profile
      updateImage: 'Imagen actualizada correctamente!',
      errorUpdatingImage: 'Error actualizando la imagen',
      updateEmailMsg: 'Correo electrónico actualizado correctamente',
      errorUpdatingEmail: 'Se ha producido un error al actualizar el correo electrónico, por favor, inténtelo de nuevo',
      errorCheckinEmail: 'Se ha producido un error al verificar el correo electrónico, por favor, inténtelo de nuevo',
      invalidEmail: 'Correco electrónico inválido',
      emptyEmail: 'Correo electrónico vacío!',
      changeUserNameMsg: 'Nombre de usuario actualizado correctamente',
      errorChangingUserName: 'Se ha producido un error al actualizar el nombre de usuario',
      usedUserName: 'Nombre de usuario en uso!', 
      emptyUserName: 'Nombre de usuario vacío',
      recoverPasswordMsg: 'Se ha enviado un correo para recuperar la contraseña',

      // Register &&  Login
      createUser: 'Usuario creado correctamente!',
      emptyInputs: 'Por favor, revise todos los campos',
      logInMessage: 'Sesión iniciada',
      wrongLogInMessage: 'Se ha producido un error al iniciar sesión, comprube el email y la contraseña',
      generalError: 'Se ha producido un error, por favor, inténtelo de nuevo',
      invalidPassword: 'La contraseña debe tener un mínimo de 6 caracteres', 
      usedEmail: 'Correo electrónico en uso',
      invalidUserName: 'Nombre de usuario en uso',


    // Recipe
    translating: 'Traduciendo...',
    preparation: 'Preparación',
    cooking: 'Cocinado',
    rest: 'Reposo',
      // Difficulty
      easy: 'Fácil',
      normal: 'Normal',
      difficult: 'Difícil',
    steps: 'Pasos',
    serving: 'persona',
    servings: 'personas'



  },

  'en-US': { 

    // logOut
    logIn: 'Log In', 
    register: 'Register',
    powered: 'Powered by AI',
    email: 'Email',
    password: 'Password',
    userName: 'User Name',


    // Settings
    lang: 'Language',
    contactUs: 'Contact us',
    theme: 'Theme', 
    aboutApp: 'About the app',
    profile: 'Profile',
    logOut: 'Log Out',
    
   
    // Profile
    changeProfileImage: 'Tap to change the profile picture',
    changeEmail: 'Change email',
    changeUserName: 'Change user name',
    updateEmail: 'Update email',
    updateUserName: 'Update user name',
    changePassword: 'Change password',


    //BottomNavBar
    home: 'Home',
    pantry: 'Pantry',
    search: 'Search',
    scan: 'Scan', 
    ai: 'AI',

    
    // Products
    ingredients: 'Ingredients',
    nutritionalValues: 'Nutritional Values',
    betterProducts: 'Better products:',
    noBetterProductsAvailable: 'There is not better products available',

    scale: 'Per 100 g',
    energy: 'Energy',
    fats: 'Fats',
    saturated: 'Saturated',
    carbohydrates: 'Carbohydrates',
    sugars: 'Sugars',
    fibre: 'Fibre',
    protein: 'Protein',
    salt: 'Salt',


    cancel: 'Cancel',

    
    // Messages

      // Profile

      updateImage: 'Image updated successfully!',
      errorUpdatingImage: 'Error updating the image',
      updateEmailMsg: 'Email updated successfully',
      errorUpdatingEmail: 'An error occurred while updating the email, please try again',
      errorCheckinEmail: 'An error occurred while checking the email, please try again',
      invalidEmail: 'Invalid email',
      emptyEmail: 'Empty email!',
      changeUserNameMsg: 'Username updated successfully',
      errorChangingUserName: 'An error occurred while updating the username',
      usedUserName: 'Username in use!',
      emptyUserName: 'Empty username',
      recoverPasswordMsg: 'A password recovery email has been sent',

      // Register && Login
      createUser: 'User created successfully!',
      emptyInputs: 'Please review all fields',
      logInMessage: 'Session started',
      wrongLogInMessage: 'An error occurred while logging in, check the email and password',
      generalError: 'An error occurred, please try again',
      invalidPassword: 'Password must be at least 6 characters long',
      usedEmail: 'Email in use',
      invalidUserName: 'Username in use',


    // Recipe
    translating: 'Translating...',
    preparation: 'Preparation',
    cooking: 'Cooking',
    rest: 'Rest',
      // Difficulty
      easy: 'Easy',
      normal: 'Normal',
      difficult: 'Difficult',
    steps: 'Steps',
    serving: 'person',
    servings: 'people',


    
  },


  // French
  'fr-FR': {
    // logOut
    logIn: "Se connecter", 
    register: "S'inscrire",
    powered: "Propulsé par l'IA",
    email: "E-mail",
    password: "Mot de passe",
    userName: "Nom d'utilisateur",
    
    // Settings
    lang: "Langue",
    contactUs: "Contactez-nous",
    theme: "Thème", 
    aboutApp: "À propos de l'application",
    profile: "Profil",
    logOut: "Déconnexion",
    
    // Profile
    changeProfileImage: "Appuyez pour changer la photo de profil",
    changeEmail: "Changer l'e-mail",
    changeUserName: "Changer le nom d'utilisateur",
    updateEmail: "Mettre à jour l'e-mail",
    updateUserName: "Mettre à jour le nom d'utilisateur",
    changePassword: "Changer le mot de passe",
    
    // BottomNavBar
    home: "Accueil",
    pantry: "Pantry",
    search: "Rechercher",
    scan: "Scanner", 
    ai: "IA",
    
    // Products
    ingredients: "Ingrédients",
    nutritionalValues: "Valeurs nutritionnelles",
    betterProducts: "Meilleurs produits :",
    noBetterProductsAvailable: "Il n'y a pas de meilleurs produits disponibles",
    
    scale: "Par 100 g",
    energy: "Énergie",
    fats: "Graisses",
    saturated: "Saturées",
    carbohydrates: "Glucides",
    sugars: "Sucres",
    fibre: "Fibre",
    protein: "Protéines",
    salt: "Sel",
    
    cancel: "Annuler",
  
    // Messages
      // Profile
      updateImage: "Image mise à jour avec succès !",
      errorUpdatingImage: "Erreur lors de la mise à jour de l'image",
      updateEmailMsg: "E-mail mis à jour avec succès",
      errorUpdatingEmail: "Une erreur s'est produite lors de la mise à jour de l'e-mail, veuillez réessayer",
      errorCheckinEmail: "Une erreur s'est produite lors de la vérification de l'e-mail, veuillez réessayer",
      invalidEmail: "E-mail invalide",
      emptyEmail: "E-mail vide !",
      changeUserNameMsg: "Nom d'utilisateur mis à jour avec succès",
      errorChangingUserName: "Une erreur s'est produite lors de la mise à jour du nom d'utilisateur",
      usedUserName: "Nom d'utilisateur déjà utilisé !",
      emptyUserName: "Nom d'utilisateur vide",
      recoverPasswordMsg: "Un e-mail de récupération de mot de passe a été envoyé",
    
      // Register && Login
      createUser: "Utilisateur créé avec succès !",
      emptyInputs: "Veuillez vérifier tous les champs",
      logInMessage: "Session démarrée",
      wrongLogInMessage: "Une erreur s'est produite lors de la connexion, vérifiez l'e-mail et le mot de passe",
      generalError: "Une erreur s'est produite, veuillez réessayer",
      invalidPassword: "Le mot de passe doit comporter au moins 6 caractères",
      usedEmail: "E-mail déjà utilisé",
      invalidUserName: "Nom d'utilisateur déjà utilisé",


    // Recipe
    translating: 'Traduire...',
    preparation: 'Préparation',
    cooking: 'Cuisiné',
    rest: 'Rest',
      // Difficulty
      easy: 'Facile',
      normal: 'Normal',
      difficult: 'Difficile',
    steps: 'Steps',
    serving: 'personne',
    servings: 'personnes'

  },


  // German
  'de-DE': {
    // logOut
    logIn: 'Anmelden', 
    register: 'Registrieren',
    powered: 'Betrieben von KI',
    email: 'E-Mail',
    password: 'Passwort',
    userName: 'Benutzername',
    
    // Settings
    lang: 'Sprache',
    contactUs: 'Kontaktiere uns',
    theme: 'Thema', 
    aboutApp: 'Über die App',
    profile: 'Profil',
    logOut: 'Abmelden',
    
    // Profile
    changeProfileImage: 'Tippen Sie hier, um das Profilbild zu ändern',
    changeEmail: 'E-Mail ändern',
    changeUserName: 'Benutzernamen ändern',
    updateEmail: 'E-Mail aktualisieren',
    updateUserName: 'Benutzernamen aktualisieren',
    changePassword: 'Passwort ändern',
    
    // BottomNavBar
    home: 'Startseite',
    pantry: 'Vorratskammer',
    search: 'Suche',
    scan: 'Scannen', 
    ai: 'KI',
    
    // Products
    ingredients: 'Zutaten',
    nutritionalValues: 'Nährwerte',
    betterProducts: 'Bessere Produkte:',
    noBetterProductsAvailable: 'Es sind keine besseren Produkte verfügbar',
    
    scale: 'Pro 100 g',
    energy: 'Energie',
    fats: 'Fette',
    saturated: 'Gesättigte',
    carbohydrates: 'Kohlenhydrate',
    sugars: 'Zucker',
    fibre: 'Ballaststoffe',
    protein: 'Protein',
    salt: 'Salz',
    
    cancel: 'Abbrechen',

    // Messages
      // Profile
      updateImage: 'Bild erfolgreich aktualisiert!',
      errorUpdatingImage: 'Fehler beim Aktualisieren des Bildes',
      updateEmailMsg: 'E-Mail erfolgreich aktualisiert',
      errorUpdatingEmail: 'Ein Fehler ist aufgetreten beim Aktualisieren der E-Mail, bitte versuchen Sie es erneut',
      errorCheckinEmail: 'Ein Fehler ist aufgetreten beim Überprüfen der E-Mail, bitte versuchen Sie es erneut',
      invalidEmail: 'Ungültige E-Mail',
      emptyEmail: 'Leere E-Mail!',
      changeUserNameMsg: 'Benutzername erfolgreich aktualisiert',
      errorChangingUserName: 'Ein Fehler ist aufgetreten beim Aktualisieren des Benutzernamens',
      usedUserName: 'Benutzername bereits in Verwendung!',
      emptyUserName: 'Leerer Benutzername',
      recoverPasswordMsg: 'Eine E-Mail zur Wiederherstellung des Passworts wurde gesendet',

      // Register && Login
      createUser: 'Benutzer erfolgreich erstellt!',
      emptyInputs: 'Bitte überprüfen Sie alle Felder',
      logInMessage: 'Sitzung gestartet',
      wrongLogInMessage: 'Ein Fehler ist aufgetreten beim Einloggen, überprüfen Sie die E-Mail und das Passwort',
      generalError: 'Ein Fehler ist aufgetreten, bitte versuchen Sie es erneut',
      invalidPassword: 'Das Passwort muss mindestens 6 Zeichen lang sein',
      usedEmail: 'E-Mail bereits in Verwendung',
      invalidUserName: 'Benutzername bereits in Verwendung',


    // Recipe
    translating: 'Übersetzen...',
    preparation: 'Zubereitung',
    cooking: 'Gekocht',
    rest: 'Rest',
      // Difficulty
      easy: 'Leicht',
      normal: 'Normal',
      difficult: 'Schwierig',
    steps: 'Stufen',
    serving: 'person',
    servings: 'personen'

  },


  // European Portuguese 
  
  'pt-PT': {

  // logOut
    logIn: 'Entrar', 
    register: 'Registrar',
    powered: 'Alimentado por IA',
    email: 'E-mail',
    password: 'Senha',
    userName: 'Nome de Usuário',
    
    // Settings
    lang: 'Idioma',
    contactUs: 'Contate-nos',
    theme: 'Tema', 
    aboutApp: 'Sobre o aplicativo',
    profile: 'Perfil',
    logOut: 'Sair',
    
    // Profile
    changeProfileImage: 'Toque para mudar a foto de perfil',
    changeEmail: 'Alterar e-mail',
    changeUserName: 'Alterar nome de usuário',
    updateEmail: 'Atualizar e-mail',
    updateUserName: 'Atualizar nome de usuário',
    changePassword: 'Alterar senha',
    
    // BottomNavBar
    home: 'Início',
    pantry: 'Despensa',
    search: 'Pesquisar',
    scan: 'Escanear', 
    ai: 'IA',
    
    // Products
    ingredients: 'Ingredientes',
    nutritionalValues: 'Valores Nutricionais',
    betterProducts: 'Melhores produtos:',
    noBetterProductsAvailable: 'Não há melhores produtos disponíveis',
    
    scale: 'Por 100 g',
    energy: 'Energia',
    fats: 'Gorduras',
    saturated: 'Saturadas',
    carbohydrates: 'Carboidratos',
    sugars: 'Açúcares',
    fibre: 'Fibra',
    protein: 'Proteína',
    salt: 'Sal',
    
    cancel: 'Cancelar',

    // Messages
      // Profile
      updateImage: 'Imagem atualizada com sucesso!',
      errorUpdatingImage: 'Erro ao atualizar a imagem',
      updateEmailMsg: 'E-mail atualizado com sucesso',
      errorUpdatingEmail: 'Ocorreu um erro ao atualizar o e-mail, por favor, tente novamente',
      errorCheckinEmail: 'Ocorreu um erro ao verificar o e-mail, por favor, tente novamente',
      invalidEmail: 'E-mail inválido',
      emptyEmail: 'E-mail vazio!',
      changeUserNameMsg: 'Nome de usuário atualizado com sucesso',
      errorChangingUserName: 'Ocorreu um erro ao atualizar o nome de usuário',
      usedUserName: 'Nome de usuário em uso!',
      emptyUserName: 'Nome de usuário vazio',
      recoverPasswordMsg: 'Um e-mail de recuperação de senha foi enviado',

      // Register && Login
      createUser: 'Usuário criado com sucesso!',
      emptyInputs: 'Por favor, reveja todos os campos',
      logInMessage: 'Sessão iniciada',
      wrongLogInMessage: 'Ocorreu um erro ao fazer login, verifique o e-mail e a senha',
      generalError: 'Ocorreu um erro, por favor, tente novamente',
      invalidPassword: 'A senha deve ter pelo menos 6 caracteres',
      usedEmail: 'E-mail em uso',
      invalidUserName: 'Nome de usuário em uso',


    // Recipe
    translating: 'Traduzindo...',
    preparation: 'Preparação',
    cooking: 'Cozinhado',
    rest: 'Repouso',
      // Difficulty
      easy: 'Fácil',
      normal: 'Normal',
      difficult: 'Difícil',
    steps: 'Steps',
    serving: 'pessoa',
    servings: 'pessoas'

  },


  // Italian
  'it-IT': {
    // logOut
    logIn: 'Accedi', 
    register: 'Registrati',
    powered: 'Alimentato da IA',
    email: 'E-mail',
    password: 'Password',
    userName: 'Nome utente',
    
    // Settings
    lang: 'Lingua',
    contactUs: 'Contattaci',
    theme: 'Tema', 
    aboutApp: 'Informazioni sull’app',
    profile: 'Profilo',
    logOut: 'Esci',
    
    // Profile
    changeProfileImage: 'Tocca per cambiare l’immagine del profilo',
    changeEmail: 'Cambia e-mail',
    changeUserName: 'Cambia nome utente',
    updateEmail: 'Aggiorna e-mail',
    updateUserName: 'Aggiorna nome utente',
    changePassword: 'Cambia password',
    
    // BottomNavBar
    home: 'Home',
    pantry: 'Dispensa',
    search: 'Cerca',
    scan: 'Scansiona', 
    ai: 'IA',
    
    // Products
    ingredients: 'Ingredienti',
    nutritionalValues: 'Valori Nutrizionali',
    betterProducts: 'Prodotti migliori:',
    noBetterProductsAvailable: 'Non ci sono prodotti migliori disponibili',
    
    scale: 'Per 100 g',
    energy: 'Energia',
    fats: 'Grassi',
    saturated: 'Saturi',
    carbohydrates: 'Carboidrati',
    sugars: 'Zuccheri',
    fibre: 'Fibra',
    protein: 'Proteine',
    salt: 'Sale',
    
    cancel: 'Annulla',

    // Messages
      // Profile
      updateImage: 'Immagine aggiornata con successo!',
      errorUpdatingImage: 'Errore nell’aggiornamento dell’immagine',
      updateEmailMsg: 'E-mail aggiornata con successo',
      errorUpdatingEmail: 'Si è verificato un errore durante l’aggiornamento dell’e-mail, riprova',
      errorCheckinEmail: 'Si è verificato un errore durante la verifica dell’e-mail, riprova',
      invalidEmail: 'E-mail non valida',
      emptyEmail: 'E-mail vuota!',
      changeUserNameMsg: 'Nome utente aggiornato con successo',
      errorChangingUserName: 'Si è verificato un errore durante l’aggiornamento del nome utente',
      usedUserName: 'Nome utente già in uso!',
      emptyUserName: 'Nome utente vuoto',
      recoverPasswordMsg: 'È stata inviata una e-mail per il recupero della password',

      // Register && Login
      createUser: 'Utente creato con successo!',
      emptyInputs: 'Si prega di rivedere tutti i campi',
      logInMessage: 'Sessione avviata',
      wrongLogInMessage: 'Si è verificato un errore durante l’accesso, controlla l’e-mail e la password',
      generalError: 'Si è verificato un errore, riprova',
      invalidPassword: 'La password deve essere lunga almeno 6 caratteri',
      usedEmail: 'E-mail già in uso',
      invalidUserName: 'Nome utente già in uso',


    // Recipe
    translating: 'Tradurre...',
    preparation: 'Preparazione',
    cooking: 'Cotto',
    rest: 'Riposo',
      // Difficulty
      easy: 'Facile',
      normal: 'Normale',
      difficult: 'Difficile',
    steps: 'Passi',
    serving: 'persona',
    servings: 'persone'

  }



};



const Strings = new I18n(translations);

async function saveLanguagePreference(language: string) {
  try {
    await AsyncStorage.setItem('preferredLanguage', language);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

const loadLanguagePreference = async () => {
  try {
    const preferredLanguage = await AsyncStorage.getItem('preferredLanguage');
    if (preferredLanguage) {
      Strings.locale = preferredLanguage;
    } else {
      Strings.locale = Localization.locale;
    }
  } catch (error) {
    console.error('Error loading language preference:', error);
  }
};

async function changeLanguage(language: string) {
  Strings.locale = language;
  saveLanguagePreference(language);
  await Updates.reloadAsync()
};

// Cargar la preferencia de idioma al inicio de la aplicación
loadLanguagePreference();

export { Strings, changeLanguage }
