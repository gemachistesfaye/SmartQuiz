import { db } from '../services/firebase';
import { collection, addDoc, doc, query, orderBy, onSnapshot, where, getDocs, writeBatch } from 'firebase/firestore';

export async function addBookmark(userId, bookmark) {
  try {
    const q = query(
      collection(db, 'users', userId, 'bookmarks'),
      where('type', '==', bookmark.type),
      where('title', '==', bookmark.title)
    );
    const existing = await getDocs(q);
    if (!existing.empty) return false;

    await addDoc(collection(db, 'users', userId, 'bookmarks'), {
      ...bookmark,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
}

export async function removeBookmark(userId, type, title) {
  try {
    const q = query(
      collection(db, 'users', userId, 'bookmarks'),
      where('type', '==', type),
      where('title', '==', title)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    // Use batch write for atomic deletion of all matching bookmarks
    const batch = writeBatch(db);
    snapshot.docs.forEach((d) => {
      batch.delete(doc(db, 'users', userId, 'bookmarks', d.id));
    });
    await batch.commit();
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
}

export function subscribeToBookmarks(userId, callback) {
  const q = query(
    collection(db, 'users', userId, 'bookmarks'),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (error) => {
      console.error('Bookmark subscription error:', error);
      callback([]);
    }
  );
}
