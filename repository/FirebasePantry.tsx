import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";
import Ingredient from "../model/Ingredient";
import Pantry from "../model/Pantry";


async function getPantry(): Promise<Pantry> {
  try {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      return {products: []};
    }

    const pantryDocRef = doc(firestore, 'pantries', userId);
    const pantryDocSnapshot = await getDoc(pantryDocRef);
    
    if (pantryDocSnapshot.exists()) {
      const pantry = pantryDocSnapshot.data() as Pantry;
      return pantry;

    } 
  } catch (error) {
    console.error('Error getting pantry:', error);
    throw error;
  }
  return {products: []}
}

async function updatePantryIngredient(amount: number, index: number) {

  try {
    const userId = auth.currentUser!!.uid;
    const pantryDocRef = doc(firestore, 'pantries', userId);
    const pantryDocSnapshot = await getDoc(pantryDocRef);
    
    if (pantryDocSnapshot.exists()) {
      const pantry = pantryDocSnapshot.data() as Pantry;
      pantry.products[index].amount = amount;
      
      setDoc(pantryDocRef, pantry);

    } else {
      return null;
    }
  } catch (error) {
    return null;   
  }   
  
}

async function removeIngredientFromPantry(index: number) {
  try {
    const userId = auth.currentUser!!.uid;
    const pantryDocRef = doc(firestore, 'pantries', userId);
    const pantryDocSnapshot = await getDoc(pantryDocRef);
    
    if (pantryDocSnapshot.exists()) {
      const pantry = pantryDocSnapshot.data() as Pantry;
      pantry.products.splice(index, 1);
      
      setDoc(pantryDocRef, pantry);

    } else {
      return null;
    }
  } catch (error) {
    return null;   
  }   
}


async function addIngredientToPantry(ingredient: Ingredient) {
  try {
    const userId = auth.currentUser!!.uid;
    const pantryDocRef = doc(firestore, 'pantries', userId);
    const pantryDocSnapshot = await getDoc(pantryDocRef);
    
    if (pantryDocSnapshot.exists()) {
      const pantry = pantryDocSnapshot.data() as Pantry;
      
      let isIngredientInPantry = false;
      pantry.products.forEach(product => {
        if (product.name.toLocaleLowerCase() === ingredient.name.toLocaleLowerCase()) {
          isIngredientInPantry = true;
        }
      });
      

      if (!isIngredientInPantry) {
        pantry.products.push(ingredient);
        pantry.products.sort((a: Ingredient, b:Ingredient) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        setDoc(pantryDocRef, pantry);
        return true;
      }
        
      return false;
    }

  } catch (e) {
    return false;
  } 
  
}



async function createPantry(userId: string): Promise<boolean> {
  try {
    const pantryDoc = doc(collection(firestore, 'pantries'), userId);
    await setDoc(pantryDoc, {products: []});
    return true;

  } catch (e) {
    return false
  } 
  
}



// async function getBetterProducts(name: string, rate: number): Promise<Array<Product>> {
//   try {
//     const productsQuery = query(
//       collection(firestore, 'products'),
//       where('name', '==', name),
//       where('rate', '>', rate),
//       orderBy('rate', 'desc'),
//       limit(3)
//     )

//     const productsSnapshot = await getDocs(productsQuery);

//     const products: Product[] = [];
    
//     productsSnapshot.forEach((doc) => {
//       const productData = doc.data() as Product;
//       products.push(productData);
//     });

//     return products;
//   } catch (error) {
//     console.error('Error al obtener productos:', error);
//     throw error;
//   }
// }

async function consumeIngredients(recipeIngredients: Ingredient[]) {
  try {
    const pantry = await getPantry();
    const missingIngredients: Ingredient[] = [];
    const exhaustedIngredients: Ingredient[] = [];
    
    for (let i = 0; i < recipeIngredients.length; i++) {
      const recipeIngredient = recipeIngredients[i];
      const recipeNameLower = recipeIngredient.englishVersion.toLowerCase();
      

      const pantryIngredient = pantry.products.find((pantryItem) => {
        return pantryItem.englishVersion.toLowerCase().includes(recipeNameLower) || recipeNameLower.includes(pantryItem.englishVersion.toLowerCase());
      });
      
      if (pantryIngredient) {
        
        const convertedAmount = await convertUnit(recipeIngredient.unit.toLowerCase(), recipeIngredient.amount, pantryIngredient.unit.toLowerCase());

        // console.log('Producto:', pantryIngredient.englishVersion)

        let remainingAmount = pantryIngredient.amount - convertedAmount;

        if (remainingAmount <= 0) {
          remainingAmount = 0;
          exhaustedIngredients.push(pantryIngredient);
        } 
        
        // console.log('En la despensa:', pantryIngredient.amount + pantryIngredient.unit + ' Si le quito ' + recipeIngredient.amount + ' ' + recipeIngredient.unit +'  . Lo que queda:  ' + remainingAmount)
        await updatePantryIngredient(remainingAmount , i);
      } else {

        missingIngredients.push(recipeIngredient);
      }
    }
    
    console.log('Ingredientes agotados:', exhaustedIngredients);
    console.log('Ingredientes faltantes:', missingIngredients);
    return {
      exhaustedIngredients: exhaustedIngredients,
      missingIngredients: missingIngredients
    }
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}




async function convertUnit(fromUnit: string, fromAmount: number, toUnit: string): Promise<number> {


  let toAmount = fromAmount; 
  
  if (fromUnit === 'kg' && toUnit === 'g') {
    toAmount *= 1000;

  } else if (fromUnit === 'gr' && toUnit === 'kg') {
    toAmount /= 1000;
  
  } else if (fromUnit === 'l' && toUnit === 'ml') {
    toAmount *= 1000;
  
  } else if (fromUnit === 'ml' && toUnit === 'l') {
    toAmount /= 1000;
  
  } 
  
  return toAmount;
}


export { addIngredientToPantry, consumeIngredients, createPantry, getPantry, removeIngredientFromPantry, updatePantryIngredient };
