import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = (email) => {
        setUser({ email }) //passando como objeto para pegar mais dados no futuro, caso preciso. Ex: setUser({email, name: "João",role:"admin"})
    }

    const logout = () => {
        setUser(null)
    }

    return (
        //escopo do contexto
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = () => useContext(AuthContext)