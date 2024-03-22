'use client'
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

import TextInput from '@/components/Form/TextInput';
import { SignUpForm, signUpSchema } from '@/utils/schemas/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = () => {
    const form = useForm<SignUpForm>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(signUpSchema)
    });

    const formSubmithandler = (values: any) => {
        console.log({ values })
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url('/bg.jpg')` }}
        >
            <div className="card bg-white p-10 shadow-xl w-96">
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
                >
                    Sign Up
                </button>

                <span className='text-primary select-none text-center'>
                    Voltar para o
                    <Link className="link ml-1 font-bold" href='/sign-in'>
                        Sign-In
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default SignUp;