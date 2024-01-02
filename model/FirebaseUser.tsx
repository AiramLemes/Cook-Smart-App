import { User } from "firebase/auth";
import { auth, firestore } from "./../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

async function getUserImage() {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userImage = userData?.imageURL;
        return userImage;
      }
    } 

  } catch (error) {
    // return default image
    return 'https://firebasestorage.googleapis.com/v0/b/cook-smart-app.appspot.com/o/usersImageProfile%2Fdefault.png?alt=media&token=71b49402-5589-4501-88bd-2cc7c56911c0';
  }
}

let userData: User | null = null;

async function fetchUserData() {
  try {
    const uid = auth.currentUser?.uid;

    if (uid) {
      const userDocRef = doc(firestore, 'users', uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        userData = userDocSnapshot.data() as User;
      }
    } 
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
  }
}

// Llamas a esta función cuando sea necesario cargar o recargar los datos del usuario
async function loadUserData() {
  await fetchUserData();
}

// Accedes directamente a los datos del usuario
function getUserData(): User | null {
  return userData;
}

export { loadUserData, getUserData, getUserImage };
