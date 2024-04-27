'use client'

import {
  createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged,
  signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

import { createUser, getUserByid } from '@/services/users';

import { auth } from '../../firebase/config';
import { useRouter } from 'next/navigation';

export type UserData = {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string;
  role: 'client' | 'admin';
}

type AuthContextType = {
  user: UserData | null;
  googleSignIn: () => Promise<UserCredential | undefined>;
  signIn: (email: string, password: string) => Promise<UserCredential | undefined>;
  signUp: (email: string, password: string) => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const user = await signInWithPopup(auth, provider);

      return user;
    } catch (e) {
      console.error(e);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);

      router.push('sign-in');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);

      if (currentUser) {
        const userFound = await getUserByid(currentUser.uid);

        if (userFound) {
          setUser(userFound);

          router.push(userFound.role);
        } else {
          const userCreated = await createUser(currentUser);

          setUser(userCreated);

          router.push(userCreated.role);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);