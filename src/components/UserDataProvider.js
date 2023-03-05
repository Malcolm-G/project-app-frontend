import React, { createContext, useState } from "react"

// create the context object
const UserContext = createContext()

// create the context provider (component)
function UserDataProvider({ children }) {
    const [user, setUser] = useState(null)
    
    const value = [user, setUser]
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// export
export { UserContext, UserDataProvider }