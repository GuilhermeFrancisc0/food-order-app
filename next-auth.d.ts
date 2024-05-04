import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    interface Session {
        firebaseToken?: string;
        expires: ISODateString;
        user?: {
            id?: string;
            role?: 'admin' | 'client';
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }

    interface User {
        role?: 'admin' | 'client';
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: 'admin' | 'client';
    }
}