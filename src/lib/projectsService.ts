import { Project, projects as initialProjects } from './data';

const PROJECTS_COLLECTION = 'portfolio_projects';

// Subscribe to portfolio projects in real-time asynchronously without blocking initial page paint
export function subscribeToPortfolioProjects(callback: (projects: Project[]) => void) {
  let unsub: (() => void) | null = null;
  let active = true;

  // Render initial hardcoded projects instantly first
  callback(initialProjects);

  // Defer loading Firebase asynchronously
  Promise.all([
    import('./firebase'),
    import('firebase/firestore')
  ]).then(([{ db }, { collection, onSnapshot }]) => {
    if (!active) return;
    try {
      const colRef = collection(db, PROJECTS_COLLECTION);
      unsub = onSnapshot(
        colRef,
        (snapshot) => {
          if (!active) return;
          if (!snapshot.empty) {
            const liveProjects = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...(docSnap.data() as Omit<Project, 'id'>)
            }));
            callback(liveProjects);
          }
        },
        (err) => {
          console.warn("Portfolio projects listener note:", err);
        }
      );
    } catch (err) {
      console.warn("Failed to subscribe to portfolio projects:", err);
    }
  }).catch((err) => {
    console.warn("Firebase lazy load note:", err);
  });

  return () => {
    active = false;
    if (unsub) unsub();
  };
}

// Add new portfolio project (used in Admin)
export async function addPortfolioProjectToFirestore(project: Omit<Project, 'id'>): Promise<string> {
  const { db } = await import('./firebase');
  const { collection, addDoc } = await import('firebase/firestore');
  const colRef = collection(db, PROJECTS_COLLECTION);
  const docRef = await addDoc(colRef, {
    ...project,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

// Update existing portfolio project (used in Admin)
export async function updatePortfolioProjectInFirestore(id: string, updates: Partial<Project>): Promise<void> {
  const { db } = await import('./firebase');
  const { doc, updateDoc } = await import('firebase/firestore');
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, updates);
}

// Delete portfolio project (used in Admin)
export async function deletePortfolioProjectFromFirestore(id: string): Promise<void> {
  const { db } = await import('./firebase');
  const { doc, deleteDoc } = await import('firebase/firestore');
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
}

// 1-Click seed initial portfolio projects (used in Admin)
export async function seedInitialPortfolioProjects(): Promise<number> {
  const { db } = await import('./firebase');
  const { collection, getDocs, addDoc } = await import('firebase/firestore');
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
