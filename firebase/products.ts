import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  setDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from './config';
import { Product } from '../types';

const PRODUCTS_COLLECTION = 'products';

// Get all products from Firestore
export async function getProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('id'));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Return empty array if no products in DB
      return [];
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.data().id,
      name: doc.data().name,
      category: doc.data().category,
      price: doc.data().price,
      description: doc.data().description,
      image: doc.data().image,
      stock: doc.data().stock,
      wholesalePrices: doc.data().wholesalePrices
    })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

// Update a product in Firestore
export async function updateProduct(productId: number, updates: Partial<Product>): Promise<boolean> {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    let docId = '';
    querySnapshot.forEach(doc => {
      if (doc.data().id === productId) {
        docId = doc.id;
      }
    });
    
    if (!docId) {
      console.error('Product not found:', productId);
      return false;
    }
    
    const productRef = doc(db, PRODUCTS_COLLECTION, docId);
    await updateDoc(productRef, updates);
    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
}

// Initialize products in Firestore (run once to sync data.ts with DB)
export async function initializeProducts(products: Product[]): Promise<void> {
  try {
    for (const product of products) {
      const docRef = doc(db, PRODUCTS_COLLECTION, `product_${product.id}`);
      await setDoc(docRef, {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock,
        wholesalePrices: product.wholesalePrices
      });
    }
    console.log('Products initialized successfully');
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}
