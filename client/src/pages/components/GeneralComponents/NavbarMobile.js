import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import './NavbarMobile.css'

import productsIcon from '../../../public/icons/NavbarIcons/box.png'
import inventoryIcon from '../../../public/icons/NavbarIcons/inventory.png'
import billingIcon from '../../../public/icons/NavbarIcons/purse.png'
import transactionIcon from '../../../public/icons/NavbarIcons/receipt.png'
import moreIcon from '../../../public/icons/NavbarIcons/more.png'
import closeIcon from '../../../public/icons/NavbarIcons/cancel.png'
import {AuthContext} from "../../../context/auth.context";

function NavbarMobile ({ companyId, validateRole, userRoles, setNavbarMobileState, companyName, userData }) {

    console.log(companyId)

    const auth = useContext(AuthContext)
    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }

    return (
        <>
            <div className="navbar-mobile-background">

                <div className="navbar-mobile-link-list">

                    <div className="navbar-mobile-close" >
                        <img src={closeIcon} onClick={setNavbarMobileState}  alt="close" />
                    </div>

                    { validateRole([1, 2, 3],userRoles) &&
                    <NavLink to={`/${companyId}/products`} >
                        <div className="navbar-mobile-link" onClick={setNavbarMobileState}>
                            <div className="navbar-mobile-item-content">
                                <div className="navbar-mobile-icon"><img src={productsIcon} alt="products" /></div>
                                <div className="navbar-mobile-link-name">Products</div>
                            </div>
                        </div>
                    </NavLink>
                    }

                    { validateRole([1, 2, 3],userRoles) &&
                    <NavLink to={`/${companyId}/inventory`} >
                        <div className="navbar-mobile-link" onClick={setNavbarMobileState}>
                            <div className="navbar-mobile-item-content">
                                <div className="navbar-mobile-icon"><img src={inventoryIcon} alt="inventory" /></div>
                                <div className="navbar-mobile-link-name">Inventory</div>
                            </div>
                        </div>
                    </NavLink>
                    }

                    { validateRole([1, 2, 4],userRoles) &&
                    <NavLink to={`/${companyId}/billing`} >
                        <div className="navbar-mobile-link" onClick={setNavbarMobileState}>
                            <div className="navbar-mobile-item-content">
                                <div className="navbar-mobile-icon"><img src={billingIcon}  alt="billing" /></div>
                                <div className="navbar-mobile-link-name">Billing</div>
                            </div>
                        </div>
                    </NavLink>
                    }

                    { validateRole([1, 2],userRoles) &&
                    <NavLink to={`/${companyId}/transactions`} >
                        <div className="navbar-mobile-link" onClick={setNavbarMobileState}>
                            <div className="navbar-mobile-item-content">
                                <div className="navbar-mobile-icon"><img src={transactionIcon}  alt="transactions" /></div>
                                <div className="navbar-mobile-link-name">Transactions</div>
                            </div>
                        </div>
                    </NavLink>
                    }

                    { validateRole([1, 2],userRoles) &&
                    <NavLink to={`/${companyId}/members`} >
                        <div className="navbar-mobile-link" onClick={setNavbarMobileState}>
                            <div className="navbar-mobile-item-content">
                                <div className="navbar-mobile-icon"><img src={moreIcon} alt="members" /></div>
                                <div className="navbar-mobile-link-name">Members</div>
                            </div>
                        </div>
                    </NavLink>
                    }

                    <div className="navbar-mobile-company-name-wrap">
                        <span>{companyName}</span>
                        <Link to={'/orglist'} >Switch to another company</Link>
                    </div>

                    <div className="navbar-mobile-user-block">
                        <span>{userData.name} {userData.surname}</span>

                        <span onClick={logoutHandler} className="navbar-logout-btn">
                            Log out
                        </span>
                    </div>



                </div>
            </div>

        </>
    );
}

export default NavbarMobile