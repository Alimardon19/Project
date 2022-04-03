import React, { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, useAuth } from "../../../config/config";
import {toast} from "react-toastify";
import {GetUsers} from "../../../reducer/getUser/getUserReducer";

function Login() {
    const Email = useRef();
    const Pass = useRef();
    const current = useAuth();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(()=> {
        dispatch(GetUsers());
    }, [])

    function signIn() {
        navigate('/signIn');
    }

    async function Submit() {
        try {
            await login(Email.current.value, Pass.current.value);
        } catch {
            toast.error("Email yoki parol xato")
        }
    }

    useEffect(()=> {
        if (current) {
            if (current.email === "alimardon009@gmail.com") {
                navigate('/admin')
            }else {
                navigate('/cabinet')
            }
        }
    }, [current])

    return (
        <div className={'login'}>
            <div className="forms">
            <h3> Saytga kitish </h3>
                <input ref={Email} type="text" placeholder={'email'}/>
                <input ref={Pass} type="text" placeholder={'parol'}/>
                <button onClick={signIn}> Ro'yhatdan o'tish </button>
                <button onClick={Submit}> Kirish </button>
            </div>
        </div>
    );
}


export default Login;