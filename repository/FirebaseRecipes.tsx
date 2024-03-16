import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, startAfter, updateDoc, where } from "firebase/firestore";
import { auth, firestore, storage } from "../firebaseConfig";
import Recipe from "../model/Recipe";
import { deleteObject, getDownloadURL, getStorage, list, ref, uploadBytes } from "firebase/storage";
import { User } from "../model/User";
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
    const recipe = (doc.data() as Recipe)
    console.log(recipe);
    const title = recipe.title.toLowerCase();
    const category = recipe.category.toLowerCase();

    if (title.includes(recipeTitle.toLowerCase())) {
      matchingRecipeIds.push(doc.id);
    }
    else {
      if (category.includes(recipeTitle.toLowerCase())) {
        matchingRecipeIds.push(doc.id);
      }
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
    recipe.timestamp = serverTimestamp();

    await updateDoc(recipeDocRef, recipe);
    
    return recipeId;

  } catch (e) {
    console.error(e);
    return false;
  }
}


async function updateRecipe(recipe: Recipe) {

  try {
    const recipesCollection = collection(firestore, 'recipes');
    
    const recipeDocRef = doc(recipesCollection, recipe.id);
    
    const existingRecipe = (await getDoc(recipeDocRef)).data() as Recipe;

    const deletedImages = existingRecipe.images.filter(existingImage => !recipe.images.includes(existingImage));

    await deleteRecipeImages(deletedImages);

    let remainingImages = existingRecipe.images.filter(existingImage => !deletedImages.includes(existingImage));
    // console.log('imagenes restantes -->', remainingImages);
    const newImages = recipe.images.filter(newImage => !existingRecipe.images.includes(newImage));
    // console.log('nuevas imagenes -->', newImages);
    const images = await uploadRecipeImages(recipe.id, newImages);
    // console.log('imagenes subidas -->', images);
    remainingImages = [...remainingImages, ...images];
    // console.log('imagenes subidas concatenadas a las que ya estaban -->', images);

    recipe.images = remainingImages;
    recipe.mainImage = remainingImages[0];

    await updateDoc(recipeDocRef, recipe);
    return true;

  } catch (e) {
    console.error(e);
    return false;
  }
  
}

async function deleteRecipeImages(images: string[]) {
  try {

    for (const imageURL of images) {
      const path = getPathStorageFromUrl(imageURL);
      const imageRef = ref(getStorage(), path);

      // Delete the image in Firebase Storage
      await deleteObject(imageRef);

      console.log(`Deleted image at path: ${path}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting images:', error);
    return false;
  }
}

// Function to extract path from the image URL
function getPathStorageFromUrl(imageURL: string) {
  const regexResult = imageURL.match(/\/o\/(.+)\?alt=media&token=/);
  return regexResult ? decodeURIComponent(regexResult[1]) : undefined;
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


async function deleteRecipe(recipeId: string): Promise<boolean> {
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
            return true;
          }
        }
       

      } catch (storageError) {
        console.error("Error al eliminar el objeto de Storage:", storageError);
        return false;
      }

    return false;
  } 
  
  } catch (error) {
    console.error("Error al eliminar la receta:", error);
    return false;
  }

  return false;
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


async function handleRecipeLike(userId: string, recipeId: string) {

  try {
    const recipesCollection = collection(firestore, 'recipes');
    
    const recipeDocRef = doc(recipesCollection, recipeId);
    
    const recipe = (await getDoc(recipeDocRef)).data() as Recipe;

    let updatedLikedUsersId: string[]

    if (recipe.likedUsersId.includes(userId)) {
      updatedLikedUsersId = recipe.likedUsersId.filter((id) => id !== userId);
    }
    else {
      updatedLikedUsersId = recipe.likedUsersId.concat(userId);
    }


    const likes = updatedLikedUsersId.length;

    await updateDoc(recipeDocRef, {likedUsersId: updatedLikedUsersId, likes: likes});

    return updatedLikedUsersId;
    
  } catch (storageError) {
    console.error('Liked Recipe', storageError);
  }
}


async function updateRecipeAssessment(recipeId: string, numberOfRatings: number, newTotalRating: number, normalizedAssessment: number) {
  try {
    const recipesCollection = collection(firestore, 'recipes');
    
    const recipeDocRef = doc(recipesCollection, recipeId);
        
    const updatedFields = {
      numberOfRatings: numberOfRatings,
      totalRating: newTotalRating,
      assessment: normalizedAssessment
    };

    await updateDoc(recipeDocRef, updatedFields);

    return true;    
  } catch (storageError) {
    return false;
  }
}







export { getAllRecipes, addRecipe, getRecipesByUserWithSearch, isUserRecipesIdsNotEmpty, deleteRecipe, getNewestRecipes, getBestRecipes, updateRecipe, handleRecipeLike, updateRecipeAssessment };
