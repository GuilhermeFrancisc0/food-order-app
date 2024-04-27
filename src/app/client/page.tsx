'use client'

import { UserAuth } from '@/context/Auth';
import isAuth from '@/hoc/Auth';

const Client = () => {
  const { user, logOut } = UserAuth();

  return (
    <div>
      Olá {user?.email} você tem perfil de {user?.role}
      <button
        className="btn btn-primary mb-4"
        onClick={logOut}
      >
        Sign out
      </button>
    </div>
  )
}

export default isAuth(Client);