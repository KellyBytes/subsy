'use client';
import { auth, db } from '@/firebase';
import { subscriptions } from '@/utils';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider(props) {
  const { children } = props;

  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setCurrentUser(null);
    setUserData(null);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function saveToFirebase(data) {
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const res = await setDoc(
        userRef,
        {
          subscriptions: data,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleAddSubscription(newSubscription) {
    // remove this line if you put in a paywall
    if (userData.subscriptions.length > 30) return;
    // modify the local state (global context)
    const newSubscriptions = [...userData.subscriptions, newSubscription];
    setUserData({ subscriptions: newSubscriptions });

    // write the changes to our firebase database (async)
    await saveToFirebase(newSubscriptions);
  }

  async function handleDeleteSubscription(index) {
    // delete the entry at that index
    const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
      return valIndex !== index;
    });
    setUserData({ subscriptions: newSubscriptions });

    await saveToFirebase(newSubscriptions);
  }

  async function handleUpdateSubscription(index, updateData) {
    const newSubscriptions = [...userData.subscriptions];
    newSubscriptions[index] = updateData;
    setUserData({ subscriptions: newSubscriptions });
    await saveToFirebase(newSubscriptions);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setCurrentUser(user);

        if (!user) return;

        // when we found a user, check the database
        setLoading(true);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        console.log('Fetching user data');

        let firebaseData = { subscriptions: [] }; // default data for a new user
        // let firebaseData = { subscriptions };

        if (docSnap.exists()) {
          console.log('Found user data');
          firebaseData = docSnap.data();
        }

        setUserData(firebaseData);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    handleAddSubscription,
    handleDeleteSubscription,
    handleUpdateSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
