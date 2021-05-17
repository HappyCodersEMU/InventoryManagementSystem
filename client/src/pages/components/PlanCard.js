import React from "react";
import PropTypes from "prop-types";

function PlanCard({ data, loading, onClick }) {
    return (
        <>
            <div className="organization-plan-card">
                <div className="organization-plan-card-content">
                    <div className="plan-header">
                        <h1>{data.name.toUpperCase()}</h1>
                        <h2>${data.price}</h2>
                    </div>
                    <div className="plan-body">
                        <span>{data.transPerMonth} Transactions / Month</span><br />
                        <span>{data.numProducts} Products</span><br />
                        <span>{data.numMembers} Users</span>
                    </div>
                    <button className="plan-button" disabled={loading} value={data.name} onClick={(e) => { onClick(e) }}>
                        Select Plan
                    </button>
                </div>
            </div>
        </>
    );
}

PlanCard.propTypes = {
    data: PropTypes.shape({
        transPerMonth: PropTypes.number,
        numProducts: PropTypes.number,
        numMembers: PropTypes.number,
        price: PropTypes.number,
        name: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default PlanCard;