import React from "react";
import {Link} from "react-router-dom";

function CompanyItem({ data, loading }) {
    return (
        <div className="orglist-item">
            {/*<Link to={`/${data._id}/home`}>*/}
            {/*    <div className="orglist-company-name-block">*/}
            {/*        {data.name}*/}
            {/*    </div>*/}
            {/*    <div className="orglist-company-info-block">*/}
            {/*        <div className="orglist-company-info-text">*/}
            {/*            Company ID: {data._id}*/}
            {/*        </div>*/}
            {/*        <div className="orglist-company-info-text">*/}
            {/*            Subscription Plan: {data.subscriptionID.name}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Link>*/}
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
                            Subscription plan: {data.subscriptionID.name}</p>
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    );
}

export default CompanyItem;