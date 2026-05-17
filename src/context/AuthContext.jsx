import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function register(email, password, fullName, username) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await updateProfile(user, { displayName: fullName });

    // Create user document in Firestore
    const userDoc = {
      uid: user.uid,
      fullName,
      username,
      email,
      role: 'student', // Default role
      createdAt: new Date().toISOString(),
      xp: 0,
      streak: 0,
      achievements: []
    };

    await setDoc(doc(db, "users", user.uid), userDoc);
    setUserData(userDoc);
    return res;
  }

  async function login(email, password) {
    // Super Admin Auto-Bypass
    if (email === 'admin@smartquiz.com' && password === 'admin12345') {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);
        
        let userDoc;
        if (docSnap.exists()) {
          userDoc = { ...docSnap.data(), role: 'admin' };
          // Sync back to Firestore if role was different
          if (docSnap.data().role !== 'admin') {
            await setDoc(docRef, userDoc);
          }
        } else {
          userDoc = {
            uid: res.user.uid,
            fullName: 'Master Admin',
            username: 'admin',
            email: email,
            role: 'admin',
            createdAt: new Date().toISOString(),
            xp: 9999,
            streak: 365,
            achievements: ['Master']
          };
          await setDoc(docRef, userDoc);
        }
        setUserData(userDoc);
        return { ...res, userDoc };
      } catch (error) {
        // If account doesn't exist, auto-create it with Admin role
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const userDoc = {
            uid: res.user.uid,
            fullName: 'Master Admin',
            username: 'admin',
            email: email,
            role: 'admin',
            createdAt: new Date().toISOString(),
            xp: 9999,
            streak: 365,
            achievements: ['Master']
          };
          await setDoc(doc(db, "users", res.user.uid), userDoc);
          setUserData(userDoc);
          return { ...res, userDoc };
        }
        throw error;
      }
    }
    const res = await signInWithEmailAndPassword(auth, email, password);
    const docRef = doc(db, "users", res.user.uid);
    const docSnap = await getDoc(docRef);
    let userDoc = docSnap.exists() ? docSnap.data() : { role: 'student' };
    setUserData(userDoc);
    return { ...res, userDoc };
  }

  async function loginWithGoogle() {
    const res = await signInWithPopup(auth, googleProvider);
    const docRef = doc(db, "users", res.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      // Create new user doc if it doesn't exist (Google first time)
      const userDoc = {
        uid: res.user.uid,
        fullName: res.user.displayName,
        username: res.user.email.split('@')[0],
        email: res.user.email,
        role: 'student',
        createdAt: new Date().toISOString(),
        xp: 0,
        streak: 0,
        achievements: []
      };
      await setDoc(docRef, userDoc);
      setUserData(userDoc);
    }
    return { ...res, userDoc: userDoc || docSnap.data() };
  }

  function logout() {
    return signOut(auth);
  }

  async function makeAdmin(password) {
    if (password === 'smartadmin2026') {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, { role: 'admin' });
      return true;
    }
    return false;
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function setupRecaptcha(containerId) {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Error clearing recaptcha:", e);
      }
    }
    
    const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });
    
    window.recaptchaVerifier = recaptchaVerifier;
    return recaptchaVerifier;
  }

  function signInWithPhone(phoneNumber, recaptchaVerifier) {
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setUserData({ role: 'student' }); // Default fallback
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    setupRecaptcha,
    signInWithPhone,
    makeAdmin,
    isAdmin: userData?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
