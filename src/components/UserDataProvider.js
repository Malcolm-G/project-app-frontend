import React, { createContext, useEffect, useState } from "react"

// create the context object
const UserContext = createContext()
// const API = 'http://127.0.0.1:9292'
const API = 'https://malcolm-p3-project-app.onrender.com'

// create the context provider (component)
function UserDataProvider({ children }) {
    const [user, setUser] = useState(null)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
        //   console.log(foundUser)
          setUser(foundUser);
        }
    }, []);

    useEffect(()=>{
        if(user){
            fetch(`${API}/projects/${user.id}`)
            .then(resp=>resp.json())
            .then(data=>{
                // console.log(...data)
                setProjects((projects)=>data.my_projects.concat(data.part_of))
                // console.log(projects)
            })
        }
    },[user])
    // console.log(projects)
    const value = [user, setUser,API,projects,setProjects]
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// export
export { UserContext, UserDataProvider }