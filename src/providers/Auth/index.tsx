"use client"

import { NextPageContext } from 'next';
import { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import React from 'react';

type Props = {
    children: React.ReactNode;
    session?: Session;
}

const AuthProvider = ({ children, session }: Props) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

AuthProvider.getInitialProps = async (ctx: NextPageContext) => {
    const session = await getSession(ctx);

    return { session };
};

export default AuthProvider;
