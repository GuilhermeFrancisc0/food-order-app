import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, signOut as authSignOut } from 'next-auth/react';

import { auth } from '@/firebase/config';
import { asyncToast } from '@/utils/asyncToast';
import { SignInForm } from '@/utils/schemas/sign-in';
import { SignUpForm } from '@/utils/schemas/sign-up';

export const signUp = async (values: SignUpForm) => {
    const fn = async () => {
        await createUserWithEmailAndPassword(auth, values.email, values.password);

        await signIn('credentials', { redirect: false, ...values });
    };

    await asyncToast(fn, 'Criando usuário', 'Usuário criado com sucesso!').catch((e) => console.error(e));
}

export const signInWithCredentials = async (values: SignInForm) => {
    const fn = async () => {
        const res = await signIn('credentials', { redirect: false, ...values });

        if (!res?.ok)
            throw new Error(res?.error!);
    };

    await asyncToast(fn, 'Verificando credenciais', 'Usuário autenticado com sucesso!').catch((e) => console.error(e));
}

export const signInWithGoogle = async () => {
    const fn = async () => await signIn('google', { redirect: false });

    await asyncToast(fn, 'Redirecionando', '').catch((e) => console.error(e));;
}

export const signOut = async () => {
    const fn = async () => await authSignOut();

    await asyncToast(fn, 'Realizando a desconexão', 'Usuário desconectado com sucesso!').catch((e) => console.error(e));
}