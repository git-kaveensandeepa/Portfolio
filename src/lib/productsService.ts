import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';
import { storeProducts, StoreProduct } from './storeData';

const PRODUCTS_COLLECTION = 'products';

// Listen to products in real time
export function subscribeToProducts(callback: (products: StoreProduct[]) => void) {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        callback(storeProducts);
      } else {
        const liveProducts = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<StoreProduct, 'id'>)
        }));
        callback(liveProducts);
      }
    }, (err) => {
      console.warn("Products snapshot error, using static fallback:", err);
      callback(storeProducts);
    });
  } catch (err) {
    console.warn("Failed to subscribe to products:", err);
    callback(storeProducts);
    return () => {};
  }
}

// Add new product
export async function addProductToFirestore(product: Omit<StoreProduct, 'id'>): Promise<string> {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  const docRef = await addDoc(colRef, {
    ...product,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Update existing product
export async function updateProductInFirestore(id: string, updates: Partial<StoreProduct>): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, updates);
}

// Delete product
export async function deleteProductFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// Seed initial products into Firestore in 1 click
export async function seedInitialProducts(): Promise<number> {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  const snapshot = await getDocs(colRef);
  
  if (!snapshot.empty) {
    return snapshot.size;
  }

  let count = 0;
  for (const item of storeProducts) {
    const { id, ...data } = item;
    await addDoc(colRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
    count++;
  }
  return count;
}
