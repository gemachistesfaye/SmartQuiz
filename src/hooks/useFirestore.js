import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot, startAfter, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

/**
 * Shared hook for quiz history - reduces duplicate listeners across components.
 * All components that need quiz history should use this hook instead of creating their own listeners.
 */
export function useQuizHistory(maxLimit = 50) {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setHistory([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', currentUser.uid, 'quizHistory'),
      orderBy('createdAt', 'desc'),
      limit(maxLimit)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          // Convert Firestore Timestamp to Date if needed
          createdAt: d.data().createdAt?.toDate?.() || d.data().createdAt,
        }));
        setHistory(data);
        setLoading(false);
      },
      (error) => {
        console.error('Quiz history subscription error:', error);
        setHistory([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, maxLimit]);

  return { history, loading };
}

/**
 * Hook for user stats (derived from quiz history)
 */
export function useUserStats() {
  const { history, loading } = useQuizHistory(50);

  const stats = {
    totalQuizzes: history.length,
    avgScore:
      history.length > 0
        ? Math.round(history.reduce((s, h) => s + (h.percentage || 0), 0) / history.length)
        : 0,
    categoryBreakdown: history.reduce((acc, h) => {
      const cat = h.category || 'General';
      if (!acc[cat]) acc[cat] = { total: 0, correct: 0 };
      acc[cat].total += h.total || 0;
      acc[cat].correct += h.score || 0;
      return acc;
    }, {}),
    chartData: [...history]
      .reverse()
      .slice(-14)
      .map((h, i) => ({
        name: `Quiz ${i + 1}`,
        score: h.percentage || 0,
        xp: h.xp || 0,
      })),
    recentQuizzes: history.slice(0, 5),
  };

  return { stats, loading };
}

/**
 * Paginated query hook for Firestore collections
 */
export function usePaginatedCollection(collectionPath, orderByField = 'createdAt', pageSize = 20) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchInitial = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, ...collectionPath),
        orderBy(orderByField, 'desc'),
        limit(pageSize)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDocs(data);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === pageSize);
    } catch (error) {
      console.error('Error fetching collection:', error);
    } finally {
      setLoading(false);
    }
  }, [collectionPath, orderByField, pageSize]);

  const fetchMore = useCallback(async () => {
    if (!lastDoc || !hasMore) return;
    try {
      const q = query(
        collection(db, ...collectionPath),
        orderBy(orderByField, 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setDocs((prev) => [...prev, ...data]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === pageSize);
    } catch (error) {
      console.error('Error fetching more:', error);
    }
  }, [collectionPath, orderByField, pageSize, lastDoc, hasMore]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  return { docs, loading, hasMore, fetchMore, refresh: fetchInitial };
}

/**
 * Hook for real-time count of a collection
 */
export function useCollectionCount(collectionPath) {
  const [countValue, setCountValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use onSnapshot on the collection with a limit to get count
    // This is more efficient than loading all docs
    const q = query(collection(db, ...collectionPath), limit(10000));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setCountValue(snapshot.size);
        setLoading(false);
      },
      (error) => {
        console.error('Count subscription error:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionPath]);

  return { count: countValue, loading };
}
