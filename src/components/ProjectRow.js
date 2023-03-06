import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserDataProvider';

function ProjectRow({project,index}) {

    const [user,setUser,API,projects,setProjects] = useContext(UserContext)
    const [statusClass,setStatusClass] = useState('')
    const [newStatus,setNewStatus] = useState(`${project?.status}`)
    const [members,setMembers] = useState([])
    const navigate = useNavigate()

    console.log(user.id)
    useEffect(()=>{

        fetch(`${API}/project/${project?.id}/members`)
        .then(resp=>resp.json())
        .then(data=>{
            console.log(data)
            setMembers(data)
        })


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

    console.log(members)
    function updateProject(){
        if(user.id!=project.project_owner_id){
            window.alert('Only Project owners can update projects')
        }
        else{
            navigate(`/update-project-form/${project.id}`)
        }
    }

    function changeStatus(e){
        setNewStatus((newStatus)=>newStatus=e.target.value)
        fetch(`${API}/projects/update/${project.id}`,{
            method:'PUT',
            body:JSON.stringify({status:e.target.value})
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.message=='SUCCESS'){
                const updatedProjects = projects?.map((item) => {
                    if (item.id == project.id) {
                      return {
                        ...item,
                        status:e.target.value
                      };
                    } else {
                      return item;
                    }
                });
                setProjects(updatedProjects)
                console.log(projects)
                window.alert("Status Updated")
            }
            else{
                window.alert("Error occured trying to update status")

            }
        })
    }

    function deleteProject(){
        fetch(`${API}//projects/destroy/${project.id}`,{
            method:'DELETE'
        })
        .then(resp=>resp.json())
        .then(data=>{
            // console.log(data)
            if(data.message=='SUCCESS'){
                const newProjects = projects?.filter((item) => item.id !== project.id);
                setProjects(newProjects)
            }
            else{
                window.alert("Error occured trying to delete project")
            }
        })
    }

    const memberList = members.map((member,i,members)=>{
        return i+1==members.length?<a href='#' key={`memberlist-last-${index}`}>{member.username}</a>:<a href='#' key={`memberlist-${index}`}>{`${member.username}, `}</a>
    })

    return (
        <tr>
          <th scope="row">{index}</th>
          <td>{project.title}</td>
          <td>{project.description}</td>
          <td className={members.length>0?null:'text-danger'}>{members.length>0?memberList:'No Members'}</td>
          <td>{project.created_at}</td>
          <td>
            <span className={statusClass}>
                {/* <div className='dropdown'>
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu">
                        <li><a className="dropdown-item" href="#">ONGOING</a></li>
                        <li><a className="dropdown-item" href="#">CANCELLED</a></li>
                        <li><a className="dropdown-item" href="#">COMPLETED</a></li>
                    </ul>
                </div> */}
                <select onChange={(e)=>{
                    setNewStatus(e.target.value)
                    changeStatus(e)
                }}
                value={newStatus}
                className={`${statusClass} border-0`}
                name="status" id="status-dropdown">
                    <option value="CREATED" >CREATED</option>
                    <option value="ONGOING" >ONGOING</option>
                    <option value="CANCELLED" >CANCELLED</option>
                    <option value="COMPLETED" >COMPLETED</option>
                </select>
              {/* {project.status} */}
            </span>
          </td>
          <td>
            <button
            onClick={updateProject}
            className='btn btn-warning btn-sm' >Update</button>
          </td>
          <td>
            <button
            onClick={()=>{
                if(user.id!==project.project_owner_id){
                    window.alert('Only Project owners can update projects')
                }
                else{
                    if(window.confirm('Are you sure you wish to delete this project?')){
                        deleteProject()
                    }
                }
            }}
            className='btn btn-danger btn-sm' >Delete</button>
          </td>
        </tr>
    );
}

export default ProjectRow;