import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, firestore } from "../firebaseConfig";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-root-toast";
import LanguageContext from "../context/LanguageProvider";
import User from "../model/User";
import ToastUtil from "../utils/ToastUtil";
import { createPantry } from "./FirebasePantry";

let unsubscribeImageSnapshot: (() => void) | null = null;
const Strings = LanguageContext;

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
    callback('https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/usersImageProfile%2Fdefault.png?alt=media&token=71b49402-5589-4501-88bd-2cc7c56911c0');
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

async function uploadImageAsync(uri: string) {
  
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const storageRef = ref(getStorage(), `users/${auth.currentUser?.uid}/`);
  const date = new Date();
  const fileName = `users/${auth.currentUser?.uid}/` + date.getFullYear() + date.getTime();
  const fileRef = ref(storageRef, fileName);
  const result = await uploadBytes(fileRef, blob);

  const imageUrl: string = await getDownloadURL(fileRef);
  return await upadteUserImage(imageUrl);
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
  const isValid = password!!.length >= 6;
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
      image: 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/usersImageProfile%2Fdefault.png?alt=media&token=71b49402-5589-4501-88bd-2cc7c56911c0',
      recipesIds: [],
      likedRecipes: [],
      assessments: {}
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


async function addIngredientsToShoppingList(ingredients: string[]) {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);

      const userDocSnapshot = await getDoc(userDocRef);
      const currentShoppingList = userDocSnapshot.data()?.shoppingList || [];

      const uniqueIngredients = Array.from(new Set([...currentShoppingList, ...ingredients])).sort();

      await updateDoc(userDocRef, { shoppingList: uniqueIngredients });

      return true;
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








export { assignRecipeToUser, checkEmail, checkEmailPattern, checkPassword, checkUserName, createUser, deleteUserRecipe, getCurrentUser, 
  getUserImage, getUserNameById, logIn, updateUser, uploadImageAsync, addIngredientsToShoppingList, addOrRemoveLikedRecipe };
