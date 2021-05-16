import React from "react";
import {Link} from "react-router-dom";

function CompanyItem({ data, loading }) {
    return (
        <div className="list-wrap">
            <Link to={`/${data._id}/home`}>
                <div className="company-name-block">
                    {data.name}
                </div>
                <div className="company-info-block">
                    <div className="company-info-text">
                        Company ID: {data._id}
                    </div>
                    <div className="company-info-text">
                        Subscription Plan: {data.subscriptionID.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CompanyItem;