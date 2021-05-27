import React from "react";

function PlanInfo({ data }) {
    return (
        <div className="orglist-company-plan-info">
            <h2>{data.name.toUpperCase()}</h2>
            <h3>${data.price}</h3>
            <span>{data.transPerMonth} Transactions / Month</span><br />
            <span>{data.numProducts} Products</span><br />
            <span>{data.numMembers} Users</span>
        </div>
    );
}

export default PlanInfo;