"use client"

import { signInWithCustomToken } from 'firebase/auth';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

import { auth } from '@/firebase/config';

type Props = {
    children: React.ReactNode;
}

const syncFirebaseAuth = async (session: Session) => {
    if (session && session.firebaseToken) {
        try {
            await signInWithCustomToken(auth, session.firebaseToken);
        } catch (e) {
            console.error("Error signin in with custom token:", e);
        }
    } else {
        auth.signOut();
    }
}

const FirebaseAuthProvider: React.FC<Props> = ({ children }) => {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;

        syncFirebaseAuth(session);
    }, [session])

    return <>{children}</>
}

export default FirebaseAuthProvider;
