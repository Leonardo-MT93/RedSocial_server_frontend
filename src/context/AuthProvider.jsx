//CREAMOS UN CONTEXTO PARA PODER IDENTIFICAR AL USUARIO CONSTANTEMENTE EN UN VARIABLE GLOBAL PREVIO AL CHEQUEO DE SU TOKEN Y USUARIO EN EL BACKEND
import React, { useState, useEffect, createContext } from 'react';
import { Global } from '../helpers/Global';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);

    //Cada vez que cargo el componente (useEffect) voy a actualizar el componente
    useEffect(() => {
        authUser();
    }, []);

    const authUser = async() => {
        //Sacar datos del usuario identificado del localStorage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        //Comprobar si tengo el token y el user
        if(!token || !user){
            setLoading(false);
            return false;
        }
        //Transformar los datos a un objeto javascript
        const userObj = JSON.parse(user);
        const userId = userObj.id;
        //Peticion ajax al backend que compruebe el token y que me devuelva todos los datos del suuario
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-type" : "application/json",
                "Authorization": token
            }
        });

        const data = await request.json();

        //Peticion para los contadores
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                "Content-type" : "application/json",
                "Authorization": token
            }
        });

        const dataCounters = await requestCounters.json();


        //Setear el estado auth

        setAuth(data.user);
        setCounters(dataCounters);
        setLoading(false);
    }
  return (
    <AuthContext.Provider value={{auth, setAuth, counters, loading, setCounters}}>{children}</AuthContext.Provider>
  )
}

export default AuthContext;

