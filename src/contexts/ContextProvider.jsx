import {createContext, useContext, useEffect, useState} from "react";

const StateContext = createContext();

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState( localStorage.user ? JSON.parse(localStorage.user) : {});
    const [userToken, _setUserToken] = useState(localStorage.token ? localStorage.token : '' );

    const setUserToken = (token) => {

        if (token) {

            localStorage.setItem('token', token)
        } else {

            localStorage.removeItem('token')
        }
    }

    const setAuthUser = (user) => {
        if (user) {
            setCurrentUser(user)
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            setCurrentUser({})
            //localStorage.removeItem('user')
        }
    }



    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser] )

    useEffect(() => {

        const curentuser = localStorage.getItem("user");
        if (curentuser) {
            setCurrentUser(JSON.parse(curentuser));
        }

    }, [] )

    return(
        <StateContext.Provider
            value={{
                setAuthUser,
                currentUser,
                setCurrentUser,

                userToken,
                setUserToken,

            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
