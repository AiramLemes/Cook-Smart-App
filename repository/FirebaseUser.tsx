import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import Toast from "react-native-root-toast";
import { auth, firestore } from "../firebaseConfig";
import Ingredient from "../model/Ingredient";
import User from "../model/User";
import ToastUtil from "../utils/ToastUtil";
import { createPantry } from "./FirebasePantry";

let unsubscribeImageSnapshot: (() => void) | null = null;

async function getUserImage(callback: (imageURL: string) => void) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      // Detener la suscripción anterior si existe
      if (unsubscribeImageSnapshot) {
        unsubscribeImageSnapshot();
        unsubscribeImageSnapshot = null;
      }

      // Suscribirse a cambios en el documento del usuario
      unsubscribeImageSnapshot = onSnapshot(userDocRef, (userDocSnapshot) => {
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userImage = userData?.image;

          if (userImage) {
            callback(userImage);
          }
        }
      }, (error) => {
        console.error('Error al obtener datos del usuario:', error);
        Toast.show('Se ha producido un error al cargar la imagen', {
          duration: Toast.durations.SHORT,
        });
      });

      // Obtener la imagen inicial
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userImage = userData?.image;
        callback(userImage || '');
      }
    }
  } catch (error) {
    // En caso de error, devolver la URL predeterminada
    callback('https://firebasestorage.googleapis.com/v0/b/cook-smart-app-86b0d.appspot.com/o/defaultImageProfile%2Fdefault.png?alt=media&token=d3f5f345-ac30-4bf2-b33e-1d80a8fee304');
  }
}



async function getCurrentUser(): Promise<User | null> {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data() as User;
        return userData;
      }
      else {
        return null;
      }
    } 
    return null;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
}


async function checkUserName(userName: string) {
  try {
    const users = collection(firestore, 'users');

    const q = query(users, where('userName', '==', userName));
    const result = (await getDocs(q)).size > 0;
    return !result;

  } catch (error) {
    ToastUtil.showToast("Se ha producido un error al verificar el nombre de usuario, por favor, inténtelo de nuevo",
      Toast.durations.LONG);
    return false;
  }
};


async function upadteUserImage(image: string) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);
        updateDoc(userDocRef, {image: image});
        return true;
    } 
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return false;
  }
}

async function uploadImageAsync(uri: string): Promise<boolean> {
  const response = await fetch(uri);
  const blob = await response.blob();
  
  const storageRef = ref(getStorage(), `users/${auth.currentUser?.uid}/`);
  const date = new Date();
  const fileName =  date.getFullYear().toString() + date.getTime().toString();
  const fileRef = ref(storageRef, fileName);

  const uploadTask = uploadBytesResumable(fileRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed', null, reject, async () => {
      try {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await upadteUserImage(imageUrl);

        console.log('Image uploaded correctly and image URL updated.');
        resolve(true); 
      } catch (error) {
        reject(error); 
      }
    });
  });
}


async function checkEmail(email: string): Promise<boolean> {

  try {
    const users = collection(firestore, 'users');
    const q = query(users, where('email', '==', email));
    const result = (await getDocs(q)).size > 0;
    return !result;
  } catch (error) {
    return false;
  }
}

function checkEmailPattern(email:string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

async function logIn(email: string, password: string): Promise<boolean> {
  let result: boolean = false;
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      result = true;
    })
    .catch(() => {
      result = false;
    });

  return result;
}

function checkPassword(password: string): boolean {
  const isValid = password.length >= 6;
  return isValid;
}

async function updateUser(data: any) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);
      updateDoc(userDocRef, data);
      return true;
    } 
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return false;
  }
}


async function assignRecipeToUser(recipeId: string) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      const userDocSnapshot = await getDoc(userDocRef);
      const currentRecipesIds = userDocSnapshot.data()?.recipesIds || [];

      if (!currentRecipesIds.includes(recipeId)) {
        const updatedRecipesIds = [...currentRecipesIds, recipeId];

        await updateDoc(userDocRef, { recipesIds: updatedRecipesIds });

        return true;
      }
      return true;
    }
   
  } catch (error) {
    console.error('Error assigning the recipe to the user:', error);
    return false;
  }
}

