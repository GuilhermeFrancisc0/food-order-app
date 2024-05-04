import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { adminAuth, adminFirestore } from '@/firebase/admin-config';
import { auth } from '@/firebase/config';
import { FirestoreAdapter } from '@auth/firebase-adapter';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { type: "email" },
                password: { type: "password" }
            },
            async authorize(credentials) {
                const userCredential = await signInWithEmailAndPassword(auth, credentials?.email!, credentials?.password!)

                if (userCredential) {
                    return {
                        id: userCredential.user.uid,
                        email: userCredential.user.email,
                        name: userCredential.user.displayName,
                        image: userCredential.user.photoURL,
                        role: 'admin'
                    };
                }

                return null;
            }
        })
    ],
    callbacks: {
        jwt: async ({ user, token }) => {
            if (user) {
                token.sub = user.id;
                token.role = user.role || 'client';
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (session?.user && token) {
                session.user.id = token.sub;
                session.user.role = token.role;
                session.firebaseToken = await adminAuth.createCustomToken(token.sub!);
            }

            return session;
        },
    },
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/sign-in",
    },
    adapter: FirestoreAdapter(adminFirestore) as Adapter,
}

