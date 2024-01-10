import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import Recipe from "../model/Recipe";

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
  // console.log('Recipes --> ', recipes)

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

export { getAllRecipes }
