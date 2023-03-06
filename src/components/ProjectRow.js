import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserDataProvider';

function ProjectRow({project,index}) {

    const [user,setUser,API,projects] = useContext(UserContext)
    const [statusClass,setStatusClass] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        switch(project.status){
            case 'CREATED':
                setStatusClass("badge bg-info")
            break;
            case 'ONGOING':
                setStatusClass("badge bg-success") 
            break;
            case 'CANCELLED':
                setStatusClass("badge bg-primary")
            break;
            case 'COMPLETED':
                setStatusClass("badge bg-warning")
            break;
            default:
                setStatusClass("badge bg-dark")
        }
    },[projects])

    function updateProject(){
        navigate(`/update-project-form/${project.id}`)
    }

    return (
        <tr>
          <th scope="row">{index}</th>
          <td>{project.title}</td>
          <td>{project.description}</td>
          <td>{project.created_at}</td>
          <td>
            <span className={statusClass}>
              {project.status}
            </span>
          </td>
          <td>
            <button
            onClick={updateProject}
            className='btn btn-warning btn-sm' >Update</button>
          </td>
          <td>
            <button className='btn btn-danger btn-sm' >Delete</button>
          </td>
        </tr>
    );
}

export default ProjectRow;