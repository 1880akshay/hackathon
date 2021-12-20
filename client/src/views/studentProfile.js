import React from "react";

const StudentProfile = ({ logout }) => {

    return (
        <>
            <div>Protected Data</div>
            <br />
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default StudentProfile;
