import {useState, createContext} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

const [login, setLogin] = useState(false);

return(
    <AuthContext.Provider value={[login, setLogin]}>
        {children}
    </AuthContext.Provider>
)

}