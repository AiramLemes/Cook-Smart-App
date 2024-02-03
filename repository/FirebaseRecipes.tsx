import { addDoc, collection, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Recipe from "../model/Recipe";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// CAMBIAR EL NOMBRE DE LA FUNCIÓN getAllRecipes

async function getAllRecipes(pageSize: number, lastVisible: Recipe | null, queryText: string): Promise<{ recipes: Recipe[], lastVisible: Recipe | null }> {
  // console.log('lastVisible --> ', lastVisible);
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
  console.log('Recipes --> ', recipes)

  return { recipes, lastVisible: newLastVisible };
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
  
    const recipeDocRef = doc(recipesCollection, recipeId);
    
    console.log(uploadRecipeImages(recipeId, recipe.images));
    recipe.mainImage = recipe.images[0];

    //@ts-ignore
    await updateDoc(recipeDocRef, recipe);
    
    return true;
    
  } catch(e) {
    console.log(e)
    return false;
  }

}

async function uploadRecipeImages(recipeId: string, images: string[]) {
  const imagesDownloadURLs = [];

  for (const imageUri of images) {
    try {
      const imageFileName = generateImageFileName();
      const storageRef = ref(getStorage(), `recipes/${recipeId}/${imageFileName}`);
      
      await uploadBytes(storageRef, await fetch(imageUri).then(response => response.blob()));

      const downloadURL = await getDownloadURL(storageRef);
      imagesDownloadURLs.push(downloadURL);

    } catch (error) {
      console.error("Error al subir una imagen:", error);
      // Puedes manejar el error según tus necesidades
    }
  }

  return imagesDownloadURLs;
}

function generateImageFileName() {
  // Implementa tu lógica para generar un nombre de archivo único
  // Puedes utilizar bibliotecas como `uuid` o simplemente agregar un timestamp único al nombre del archivo
  // Aquí un ejemplo simple usando el timestamp actual
  return `${Date.now()}`;
}

export { getAllRecipes, addRecipe }

