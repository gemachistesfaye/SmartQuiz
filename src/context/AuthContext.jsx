import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  reload
} from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebase';
import { initEmailJS, sendVerificationEmail, sendPasswordResetEmail as sendResetEmailViaEmailJS } from '../services/email';
import { doc, getDoc, setDoc, query, collection, where, limit, getDocs, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initEmailJS();
  }, []);

  const fetchUserData = useCallback(async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }, []);

  const checkUsernameUnique = useCallback(async (username, excludeUid = null) => {
    const trimmed = username.trim().toLowerCase();
    const q = query(
      collection(db, 'users'),
      where('username', '==', trimmed),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return true;
    if (excludeUid && snapshot.docs[0].id === excludeUid) return true;
    return false;
  }, []);

  const register = useCallback(async (email, password, fullName, username) => {
    const isUnique = await checkUsernameUnique(username);
    if (!isUnique) {
      throw new Error('auth/username-already-taken');
    }

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await updateProfile(user, { displayName: fullName });

    // Send branded verification email via EmailJS (with real Firebase link)
    try {
      await sendVerificationEmail(email, fullName);
    } catch {
      // Fallback to Firebase default email if EmailJS fails
      await sendEmailVerification(user);
    }

    const userDoc = {
      uid: user.uid,
      fullName: fullName.trim(),
      username: username.trim().toLowerCase(),
      email,
      role: 'student',
      createdAt: serverTimestamp(),
      xp: 0,
      streak: 0,
      achievements: [],
      settings: {
        notifications: true,
        emailUpdates: false,
        darkMode: true,
        soundEffects: true,
        difficulty: 'all',
      },
      emailVerified: false,
    };

    await setDoc(doc(db, 'users', user.uid), userDoc);
    setUserData(userDoc);
    return res;
  }, [checkUsernameUnique]);

  const login = useCallback(async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await fetchUserData(res.user.uid);
    const docData = userDoc || { role: 'student' };
    setUserData(docData);

    await reload(res.user);

    return { ...res, userDoc: docData };
  }, [fetchUserData]);

  const loginWithGoogle = useCallback(async () => {
    const res = await signInWithPopup(auth, googleProvider);
    const docRef = doc(db, 'users', res.user.uid);
    const docSnap = await getDoc(docRef);
    let userDoc;

    if (docSnap.exists()) {
      userDoc = docSnap.data();
    } else {
      let baseUsername = res.user.email.split('@')[0];
      let username = baseUsername;
      let counter = 1;

      while (!(await checkUsernameUnique(username, res.user.uid))) {
        username = `${baseUsername}${counter}`;
        counter++;
      }

      userDoc = {
        uid: res.user.uid,
        fullName: res.user.displayName || 'User',
        username: username.toLowerCase(),
        email: res.user.email,
        role: 'student',
        createdAt: serverTimestamp(),
        xp: 0,
        streak: 0,
        achievements: [],
        settings: {
          notifications: true,
          emailUpdates: false,
          darkMode: true,
          soundEffects: true,
          difficulty: 'all',
        },
        emailVerified: res.user.emailVerified || false,
      };
      await setDoc(docRef, userDoc);
    }

    setUserData(userDoc);
    return { ...res, userDoc };
  }, [checkUsernameUnique]);

  const logout = useCallback(async () => {
    setUserData(null);
    return signOut(auth);
  }, []);

  const resetPassword = useCallback(async (email) => {
    // Send branded password reset email via EmailJS (with real Firebase link)
    try {
      await sendResetEmailViaEmailJS(email, 'SmartQuiz User');
    } catch {
      // Fallback to Firebase default email if EmailJS fails
      await sendPasswordResetEmail(auth, email);
    }
  }, []);

  const verifyEmail = useCallback(async () => {
    if (currentUser) {
      // Send branded verification email via EmailJS (with real Firebase link)
      try {
        await sendVerificationEmail(currentUser.email, currentUser.displayName || 'Learner');
      } catch {
        // Fallback to Firebase default email if EmailJS fails
        await sendEmailVerification(currentUser);
      }
    }
  }, [currentUser]);

  const refreshUserData = useCallback(async () => {
    if (currentUser) {
      const data = await fetchUserData(currentUser.uid);
      if (data) setUserData(data);
      await reload(currentUser);
    }
  }, [currentUser, fetchUserData]);

  const setupRecaptcha = useCallback((containerId) => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
    } catch {
      // Ignore cleanup errors
    }
    }

    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
    });

    window.recaptchaVerifier = recaptchaVerifier;
    return recaptchaVerifier;
  }, []);

  const signInWithPhone = useCallback((phoneNumber, recaptchaVerifier) => {
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const data = await fetchUserData(user.uid);
        setUserData(data || { role: 'student' });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [fetchUserData]);

  const value = {
    currentUser,
    userData,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    verifyEmail,
    refreshUserData,
    setupRecaptcha,
    signInWithPhone,
    checkUsernameUnique,
    isAdmin: userData?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
