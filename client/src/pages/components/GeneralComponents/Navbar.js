import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({companyId}) {

    return (
        <>
            <NavLink to={`/${companyId}/products`} className="link-wrap">
                <div className="navbar-btn">
                    Products
                </div>
            </NavLink>
            <hr/>
            <NavLink to={`/${companyId}/inventory`} className="link-wrap" >
                <div className="navbar-btn">
                    Inventory
                </div>
            </NavLink>
            <hr/>
            <NavLink to={`/${companyId}/buy`} className="link-wrap" >
                <div className="navbar-btn">
                    Buy
                </div>
            </NavLink>
            <hr/>
            <NavLink to={`/${companyId}/sell`} className="link-wrap" >
                <div className="navbar-btn">
                    Sell
                </div>
            </NavLink>
            <hr/>
            <NavLink to={`/${companyId}/more`} className="link-wrap" >
                <div className="navbar-btn navbar-btn-more">
                    More
                </div>
            </NavLink>
            <hr/>
            <NavLink to={`/orglist`}>
                Select another organization
            </NavLink>
        </>
    );
}

export default Navbar;