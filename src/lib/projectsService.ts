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
import { Project, projects as initialProjects } from './data';

const PROJECTS_COLLECTION = 'portfolio_projects';

// Subscribe to portfolio projects in real-time
export function subscribeToPortfolioProjects(callback: (projects: Project[]) => void) {
  try {
    const colRef = collection(db, PROJECTS_COLLECTION);
    return onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        callback(initialProjects);
      } else {
        const liveProjects = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Project, 'id'>)
        }));
        callback(liveProjects);
      }
    }, (err) => {
      console.warn("Portfolio projects listener note:", err);
      callback(initialProjects);
    });
  } catch (err) {
    console.warn("Failed to subscribe to portfolio projects:", err);
    callback(initialProjects);
    return () => {};
  }
}

// Add new portfolio project
export async function addPortfolioProjectToFirestore(project: Omit<Project, 'id'>): Promise<string> {
  const colRef = collection(db, PROJECTS_COLLECTION);
  const docRef = await addDoc(colRef, {
    ...project,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Update existing portfolio project
export async function updatePortfolioProjectInFirestore(id: string, updates: Partial<Project>): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, updates);
}

// Delete portfolio project
export async function deletePortfolioProjectFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// 1-Click seed initial portfolio projects
export async function seedInitialPortfolioProjects(): Promise<number> {
  const colRef = collection(db, PROJECTS_COLLECTION);
  const snapshot = await getDocs(colRef);
  
  if (!snapshot.empty) {
    return snapshot.size;
  }

  let count = 0;
  for (const item of initialProjects) {
    const { id, ...data } = item;
    await addDoc(colRef, {
      ...data,
      createdAt: new Date().toISOString()
    });
    count++;
  }
  return count;
}
