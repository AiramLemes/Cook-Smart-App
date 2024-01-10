import { firestore } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import Product from "../model/Product";


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

async function getBetterProducts(name: string, rate: number): Promise<Array<Product>> {
  try {
    const productsQuery = query(
      collection(firestore, 'products'),
      where('name', '==', name),
      where('rate', '>', rate),
      orderBy('rate', 'desc'),
      limit(3)
    )

    const productsSnapshot = await getDocs(productsQuery);

    const products: Product[] = [];
    
    productsSnapshot.forEach((doc) => {
      const productData = doc.data() as Product;
      products.push(productData);
    });

    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
}

export { getProduct, getBetterProducts };
