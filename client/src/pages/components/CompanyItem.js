import React from "react";
import {Link} from "react-router-dom";

function CompanyItem({ data, loading, onClick }) {
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
                        Subscription Plan: {data.subscriptionID}
                    </div>
                </div>
            </Link>
        </div>
    );
}

// PlanCard.propTypes = {
//     data: PropTypes.shape({
//         transPerMonth: PropTypes.number,
//         numProducts: PropTypes.number,
//         numMembers: PropTypes.number,
//         price: PropTypes.number,
//         name: PropTypes.string,
//     }).isRequired,
//     loading: PropTypes.bool,
//     onClick: PropTypes.func
// };

export default CompanyItem;