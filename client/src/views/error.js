import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return(
        <div className="d-flex flex-column justify-content-center pt-4 mt-4">
            <div className="container pt-4">
                <div className="d-flex flex-md-row flex-column align-items-center justify-content-center">
                    <div className="error-404-text text-center">
                        404
                    </div>
                    <div style={{width: '30px', height: 0}}></div>
                    <div>
                        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                            <span className="fa fa-exclamation-triangle error-icon"></span>
                            <div className="error-text">Oops! Page not found.</div>
                        </div>
                        <div className="error-description">
                            The page you are looking for was not found.<br />
                            You may return to the <Link exact to="/" className="generic-link">Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;