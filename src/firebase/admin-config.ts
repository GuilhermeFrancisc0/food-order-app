import admin, { AppOptions } from 'firebase-admin';

import { initFirestore } from '@auth/firebase-adapter';

// REFERENCE: https://authjs.dev/getting-started/adapters/firebase

const firebaseAdminConfig: AppOptions = {
    credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    })
};

const app = !admin.apps.length ? admin.initializeApp(firebaseAdminConfig) : admin.app();

const adminFirestore = initFirestore(firebaseAdminConfig);

const adminAuth = admin.auth(app);

export { adminFirestore, adminAuth };