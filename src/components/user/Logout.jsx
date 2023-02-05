import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const Logout = () => {

    const navigate = useNavigate();
    const {setAuth, setCounters} = useAuth();
    useEffect(()=> {
        //Vaciar el localstorage
        localStorage.clear();
        //Setear los estados globales a vacio
        setAuth({});
        setCounters({});
        //Navigate / redirreccion al login
        navigate("/login");
    })
  return (
    <h1>Cerrando sesion...</h1>
  )
}
