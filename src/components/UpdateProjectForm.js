import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserDataProvider';

function UpdateProjectForm(props) {
    const params = useParams()
    const [user,setUser,API,projects,setProjects] = useContext(UserContext)

    let projectUpdating = projects?.find(element=>element.id==params.id)
    let text = projectUpdating?.due;
    const myArray = text.split("T");
    let projectDue = myArray[0];
    
    const [title,setTitle] = useState(`${projectUpdating?.title}`)
    const [description,setDescription] = useState(`${projectUpdating?.description}`)
    const [due,setDue] = useState(`${projectDue}`)
    const navigate = useNavigate()

    const input={title:title,description:description,due:due}

    useEffect(()=>{
        projectUpdating = projects?.find(element=>element.id==params.id)
    },[])

    function projectSubmit(e){
        e.preventDefault()
        fetch(`${API}/projects/update/${params.id}`,{
            method:'PUT',
            body:JSON.stringify(input)
        })
        .then(resp=>resp.json())
        .then(data=>{
            if(data.message=='SUCCESS'){
                const updatedProjects = projects?.map((item) => {
                    if (item.id == params.id) {
                      return {
                        item,
                        ...input
                      };
                    } else {
                      return item;
                    }
                });
                setProjects((projects=>updatedProjects))
                console.log(projects)
                window.alert("Project Updated")
                navigate("/my-projects");
            }
            else{
                navigate('/')
            }
        })
    }

    function cancelClicked(){
        navigate("/my-projects");
    }

    return (
        <form onSubmit={(e)=>projectSubmit(e)} style={{border:"1px solid #ccc"}}>
            <div className="container bg-body-tertiary mt-5">
                <h1>Project Details</h1>
                <p>Please fill in this form to update the project.</p>
                <hr/>

                <label htmlFor="title"><b>Title</b></label>
                <input
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                type="text" placeholder='Enter Project Title' name="title" required/>

                <label htmlFor="description"><b>Description</b></label>
                <input
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                type="text" placeholder="Enter Project Description" name="description" required/>

                <label htmlFor="due"><b>Due Date</b></label>
                <input
                onChange={(e)=>setDue(e.target.value)}
                value={due}
                type="date" placeholder="Enter Due Date" name="due" required/>


                <div className="clearfix">
                <button type="submit" className=".log-signupbtn">Update Project</button>
                <button type="button" className=".log-cancelbtn bg-danger" onClick={cancelClicked} >Cancel</button>
                </div>
            </div>
        </form>
    );
}

export default UpdateProjectForm;