import React from 'react';

function MyProjects(props) {
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

export default MyProjects;