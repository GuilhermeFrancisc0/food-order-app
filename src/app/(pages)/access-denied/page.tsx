"use client"

import { LockKeyholeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AccessDenied = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 card bg-base-100 shadow-xl p-4">

                <div className='flex items-center justify-center'>
                    <LockKeyholeIcon size={64}/>
                </div>

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Acesso Negado
                    </h2>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Parece que você não tem permissão para acessar esta página.
                    </p>
                    <p className="text-sm text-gray-500">
                        Faça login com uma conta autorizada para continuar.
                    </p>
                </div>
                <div>
                    <button
                        className="w-full btn btn-primary h-8 min-h-8"
                        onClick={() => router.back()}
                    >
                        Voltar à Página Anterior
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;