async function deleteUserRecipe(recipeId: string) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      const userDocSnapshot = await getDoc(userDocRef);
      const currentRecipesIds = userDocSnapshot.data()?.recipesIds || [];

      if (currentRecipesIds.includes(recipeId)) {
        const updatedRecipesIds = currentRecipesIds.filter((id: string) => id !== recipeId);
        await updateDoc(userDocRef, { recipesIds: updatedRecipesIds });

        return true;
      }
      return false;
    }
   
  } catch (error) {
    console.error('Error deleting the recipe to the user:', error);
    return false;
  }
}

async function getUserNameById(userId:string) {
  
  try {
    const usersCollection = collection(firestore, 'users');
      
    const userDocRef = doc(usersCollection, userId);
    
    const user = (await getDoc(userDocRef)).data() as User;
  
    return user.userName;

  } catch (error) {
    return undefined;
  }

  
}

async function createUser(email: string, password: string, userName: string) {
  try {
    const userId = (await createUserWithEmailAndPassword(auth, email, password)).user.uid
    
    const newUser: User = {
      userName: userName,
      email: email,
      image: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app-86b0d.appspot.com/o/defaultImageProfile%2Fdefault.png?alt=media&token=d3f5f345-ac30-4bf2-b33e-1d80a8fee304',
      recipesIds: [],
      likedRecipes: [],
      assessments: {},
      shoppingList: []
    };
    
    const usersDocRef = doc(collection(firestore, 'users'), userId);
    
    await setDoc(usersDocRef, newUser);

      
    createPantry(userId);
    return true;

  } catch(e: any) {
    console.log(e)

    return false;
  }
}


async function addIngredientsToShoppingList(ingredients: Ingredient[]): Promise<Ingredient[] | false> {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      const userDocSnapshot = await getDoc(userDocRef);
      const currentShoppingList = userDocSnapshot.data()!.shoppingList;

      const uniqueIngredients: Ingredient[] = [...currentShoppingList];
      ingredients.forEach((ingredient) => {
        const alreadyExists = uniqueIngredients.some((item: Ingredient) => item.name.toLowerCase() === ingredient.name.toLowerCase());
        if (!alreadyExists) {
          uniqueIngredients.push(ingredient);
        }
      });
      
      uniqueIngredients.sort((a, b) => a.name.localeCompare(b.name));

      await updateDoc(userDocRef, { shoppingList: uniqueIngredients });

      return uniqueIngredients;
    }
    
    return false;
  } catch (error) {
    console.error('Error adding ingredients to shopping list:', error);
    return false;
  }
}


async function addOrRemoveLikedRecipe(recipeId: string) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      const userDocSnapshot = await getDoc(userDocRef);
      const user = userDocSnapshot.data() as User;

      const recipeIndex = user.likedRecipes.findIndex(id => id === recipeId);

      if (recipeIndex !== -1) {
        user.likedRecipes.splice(recipeIndex, 1);
      } else {
        user.likedRecipes.push(recipeId);
      }

      await updateDoc(userDocRef, { likedRecipes: user.likedRecipes });

      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error adding or removing recipe from liked list:', error);
    return false;
  }
}



async function updateIngredientFromShoppingList(updatedIngredients: Ingredient[]) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      await updateDoc(userDocRef, { shoppingList: updatedIngredients});

      return true;
    }
    return false;

  } catch (error) {
    console.error('Error adding ingredients to shopping list:', error);
    return false;
  }
}







export {
  addIngredientsToShoppingList, addOrRemoveLikedRecipe, assignRecipeToUser, checkEmail, checkEmailPattern, checkPassword, checkUserName, createUser, deleteUserRecipe, getCurrentUser,
  getUserImage, getUserNameById, logIn, updateIngredientFromShoppingList, updateUser, uploadImageAsync
};

