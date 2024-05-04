"use client"

import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image'

const Navbar: React.FC = () => {
    const { data: session } = useSession();

    return (
        <div className="navbar bg-primary text-neutral-content">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Pedidos de Comida</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {session?.user.image ?
                                <Image alt="user logo" src={session?.user.image} width={32} height={32}/>
                                :
                                (
                                    <div className="h-full flex items-center justify-center bg-neutral text-neutral-content ">
                                        {session?.user.email.charAt(0)}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        <li><a onClick={() => signOut()}>Sign Out</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
