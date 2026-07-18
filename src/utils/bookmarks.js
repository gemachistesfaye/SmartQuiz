import { db } from '../services/firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, where, getDocs } from 'firebase/firestore';

export async function addBookmark(userId, bookmark) {
  const q = query(
    collection(db, "users", userId, "bookmarks"),
    where("type", "==", bookmark.type),
    where("title", "==", bookmark.title)
  );
  const existing = await getDocs(q);
  if (!existing.empty) return false;

  await addDoc(collection(db, "users", userId, "bookmarks"), {
    ...bookmark,
    createdAt: new Date().toISOString(),
  });
  return true;
}

export async function removeBookmark(userId, type, title) {
  const q = query(
    collection(db, "users", userId, "bookmarks"),
    where("type", "==", type),
    where("title", "==", title)
  );
  const snapshot = await getDocs(q);
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, "users", userId, "bookmarks", d.id));
  }
}

export function subscribeToBookmarks(userId, callback) {
  const q = query(
    collection(db, "users", userId, "bookmarks"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}
