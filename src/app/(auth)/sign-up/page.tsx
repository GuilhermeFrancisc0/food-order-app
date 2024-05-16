'use client'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import TextInput from '@/components/Form/TextInput';
import { signUp } from '@/services/auth';
import { SignUpForm, signUpSchema } from '@/utils/schemas/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = () => {
    const { data: session, status } = useSession();

    const router = useRouter();

    const form = useForm<SignUpForm>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(signUpSchema)
    });

    const formSubmithandler = async (values: SignUpForm) => await signUp(values);

    useEffect(() => {
        if (session?.user?.role) {
            router.replace(`/${session.user.role}`)
        }
    }, [session, router])

    return (
        <>
            <h1 className="text-primary text-4xl mb-5 text-center">Sign Up</h1>

            <FormProvider {...form}>
                <TextInput
                    containerClass='mb-4'
                    type='email'
                    name='email'
                    placeholder='Email'
                />
                <TextInput
                    containerClass='mb-4'
                    type='password'
                    name='password'
                    placeholder='Senha'
                />
                <TextInput
                    containerClass='mb-4'
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirmar senha'
                />
            </FormProvider>

            <button
                className="btn btn-primary mb-4"
                onClick={form.handleSubmit(formSubmithandler)}
                disabled={status === 'loading'}
            >
                Sign Up
                {status === 'loading' && <span className="loading loading-spinner loading-sm"></span>}
            </button>

            <span className='text-primary select-none text-center'>
                Voltar para o
                <Link className="link ml-1 font-bold" href='/sign-in'>
                    Sign In
                </Link>
            </span>
        </>
    );
};

export default SignUp;