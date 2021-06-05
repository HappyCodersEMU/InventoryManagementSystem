import React from "react";
import { Link } from "react-router-dom";

function CompanyItem({ data }) {
    return (
        <div className="orglist-item">
            <Link to={`/${data._id}/home`}>
                <div className="orglist-item-wrap">
                    <div className="orglist-item-background">
                    </div>
                    <div className="orglist-item-content">
                        <div className="orglist-item-content-open">
                            <h1>
                                Open
                            </h1>
                        </div>
                        <div className="orglist-item-company-info">
                            <h1>{data.name}</h1>
                            <p>Company ID: {data._id}<br/>
                            Subscription plan: {data.subscriptionName}</p>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default CompanyItem;