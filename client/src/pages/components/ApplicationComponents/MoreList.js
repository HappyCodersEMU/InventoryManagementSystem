import React from "react";
import {Link} from "react-router-dom";

const MoreList = () => {

    return (
        <>
            <h1>
                More Options
            </h1>
            <div className="btn-group">
                <div className="btn-group-label">
                    Company Members Management
                </div>
                <Link to={`/`} className="more-btn">
                    <div className="icon-box">

                    </div>
                    <div className="more-name-box">
                        List All Members
                        <hr />
                    </div>
                </Link>
                <button className="more-btn">
                    <div className="icon-box">

                    </div>
                    <div className="more-name-box">
                        Add New Member
                        <hr />
                    </div>
                </button>
                <button className="more-btn">
                    <div className="icon-box">

                    </div>
                    <div className="more-name-box">
                        Manage Roles
                        <hr />
                    </div>
                </button>
            </div>
        </>
    );
}

export default MoreList;