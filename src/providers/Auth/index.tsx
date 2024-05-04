"use client"

import { SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
    children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider;
