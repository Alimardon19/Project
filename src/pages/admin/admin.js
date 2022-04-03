import React from 'react';
import { useNavigate } from 'react-router-dom';
import {logout} from "../../config/config";

function Admin() {
    const navigate = useNavigate();
    async function LogOut() {
        try {
            await logout();
            navigate('/');
        } catch  {
            alert("Error")
        }
    }
    return (
        <div>
            <h2> Admin page </h2>
            <button onClick={LogOut}> Hisobdan chiqish </button>
        </div>
    );
}

export default Admin;