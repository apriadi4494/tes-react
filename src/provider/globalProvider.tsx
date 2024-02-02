'use client'
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface IGlobal {
    profile: any;
    isLogin: boolean;
    successLogin: any
}

export const GlobalContext = createContext<IGlobal | null>(null)
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { push } = useRouter();

    const [profile, setProfile] = useState(null)
    const [isLogin, setIsLogin] = useState(false)

    const successLogin = (data: any) => {
        localStorage.setItem('profile', JSON.stringify(data));

        setProfile(data)
        setIsLogin(true)

        push('/')
    }

    const checkIsLogin = () => {
        const storageProfile: any = localStorage.getItem('profile');
        const dataProfile = JSON.parse(storageProfile)

        if (dataProfile?.token) {
            successLogin(dataProfile)
        }
    }

    useEffect(() => {
        checkIsLogin()
    }, [])

    const globalState: IGlobal = {
        profile,
        isLogin,
        successLogin,
    }

    return <GlobalContext.Provider value={globalState}>{children}</GlobalContext.Provider>
}