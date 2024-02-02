'use client';

import axios from "axios";
import { ChangeEventHandler, useContext, useState } from "react";
import { GlobalContext } from "../../provider/globalProvider";

const TextInput = ({ label, id, value, onChange }: { label: string, value: string, id: string, onChange: ChangeEventHandler }) => {
    return (
       <div>
            <p>{label}</p>
            <input value={value} onChange={onChange} type={id === 'password' ? 'password' : 'text'} name={id} className="border mt-2 h-[32px] px-2 rounded-sm w-[356px]"placeholder={label}/>
       </div>
    )
}

const LoginPage = () => {
    const globalCtx = useContext(GlobalContext);
    const [loadingButton, setLoadingButton] = useState(false);
    const [auth, setAuth] = useState({
        email: '',
        password: '',
    });

    const changeInput = (e: any) => {
        setAuth({ ...auth, [e.target.name]: e.target.value })
    }

    const tryToLogin = async () => {
        setLoadingButton(true)
        await axios({
            method: 'post',
            url: 'https://api-interview.blankontech.com/api/auth/login/',
            data: auth,
        }).then((res: any) => {
            globalCtx?.successLogin(res.data);
        }).catch((err) => {
            console.log(err)
        })

        setLoadingButton(false)
    }

    return (
        <div className="h-screen w-full bg-[#B3D0C3] p-40">
            <div className="bg-white rounded-lg shadow-md w-full h-[722px] flex items-center justify-center">
                <div>
                    <div className="flex justify-center">
                        <p className="font-[600] text-[36px]">Sign In</p>
                    </div>
                    <div className="mt-5 flex flex-col gap-y-5">
                        <TextInput label="Email" id="email" value={auth.email} onChange={changeInput}/>
                        <TextInput label="Password" id="password" value={auth.password} onChange={changeInput}/>
                    </div>
                    <div className="mt-5">
                        <button 
                            disabled={loadingButton}
                            type="button" 
                            className="bg-[#007F5F] text-center px-2 py-2 w-full text-white rounded-md duration-500 hover:scale-110"
                            onClick={tryToLogin}
                            >{loadingButton ? 'Loading...' : 'Sign In'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;