import React from "react";
import {Link} from "react-router-dom";

const MoreList = ({ companyId }) => {

    return (
        <>
            <h1>
                More Options
            </h1>
            <div className="more-options">
                <div className="btn-group">
                    <div className="btn-group-label">
                        Company Members Management
                    </div>
                    <Link to={`/${companyId}/list-members`} className="more-btn">
                        <div className="icon-box">

                        </div>
                        <div className="more-name-box">
                            List All Members
                            <hr />
                        </div>
                    </Link>
                    {/*<Link to={`/${companyId}/add-member`} className="more-btn">*/}
                    {/*    <div className="icon-box">*/}

                    {/*    </div>*/}
                    {/*    <div className="more-name-box">*/}
                    {/*        Add New Member*/}
                    {/*        <hr />*/}
                    {/*    </div>*/}
                    {/*</Link>*/}
                    <Link to={`/${companyId}/manage-roles`} className="more-btn">
                        <div className="icon-box">

                        </div>
                        <div className="more-name-box">
                            Manage Roles
                            <hr />
                        </div>
                    </Link>
                </div>
                {/*===================================================================*/}
                <div className="btn-group">
                    <div className="btn-group-label">
                        Transactions Management
                    </div>
                    <Link to={`/${companyId}/list-transactions`} className="more-btn">
                        <div className="icon-box">

                        </div>
                        <div className="more-name-box">
                            Show All Transactions
                            <hr />
                        </div>
                    </Link>
                    <Link to={`/${companyId}/import-transactions`} className="more-btn">
                        <div className="icon-box">

                        </div>
                        <div className="more-name-box">
                            Import Transactions
                            <hr />
                        </div>
                    </Link>
                    <Link to={`/${companyId}/export-transactions`} className="more-btn">
                        <div className="icon-box">

                        </div>
                        <div className="more-name-box">
                            Export Transactions
                            <hr />
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default MoreList;