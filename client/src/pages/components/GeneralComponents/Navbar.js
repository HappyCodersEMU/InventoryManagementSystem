import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'


function Navbar({ companyId }) {

    return (
        <>
            <div className="navbar-link">
                <NavLink to={`/${companyId}/products`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap" >
                                <div className="navbar-link-content-icon" data-placeholder="&#xf207;" >

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
            <div className="navbar-link">
                <NavLink to={`/${companyId}/inventory`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap">
                                <div className="navbar-link-content-icon">
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
            <div className="navbar-link">
                <NavLink to={`/${companyId}/buy`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap">
                                <div className="navbar-link-content-icon">
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
            <div className="navbar-link">
                <NavLink to={`/${companyId}/sell`} >
                    <div className="navbar-link-content-wrap">
                        <div className="navbar-link-content">
                            <div className="navbar-link-content-icon-wrap">
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
            <div className="navbar-link">
                <NavLink to={`/${companyId}/more`} >
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
            {/*<NavLink to={`/${companyId}/products`} >*/}
            {/*    <div className="navbar-btn">*/}
            {/*        Products*/}
            {/*    </div>*/}
            {/*</NavLink>*/}
            {/*<hr/>*/}
            {/*<NavLink to={`/${companyId}/inventory`} className="link-wrap" >*/}
            {/*    <div className="navbar-btn">*/}
            {/*        Inventory*/}
            {/*    </div>*/}
            {/*</NavLink>*/}
            {/*<hr/>*/}
            {/*<NavLink to={`/${companyId}/buy`} className="link-wrap" >*/}
            {/*    <div className="navbar-btn">*/}
            {/*        Buy*/}
            {/*    </div>*/}
            {/*</NavLink>*/}
            {/*<hr/>*/}
            {/*<NavLink to={`/${companyId}/sell`} className="link-wrap" >*/}
            {/*    <div className="navbar-btn">*/}
            {/*        Sell*/}
            {/*    </div>*/}
            {/*</NavLink>*/}
            {/*<hr/>*/}
            {/*<NavLink to={`/${companyId}/more`} className="link-wrap" >*/}
            {/*    <div className="navbar-btn navbar-btn-more">*/}
            {/*        More*/}
            {/*    </div>*/}
            {/*</NavLink>*/}
            {/*<hr/>*/}
        </>
    );
}

export default Navbar;