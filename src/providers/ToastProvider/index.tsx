"use client"

import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer, ToastOptions, UpdateOptions } from 'react-toastify';

type Props = {
    children: React.ReactNode;
}

export const toastOptions: ToastOptions = {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    closeButton: true,
}

export const getToastUpdateOptions = (message: string, type: ToastOptions['type']): UpdateOptions => {
    return {
        ...toastOptions,
        type,
        isLoading: false,
        render: message,
    }
}

const ToastProvider = ({ children }: Props) => {
    return (
        <>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default ToastProvider;
