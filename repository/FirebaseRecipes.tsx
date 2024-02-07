import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import { auth, firestore, storage } from "../firebaseConfig";
import Recipe from "../model/Recipe";
import { deleteObject, getDownloadURL, getMetadata, getStorage, list, ref, uploadBytes } from "firebase/storage";
import User from "../model/User";
import { deleteUserRecipe } from "./FirebaseUser";

async function getAllRecipes(pageSize: number, lastVisible: Recipe | null, queryText: string): Promise<{ recipes: Recipe[], lastVisible: Recipe | null }> {
  const recipesCollection = collection(firestore, 'recipes');

  let recipesQuery;

  if (queryText && queryText !== '') {
    const queryRecipes = await getMatchingRecipeIds(queryText);
    if (queryRecipes.length <= 0) {
      return { recipes: [], lastVisible: null };
    }

    recipesQuery = query(
      recipesCollection,
      where('id', 'in', queryRecipes),
      orderBy('title')
    );
  } else {
    recipesQuery = query(recipesCollection, orderBy('title'));
  }

  if (lastVisible) {
    recipesQuery = query(recipesQuery, startAfter(lastVisible.title));
  }

  const paginatedQuery = query(recipesQuery, limit(pageSize));

  const querySnapshot = await getDocs(paginatedQuery);

  const recipes: Recipe[] = [];

  querySnapshot.forEach((doc) => recipes.push(doc.data() as Recipe));

  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  const newLastVisible = lastDoc ? (lastDoc.data() as Recipe) : null;

  return { recipes, lastVisible: newLastVisible };
}

async function getRecipesByUserWithSearch(
  userId: string,
  pageSize: number,
  lastVisible: Recipe | null,
  queryText: string
): Promise<{ recipes: Recipe[], lastVisible: Recipe | null }> {

  const isRecipesIdsNotEmpty = await isUserRecipesIdsNotEmpty(userId);

  if (!isRecipesIdsNotEmpty) {
    return { recipes: [], lastVisible: null };
  }

  const recipesCollection = collection(firestore, 'recipes');
  let recipesQuery;
  const userDoc = (await getDoc(doc(firestore, 'users', userId))).data() as User;
  const userRecipeIds: string[] = userDoc.recipesIds;

  if (userRecipeIds.length <= 0) {
    return { recipes: [], lastVisible: null };
  }

  const matchingRecipeIds = await getMatchingRecipeIds(queryText);
  const filteredUserRecipeIds = userRecipeIds.filter((id) => matchingRecipeIds.includes(id));

  if (filteredUserRecipeIds.length <= 0) {
    return { recipes: [], lastVisible: null };
  }

  recipesQuery = query(
    recipesCollection,
    where('id', 'in', filteredUserRecipeIds),
    orderBy('title')
  );

  if (lastVisible) {
    recipesQuery = query(recipesQuery, startAfter(lastVisible.title));
  }

  const paginatedQuery = query(recipesQuery, limit(pageSize));

  const querySnapshot = await getDocs(paginatedQuery);

  const recipes: Recipe[] = [];

  querySnapshot.forEach((doc) => recipes.push(doc.data() as Recipe));

  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  const newLastVisible = lastDoc ? (lastDoc.data() as Recipe) : null;

  return { recipes, lastVisible: newLastVisible };
}

async function isUserRecipesIdsNotEmpty(userId: string): Promise<boolean> {
  try {
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    const userRecipeIds = userDoc.data()?.recipesIds as string[];
    return userRecipeIds.length > 0;
  } catch (error) {
    console.error("Error al obtener el campo recipesIds del usuario:", error);
    return false;
  }
}

async function getMatchingRecipeIds(recipeTitle: string): Promise<string[]> {
  const recipesCollection = collection(firestore, 'recipes');

  const querySnapshot = await getDocs(recipesCollection);

  const matchingRecipeIds: string[] = [];

  querySnapshot.forEach((doc) => {
    const title = (doc.data() as Recipe).title.toLowerCase();
    if (title.includes(recipeTitle.toLowerCase())) {
      matchingRecipeIds.push(doc.id);
    }
  });

  return matchingRecipeIds;
}

async function addRecipe(recipe: Recipe) {
  try {
    const recipesCollection = collection(firestore, 'recipes');
    
    const docRef = await addDoc(recipesCollection, {});
    
    const recipeId = docRef.id;
    recipe.id = recipeId;
    recipe.userId = auth.currentUser!!.uid;

    const recipeDocRef = doc(recipesCollection, recipeId);
    const images = await uploadRecipeImages(recipeId, recipe.images);
    recipe.images = images;
    recipe.mainImage = recipe.images[0];
    await updateDoc(recipeDocRef, recipe);
    
    return recipeId;

  } catch (e) {
    console.error(e);
    return false;
  }
}

async function uploadRecipeImages(recipeId: string, images: string[]) {
  const imagesDownloadURLs = [];

  for (const imageUri of images) {
    try {
      const imageFileName = generateImageFileName();
      const storageRef = ref(storage, `recipes/${recipeId}/${imageFileName}`);
      await uploadBytes(storageRef, await fetch(imageUri).then(response => response.blob()));
      const downloadURL = await getDownloadURL(storageRef);
      imagesDownloadURLs.push(downloadURL);
    } catch (error) {
      console.error("Error al subir una imagen:", error);
    }
  }

  return imagesDownloadURLs;
}

function generateImageFileName() {
  return `${Date.now()}`;
}


async function deleteRecipe(recipeId: string) {
  try {
    const recipeQuery = query(collection(firestore, "recipes"), where("id", "==", recipeId));
    const recipeSnapshot = await getDocs(recipeQuery);

    if (!recipeSnapshot.empty) {
      const recipeDoc = recipeSnapshot.docs[0];
      await deleteDoc(doc(firestore, "recipes", recipeDoc.id));

      const storageRef = ref(getStorage(), `recipes/${recipeId}/`);

      const storageImages = await list(storageRef);

      try {

        for (const imageRef of storageImages.items) {
          await deleteObject(imageRef);
          if (await deleteUserRecipe(recipeId)) {

            console.log("Receta y objetos de Storage eliminados correctamente");
          };
        }
       

      } catch (storageError) {
        console.error("Error al eliminar el objeto de Storage:", storageError);
      }


  } 
  
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
  }
}


async function getNewestRecipes(maxRecipes: number): Promise<Recipe[]> {
  const recipesCollection = collection(firestore, 'recipes');

  const newRecipesQuery = query(recipesCollection, orderBy('timestamp', 'desc'), limit(maxRecipes));

  const querySnapshot = await getDocs(newRecipesQuery);

  const newRecipes: Recipe[] = [];

  querySnapshot.forEach((doc) => newRecipes.push(doc.data() as Recipe));

  return newRecipes;
}

async function getBestRecipes(maxRecipes: number): Promise<Recipe[]> {
  const recipesCollection = collection(firestore, 'recipes');

  const bestRecipesQuery = query(recipesCollection, orderBy('assessment', 'desc'), limit(maxRecipes));

  const querySnapshot = await getDocs(bestRecipesQuery);

  const bestRecipes: Recipe[] = [];

  querySnapshot.forEach((doc) => bestRecipes.push(doc.data() as Recipe));

  return bestRecipes;
}


export { getAllRecipes, addRecipe, getRecipesByUserWithSearch, isUserRecipesIdsNotEmpty, deleteRecipe, getNewestRecipes, getBestRecipes };
