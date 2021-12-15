import React from "react";
import ReactTooltip from "react-tooltip";

const EmailValidityTooltip = ({ type }) => {
    return (
        (type === 'error') ?
        <>
            <span className="fa fa-exclamation-circle login-suffix-icon text-danger" data-tip="Invalid institute email id"></span>
            <ReactTooltip effect="solid" type={type} />
        </> : (type === 'success') ?
        <>
            <span className="fa fa-check-circle login-suffix-icon text-success" data-tip="Valid institute email id"></span>
                <ReactTooltip effect="solid" type={type} />
            </> :
        <></>
    );
}

export default EmailValidityTooltip;