import React from "react";

const SectionHeading = ({ heading }) => {
    return(
        <div className="section-heading">
            <h3 className="font-weight-600">{heading}</h3>
            <span className="mb-4"></span>
        </div>
    );
}

export default SectionHeading;