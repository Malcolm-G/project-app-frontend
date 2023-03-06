import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserDataProvider';

function ProjectRow({project,index}) {

    const [user,setUser,API,projects,setProjects] = useContext(UserContext)
    const [statusClass,setStatusClass] = useState('')
    const [newStatus,setNewStatus] = useState(`${project?.status}`)
    const [members,setMembers] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{

        fetch(`${API}/project/${project?.id}/members`)
        .then(resp=>resp.json())
        .then(data=>{
            setMembers(data)
        })


        switch(project.status){
            case 'CREATED':
                setStatusClass("badge bg-info")
            break;
            case 'ONGOING':
                setStatusClass("badge bg-warning") 
            break;
            case 'CANCELLED':
                setStatusClass("badge bg-danger")
            break;
            case 'COMPLETED':
                setStatusClass("badge bg-success")
            break;
            default:
                setStatusClass("badge bg-dark")
        }
    },[projects])

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
        // return i+1==members.length?<span href='#' key={`memberlist-last-${i}`} className='badge text-bg-dark'>{member.username}</span>:<span href='#' key={`memberlist-${i}`} className='badge text-bg-dark'>{`${member.username}, `}</span>
        return (
            <span key={`memberlist-${i}`} className='badge text-bg-dark mx-1'>{member.username}</span>
        )
    })

    return (
        <tr className='align-middle'>
          <th scope="row">{index}</th>
          <td>{project.title}</td>
          <td>{project.description}</td>
          <td className={members.length>0?null:'text-danger'}>{members.length>0?memberList:'No Members'}</td>
          <td>{project.created_at}</td>
          <td className=''>
            <select onChange={(e)=>{
                setNewStatus(e.target.value)
                changeStatus(e)
            }}
            value={newStatus}
            className={`${statusClass} border-0 text-dark`}
            name="status" id="status-dropdown">
                <option value="CREATED" >CREATED</option>
                <option value="ONGOING" >ONGOING</option>
                <option value="CANCELLED" >CANCELLED</option>
                <option value="COMPLETED" >COMPLETED</option>
            </select>
            {/* {project.status} */}
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