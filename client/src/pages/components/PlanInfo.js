import React from "react";

function PlanInfo({ data }) {
    return (
        <div className="temp">
            <span>${data.price}</span><br />
            <span>{data.transPerMonth} Transactions / Month</span><br />
            <span>{data.numProducts} Products</span><br />
            <span>{data.numMembers} Users</span>
        </div>
    );
}

export default PlanInfo;