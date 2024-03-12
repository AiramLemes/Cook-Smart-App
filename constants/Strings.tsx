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
    servings: 'personas',

    


    numberOfPeople: 'Número de personas',
    addIngredient: 'Añadir ingredientes',
    ingredientNameInput: 'Ingresa el nombre',
    ingredientAmountInput: 'Introduce la cantidad',
    ingredientUnitInput: 'Introduce la unidad',
    accept: 'Aceptar',
    itemAlreadyInPantryMessage: 'El producto ya se encuentra en la despensa',
    pantryConfirmationDialog: '¿Está seguro de que quieres eliminar este objeto de la lista?',
    deleteRecipeConfirmationDialog: '¿Está seguro de que quiere eliminar la receta? Esta acción no se puede deshacer.',
    noRecipes: 'No hay recetas disponibles',
    deletedRecipe: 'Receta eliminada correctamente',
    deleteRecipeError: 'Se ha producido un error al eliminar la receta',
    salad: 'Ensaladas',
    pasta: 'Pasta',
    meat: 'Carne',
    fish: 'Pescado',
    vegetarian: 'Vegetariano',
    desserts: 'Dulces',
    soups: 'Sopas',
    drinks: 'Bebidas',
    breakfast: 'Desayuno',
    bestRecipes: 'Recetas mejor valoradas',
    newestRecipes: 'Últimas recetas',
    recipeForm1ImageError: 'Tienes que subir al menos 1 imagen',
    recipeForm1EmptyIngredients: 'La lista de ingredientes no puede estar vacía',
    next: 'Siguiente',
    recipeTitle: 'Título de la receta',
    recipeForm1EmptyTitle: 'El título no puede estar vacío',
    update: 'Actualizar',
    create: 'Crear',
    stepsForm: 'Escribe tus pasos aquí ...',
    recipeForm2CreateError: 'Se ha producido un error al crear la receta',
    createRecipe: 'Receta creada correctamente',
    updateRecipe: 'Receta actualizada correctamente',
    iaRecipeError: 'Se ha producido un error al generar la receta, por favavor, inténtelo de nuevo !',
    iaTitle: 'Crea tus recetas personalizadas con la ayuda de ...',
    iaAddProduct: 'Introduce un producto',
    iaButton: 'Sorpréndeme',
    iaAnimationText: 'Espere un momento...',
    errorTranslating: 'Error al traducir',
    scanPermissionMessage: 'Solicitando permisos de cámara',
    scanNoPermission: 'No se puede acceder a la cámara',
    deleteRecipe: 'Receta eliminada correctamente',

    amount: 'Cantidad',
    unit: 'Unidad',
    difficulty: 'Dificultad',
    category: 'Categoría',
    selectCategory: 'Seleccione una categoría',
    enterIngredientName: 'Nombre del ingrediente',
    carouselImageTitle1: 'Libere su creatividad culinaria con la creación de recetas a través de ChatGPT.',
    carouselImageTitle2:'Experiencia de supermercado sin fisuras: Explore la información de los productos al instante',
    carouselImageTitle3: '¡Organice su despensa virtual sin esfuerzo!',
    emptyPantry: 'La despensa está vacía :(',


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


    numberOfPeople: 'Number of persons',
    addIngredient: 'Add ingredients',
    ingredientNameInput: 'Enter the name',
    ingredientAmountInput: 'Enter the amount',
    ingredientUnitInput: 'Insert the unit',
    accept: 'Accept',
    itemAlreadyInPantryMessage: 'The product is already in the pantry',
    pantryConfirmationDialog: 'Are you sure you want to remove this item from the list?',
    deleteRecipeConfirmationDialog: 'Are you sure you want to delete the recipe? This action cannot be undone.',
    noRecipes: 'No prescriptions available',
    deletedRecipe: 'Recipe successfully deleted',
    deleteRecipeError: 'An error occurred while deleting the recipe',
    salad: 'Salads',
    pasta: 'Pasta',
    meat: 'Meat',
    fish: 'Fish',
    vegetarian: 'Vegetarian',
    desserts: 'Sweets',
    soups: 'Soups',
    drinks: 'Beverages',
    breakfast: 'Breakfast',
    bestRecipes: 'Top rated recipes',
    newestRecipes: 'Latest recipes',
    recipeForm1ImageError: 'You have to upload at least 1 image',
    recipeForm1EmptyIngredients: 'The list of ingredients must not be empty',
    next: 'Next',
    recipeTitle: 'Recipe title',
    recipeForm1EmptyTitle: 'The title cannot be empty',
    update: 'Update',
    create: 'Create',
    stepsForm: 'Write your steps here ...',
    recipeForm2CreateError: 'An error occurred while creating the recipe',
    createRecipe: 'Recipe successfully created',
    updateRecipe: 'Recipe successfully updated',
    iaRecipeError: 'An error occurred while generating the recipe, please try again !',
    iaTitle: 'Create your personalized recipes with the help of ...',
    iaAddProduct: 'Enter a product',
    iaButton: 'Surprise me',
    iaAnimationText: 'Wait a moment...',
    errorTranslating: 'Error in translation',
    scanPermissionMessage: 'Requesting camera permissions',
    scanNoPermission: 'Cannot access the camera',
    deleteRecipe: 'Recipe successfully deleted',


    amount: 'Quantity',
    unit: 'Unit',
    difficulty: 'Difficulty',
    category: 'Category',
    enterIngredientName: 'Ingredient name',
    selectCategory: 'Select a category',
    carouselImageTitle1: 'Unlock Culinary Creativity with ChatGPT-Powered Recipe Creation!',
    carouselImageTitle2:'Seamless Supermarket Experience: Explore Product Information Instantly!',
    carouselImageTitle3: 'Organize Your Virtual Pantry Effortlessly!',
    emptyPantry: 'The pantry is empty :(',


    
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
    servings: 'personnes',


    numberOfPeople: 'Nombre de personnes',
    addIngredient: 'Ajouter les ingrédients',
    ingredientNameInput: 'Saisir le nom',
    ingredientAmountInput: 'Saisir la quantité',
    ingredientUnitInput: "Insérer l'appareil",
    accept: 'Accepter',
    itemAlreadyInPantryMessage: 'Le produit est déjà dans le garde-manger',
    pantryConfirmationDialog: 'Êtes-vous sûr de vouloir supprimer cet élément de la liste ?',
    deleteRecipeConfirmationDialog: 'Êtes-vous sûr de vouloir supprimer la recette ? Cette action ne peut être annulée.',
    noRecipes: 'Pas de prescriptions disponibles',
    deletedRecipe: 'Recette supprimée avec succès',
    deleteRecipeError: "Une erreur s'est produite lors de la suppression de la recette",
    salad: 'Salades',
    pasta: 'Pâtes',
    meat: 'Viande',
    fish: 'Poisson',
    vegetarian: 'Végétarien',
    desserts: 'Bonbons',
    soups: 'Soupes',
    drinks: 'Boissons',
    breakfast: 'Petit déjeuner',
    bestRecipes: 'Recettes les mieux notées',
    newestRecipes: 'Dernières recettes',
    recipeForm1ImageError: 'Vous devez télécharger au moins une image',
    recipeForm1EmptyIngredients: 'La liste des ingrédients ne doit pas être vide',
    next: 'Suivant',
    recipeTitle: 'Titre de la recette',
    recipeForm1EmptyTitle: 'Le titre ne peut pas être vide',
    update: 'Mise à jour',
    create: 'Créer',
    stepsForm: 'Inscrivez vos étapes ici ...',
    recipeForm2CreateError: "Une erreur s'est produite lors de la création de la recette",
    createRecipe: 'Recette créée avec succès',
    updateRecipe: 'Recette correctement mise à jour',
    iaRecipeError: "Une erreur s'est produite lors de la génération de la recette, veuillez réessayer !",
    iaTitle: "Créez vos propres recettes personnalisées avec l'aide de ...",
    iaAddProduct: 'Saisir un produit',
    iaButton: 'Surprenez-moi',
    iaAnimationText: 'Attendez un instant...',
    errorTranslating: 'Erreur de traduction',
    scanPermissionMessage: "Demande d'autorisation pour les caméras",
    scanNoPermission: "Il n'est pas possible d'accéder à l'appareil photo",
    deleteRecipe: 'Recette supprimée avec succès',


    amount: 'Quantité',
    unit: 'Unité',
    difficulty: 'Difficulté',
    category: 'Catégorie',
    selectCategory: 'Sélectionner une catégorie',
    enterIngredientName: "Nom de l'ingrédient",
    carouselImageTitle1: 'Libérez votre créativité culinaire grâce à la création de recettes par ChatGPT !',
    carouselImageTitle2:"L'expérience du supermarché en toute transparence : explorez instantanément les informations sur les produits !",
    carouselImageTitle3: 'Organisez votre garde-manger virtuel sans effort !',
    emptyPantry: 'Le garde-manger est vide :(',

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
    servings: 'personen',


    numberOfPeople: 'Anzahl der Personen',
    addIngredient: 'Zutaten hinzufügen',
    ingredientNameInput: 'Geben Sie den Namen ein',
    ingredientAmountInput: 'Geben Sie die Menge ein',
    ingredientUnitInput: 'Einsetzen der Einheit',
    accept: 'Akzeptieren',
    itemAlreadyInPantryMessage: 'Das Produkt befindet sich bereits in der Speisekammer',
    pantryConfirmationDialog: 'Sind Sie sicher, dass Sie diesen Eintrag aus der Liste entfernen möchten?',
    deleteRecipeConfirmationDialog: 'Sind Sie sicher, dass Sie das Rezept löschen wollen? Diese Aktion kann nicht rückgängig gemacht werden.',
    noRecipes: 'Keine Verschreibungen verfügbar',
    deletedRecipe: 'Rezept erfolgreich gelöscht',
    deleteRecipeError: 'Beim Löschen des Rezepts ist ein Fehler aufgetreten',
    salad: 'Salate',
    pasta: 'Nudeln',
    meat: 'Fleisch',
    fish: 'Fisch',
    vegetarian: 'Vegetarisch',
    desserts: 'Süßigkeiten',
    soups: 'Suppen',
    drinks: 'Getränke',
    breakfast: 'Frühstück',
    bestRecipes: 'Am besten bewertete Rezepte',
    newestRecipes: 'Neueste Rezepte',
    recipeForm1ImageError: 'Sie müssen mindestens 1 Bild hochladen',
    recipeForm1EmptyIngredients: 'Das Verzeichnis der Zutaten darf nicht leer sein',
    next: 'Weiter',
    recipeTitle: 'Titel des Rezepts',
    recipeForm1EmptyTitle: 'Der Titel darf nicht leer sein',
    update: 'Update',
    create: 'erstellen.',
    stepsForm: 'Schreiben Sie Ihre Schritte hier auf ...',
    recipeForm2CreateError: 'Beim Erstellen des Rezepts ist ein Fehler aufgetreten',
    createRecipe: 'Erfolgreich erstelltes Rezept',
    updateRecipe: 'Korrekt aktualisiertes Rezept',
    iaRecipeError: 'Beim Generieren des Rezepts ist ein Fehler aufgetreten, bitte versuchen Sie es erneut!',
    iaTitle: 'Erstellen Sie Ihre persönlichen Rezepte mit Hilfe von ...',
    iaAddProduct: 'Ein Produkt eingeben',
    iaButton: 'Überraschen Sie mich',
    iaAnimationText: 'Warten Sie einen Moment...',
    errorTranslating: 'Fehler in der Übersetzung',
    scanPermissionMessage: 'Beantragung von Kameraerlaubnissen',
    scanNoPermission: 'Auf die Kamera kann nicht zugegriffen werden',
    deleteRecipe: 'Rezept erfolgreich gelöscht',

    
    amount: 'Menge',
    unit: 'Einheit',
    difficulty: 'Schwierigkeitsgrad',
    category: 'Kategorie',
    selectCategory: 'Wählen Sie eine Kategorie',
    enterIngredientName: 'Name des Inhaltsstoffs',
    carouselImageTitle1: 'Entfesseln Sie Ihre kulinarische Kreativität mit ChatGPT-gestützter Rezepterstellung!',
    carouselImageTitle2:'Nahtlose Supermarkterfahrung: Produktinformation sofort erkunden!',
    carouselImageTitle3: 'Organisieren Sie Ihren virtuellen Vorratsschrank mühelos!',
    emptyPantry: 'Die Speisekammer ist leer :(',

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
    servings: 'pessoas',


    numberOfPeople: 'Número de pessoas',
    addIngredient: 'Adicionar ingredientes',
    ingredientNameInput: 'Introduzir o nome',
    ingredientAmountInput: 'Introduzir a quantidade',
    ingredientUnitInput: 'Inserir a unidade',
    accept: 'Aceitar',
    itemAlreadyInPantryMessage: 'O produto já está na despensa',
    pantryConfirmationDialog: 'Tem a certeza de que pretende remover este item da lista?',
    deleteRecipeConfirmationDialog: 'Tem a certeza de que pretende eliminar a receita? Esta ação não pode ser anulada.',
    noRecipes: 'Não há receitas disponíveis',
    deletedRecipe: 'Receita eliminada com sucesso',
    deleteRecipeError: 'Ocorreu um erro ao eliminar a receita',
    salad: 'Saladas',
    pasta: 'Massa',
    meat: 'Carne',
    fish: 'Peixe',
    vegetarian: 'Vegetariano',
    desserts: 'Doces',
    soups: 'Sopas',
    drinks: 'Bebidas',
    breakfast: 'Pequeno-almoço',
    bestRecipes: 'Receitas com melhor classificação',
    newestRecipes: 'Últimas receitas',
    recipeForm1ImageError: 'Tem de carregar pelo menos uma imagem',
    recipeForm1EmptyIngredients: 'A lista de ingredientes não pode estar vazia',
    next: 'Seguinte',
    recipeTitle: 'Título da receita',
    recipeForm1EmptyTitle: 'O título não pode estar vazio',
    update: 'Atualização',
    create: 'Criar',
    stepsForm: 'Escreva aqui os seus passos ...',
    recipeForm2CreateError: 'Ocorreu um erro ao criar a receita',
    createRecipe: 'Receita criada com sucesso',
    updateRecipe: 'Receita actualizada com sucesso',
    iaRecipeError: 'Ocorreu um erro ao gerar a receita, tente novamente!',
    iaTitle: 'Crie as suas próprias receitas personalizadas com a ajuda de ...',
    iaAddProduct: 'Introduzir um produto',
    iaButton: 'Surpreender-me',
    iaAnimationText: 'Espera um minuto...',
    errorTranslating: 'Erro de tradução',
    scanPermissionMessage: 'Pedir autorizações para câmaras',
    scanNoPermission: 'A câmara não pode ser acedida',
    deleteRecipe: 'Receita eliminada com sucesso',


    amount: 'Quantidade',
    unit: 'Unidade',
    difficulty: 'Dificuldade',
    category: 'Categoria',
    selectCategory: 'Selecionar uma categoria',
    enterIngredientName: 'Nome do ingrediente',
    carouselImageTitle1: 'Liberte a criatividade culinária com a criação de receitas através do ChatGPT!',
    carouselImageTitle2:'Experiência de supermercado sem falhas: Explore as informações sobre os produtos instantaneamente!',
    carouselImageTitle3: 'Organize a sua despensa virtual sem esforço!',
    emptyPantry: 'A despensa está vazia :(',

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
    servings: 'persone',



    numberOfPeople: 'Numero di persone',
    addIngredient: 'Aggiungere gli ingredienti',
    ingredientNameInput: 'Inserire il nome',
    ingredientAmountInput: 'Inserire la quantità',
    ingredientUnitInput: "Inserire l'unità",
    accept: 'Accettare',
    itemAlreadyInPantryMessage: 'Il prodotto è già in dispensa',
    pantryConfirmationDialog: "Siete sicuri di voler rimuovere questo elemento dall'elenco?",
    deleteRecipeConfirmationDialog: "Siete sicuri di voler eliminare la ricetta? Questa azione non può essere annullata.",
    noRecipes: 'Nessuna prescrizione disponibile',
    deletedRecipe: 'Ricetta eliminata con successo',
    deleteRecipeError: "Si è verificato un errore durante l'eliminazione della ricetta",
    salad: 'Insalate',
    pasta: 'Pasta',
    meat: 'Carne',
    fish: 'Pesce',
    vegetarian: 'Vegetariano',
    desserts: 'Dolci',
    soups: 'Zuppe',
    drinks: 'Bevande',
    breakfast: 'Colazione',
    bestRecipes: 'Le ricette più votate',
    newestRecipes: 'Ultime ricette',
    recipeForm1ImageError: 'È necessario caricare almeno 1 immagine',
    recipeForm1EmptyIngredients: "L'elenco degli ingredienti non deve essere vuoto",
    next: 'Avanti',
    recipeTitle: 'Titolo della ricetta',
    recipeForm1EmptyTitle: 'Il titolo non può essere vuoto',
    update: 'Aggiornamento',
    create: 'Creare',
    stepsForm: 'Scrivete qui i vostri passi...',
    recipeForm2CreateError: 'Si è verificato un errore durante la creazione della ricetta',
    createRecipe: 'Ricetta creata con successo',
    updateRecipe: 'Ricetta aggiornata correttamente',
    iaRecipeError: 'Si è verificato un errore durante la generazione della ricetta, riprovare!',
    iaTitle: "Create le vostre ricette personalizzate con l'aiuto di ...",
    iaAddProduct: 'Inserire un prodotto',
    iaButton: 'Sorprendimi',
    iaAnimationText: 'Aspetta un attimo...',
    errorTranslating: 'Errore di traduzione',
    scanPermissionMessage: 'Richiesta di autorizzazioni per le telecamere',
    scanNoPermission: 'Non è possibile accedere alla telecamera',
    deleteRecipe: 'Ricetta eliminata con successo',


    amount: 'Quantità',
    unit: 'Unità',
    difficulty: 'Difficoltà',
    category: 'Categoria',
    selectCategory: 'Selezionare una categoria',
    enterIngredientName: "Nome dell'ingrediente",
    carouselImageTitle1: 'Liberate la creatività culinaria con la creazione di ricette via ChatGPT!',
    carouselImageTitle2:'Esperienza di supermercato senza soluzione di continuità: esplorate immediatamente le informazioni sui prodotti!',
    carouselImageTitle3: 'Organizzate la vostra dispensa virtuale senza sforzo!',
    emptyPantry: 'La dispensa è vuota :(',

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
