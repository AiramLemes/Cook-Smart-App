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

export default getUserImage;
