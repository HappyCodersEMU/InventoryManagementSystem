import React from "react";
import {Link} from "react-router-dom";

function Navbar({companyId}) {

    return (
        <>
            <Link to={`/${companyId}/products`} className="link-wrap">
                <div className="navbar-btn">
                    Products
                </div>
            </Link>
            <hr/>
            <Link to={`/${companyId}/inventory`} className="link-wrap" >
                <div className="navbar-btn">
                    Inventory
                </div>
            </Link>
            <hr/>
            <Link to={`/${companyId}/buy`} className="link-wrap" >
                <div className="navbar-btn">
                    Buy
                </div>
            </Link>
            <hr/>
            <Link to={`/${companyId}/sell`} className="link-wrap" >
                <div className="navbar-btn">
                    Sell
                </div>
            </Link>
            <hr/>
            <Link to={`/${companyId}/more`} className="link-wrap" >
                <div className="navbar-btn navbar-btn-more">
                    More
                </div>
            </Link>
            <hr/>
        </>
    );
}

export default Navbar;