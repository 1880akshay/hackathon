import React from "react";

const OfficialProfile = ({ logout }) => {

    return (
        <>
            <div>Official Data</div>
            <br />
            <button onClick={logout}>Logout</button>
        </>
    );
}

export default OfficialProfile;
