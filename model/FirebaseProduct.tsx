import { firestore } from "./../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Product from "./ProductInterface";


async function getProduct(barcode: string): Promise<Product|null> {

  try {
    const productDocRef = doc(firestore, 'products', barcode);
    const productDocSnapshot = await getDoc(productDocRef);
    
    if (productDocSnapshot.exists()) {
      const productData = productDocSnapshot.data() as Product;

      return productData;
    } else {
      return null;
    }
  } catch (error) {
    return null;   
  }
}

export { getProduct };
