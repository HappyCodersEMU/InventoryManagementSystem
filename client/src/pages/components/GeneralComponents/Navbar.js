import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'


function Navbar({ companyId, validateRole, userRoles }) {

    return (
        <>
            { validateRole([1, 2, 3],userRoles) &&
            <div className="navbar-link">
                    <NavLink to={`/${companyId}/products`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap" >
                                <div className="navbar-link-content-icon" >

                                </div>
                            </div>
                            <div className="navbar-link-content-text">
                                <span>Products</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <hr className="input-line"/>
            </div>
            }

            { validateRole([1, 2, 3],userRoles) &&
            <div className="navbar-link">
                <NavLink to={`/${companyId}/inventory`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap" >
                                <div className="navbar-link-content-icon" >

                                </div>
                            </div>
                            <div className="navbar-link-content-text">
                                <span>Inventory</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <hr className="input-line"/>
            </div>
            }
            { validateRole([1, 3, 4],userRoles) &&
            <div className="navbar-link">
                <NavLink to={`/${companyId}/billing`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap" >
                                <div className="navbar-link-content-icon" >

                                </div>
                            </div>
                            <div className="navbar-link-content-text">
                                <span>Billing</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <hr className="input-line"/>
            </div>
            }

            { validateRole([1, 3],userRoles) &&
            <div className="navbar-link">
                <NavLink to={`/${companyId}/buy`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap" >
                                <div className="navbar-link-content-icon" >

                                </div>
                            </div>
                            <div className="navbar-link-content-text">
                                <span>Buy</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <hr className="input-line"/>
            </div>
            }

            { validateRole([1, 3],userRoles) &&
            <div className="navbar-link">
                <NavLink to={`/${companyId}/sell`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap" >
                                <div className="navbar-link-content-icon" >

                                </div>
                            </div>
                            <div className="navbar-link-content-text">
                                <span>Sell</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <hr className="input-line"/>
            </div>
            }

            { validateRole([1, 2],userRoles) &&
            <div className="navbar-link">
                <NavLink to={`/${companyId}/more`}>
                    <div className="navbar-link-content-wrap navbar-link-content-wrap-more">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap">
                                <div className="navbar-link-content-icon">
                                </div>
                            </div>
                            <div className="navbar-link-content-text">
                                <span>More</span>
                            </div>
                        </div>
                    </div>
                </NavLink>
                <hr className="input-line"/>
            </div>
            }
        </>
    );
}

export default Navbar