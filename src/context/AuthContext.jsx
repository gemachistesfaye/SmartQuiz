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
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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
    let userDoc;
    if (docSnap.exists()) {
      userDoc = docSnap.data();
      setUserData(userDoc);
    } else {
      // Create new user doc if it doesn't exist (Google first time)
      userDoc = {
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
    return { ...res, userDoc };
  }

  function logout() {
    return signOut(auth);
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
    isAdmin: userData?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
