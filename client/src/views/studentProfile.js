import React from "react";

const StudentProfile = ({ logout }) => {

    return (
        <>
            <div>Private Data</div>
            <br />
            <button onClick={logout}>Logout</button>
        </>
    );
}

// hello world

export default StudentProfile;
