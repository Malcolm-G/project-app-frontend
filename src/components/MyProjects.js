import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectRow from './ProjectRow';
import { UserContext } from './UserDataProvider';

function MyProjects(props) {

    const [user,setUser,API,projects] = useContext(UserContext)

    const projectList = projects?.map((project,index)=>{
        return(
            <ProjectRow
            key={`projectList`+project.id}
            index={index+1}
            project={project}
            />
        )
    })



    if(projects){
        return(
            <div>
                <div className='container'>
                    <Link to='/project-form' className='mx-auto'>Add New Project</Link>
                </div>
                <h2>Here are some of your projects</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Members</th>
                            <th scope="col">Created</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectList}
                    </tbody>
                </table>
            </div>
        )
    }
    else{
        return (
            <div>
                <div className="row justify-content-center mt-5">
                    <div className="card col-lg-4 col-sm-12 col-md-6">
                        <img src="https://img.icons8.com/color/96/null/nothing-found.png"
                            className="card-img-top" alt="nothing" style={{objectFit: "inherit"}}/>
                        <div className="card-body">
                            <p className="card-text">You have no projects created yet!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyProjects;