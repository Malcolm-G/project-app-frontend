import React, { createContext, useState } from "react"

// create the context object
const UserContext = createContext()
const API = 'http://127.0.0.1:9292'

// create the context provider (component)
function UserDataProvider({ children }) {
    const [user, setUser] = useState(null)
    
    const value = [user, setUser,API]
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// export
export { UserContext, UserDataProvider }