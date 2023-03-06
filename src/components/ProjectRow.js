import React, { useEffect, useState } from 'react';

function ProjectRow({project,index}) {

    const [statusClass,setStatusClass] = useState('')

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
    },[project.status])

    

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
        </tr>
    );
}

export default ProjectRow;