"use client";

import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { UserAuth } from "@/context/Auth";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const { user } = UserAuth();

        const pathname = usePathname();

        useEffect(() => {
            if (!user) {
                return redirect("/sign-in");
            }
        }, []);

        if (!user || !pathname.includes(user.role)) {
            return null;
        }

        return <Component {...props} />;
    };
}