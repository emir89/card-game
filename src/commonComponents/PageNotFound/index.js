import React from 'react';
import {Link} from 'react-router-dom';

function PageNotFound() {
    return(
        <div className="CenterWrapperColumn">
            <p>Sorry, this page does not exist.</p>
            <Link to="/">Return to Home Page</Link>
        </div>
    );
}

export default PageNotFound;
