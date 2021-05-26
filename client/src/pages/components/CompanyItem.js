import React from "react";
import {Link} from "react-router-dom";

function CompanyItem({ data, loading }) {
    return (
        <div className="orglist-wrap">
            <Link to={`/${data._id}/home`}>
                <div className="orglist-company-name-block">
                    {data.name}
                </div>
                <div className="orglist-company-info-block">
                    <div className="orglist-company-info-text">
                        Company ID: {data._id}
                    </div>
                    <div className="orglist-company-info-text">
                        Subscription Plan: {data.subscription.name}
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CompanyItem;