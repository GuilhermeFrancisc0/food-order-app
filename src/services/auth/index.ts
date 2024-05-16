import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signIn, signOut as authSignOut } from 'next-auth/react';
import { toast } from 'react-toastify';

import { auth } from '@/firebase/config';
import { getToastUpdateOptions, toastOptions } from '@/providers/ToastProvider';
import { SignInForm } from '@/utils/schemas/sign-in';
import { SignUpForm } from '@/utils/schemas/sign-up';

export const signUp = async (values: SignUpForm) => {
    const id = toast.loading('Criando usuário');

    try {
        await createUserWithEmailAndPassword(auth, values.email, values.password);

        await signIn('credentials', { redirect: false, ...values });

        toast.update(id, getToastUpdateOptions('Usuário criado com sucesso!', 'success'));
    } catch (e: any | Error) {
        toast.update(id, getToastUpdateOptions(e.message, 'error'));
    }
}

export const signInWithCredentials = async (values: SignInForm) => {
    const id = toast.loading('Verificando credenciais', toastOptions);

    try {
        const res = await signIn('credentials', { redirect: false, ...values });

        if (!res?.ok)
            throw new Error(res?.error!);

        toast.update(id, getToastUpdateOptions('Usuário autenticado com sucesso!', 'success'));
    } catch (e: any | Error) {
        toast.update(id, getToastUpdateOptions(e.message, 'error'));
    }
}

export const signInWithGoogle = async () => {
    const id = toast.loading('Redirecionando');

    try {
       await signIn('google', { redirect: false });
    } catch (e: any | Error) {
        toast.update(id, getToastUpdateOptions(e.message, 'error'));
    }
}

export const signOut = async () => {
    const id = toast.loading('Realizando a desconexão');

    try {
        await authSignOut();

        toast.update(id, getToastUpdateOptions('Usuário desconectado com sucesso!', 'success'));
    } catch (e: any | Error) {
        toast.update(id, getToastUpdateOptions(e.message, 'error'));
    }
}