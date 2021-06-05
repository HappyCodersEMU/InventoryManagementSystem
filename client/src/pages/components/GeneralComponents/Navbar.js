import React from "react";
import { NavLink } from "react-router-dom";

import productsIcon from '../../../public/icons/NavbarIcons/box.png'
import inventoryIcon from '../../../public/icons/NavbarIcons/inventory.png'
import billingIcon from '../../../public/icons/NavbarIcons/purse.png'
import transactionIcon from '../../../public/icons/NavbarIcons/receipt.png'
import moreIcon from '../../../public/icons/NavbarIcons/more.png'
import settingsIcon from '../../../public/icons/settings.png'
import './Navbar.css'

function Navbar({ companyId, validateRole, userRoles, link }) {

    return (
        <>
            { validateRole([1, 2, 3],userRoles) &&
            <NavLink to={`/${companyId}/products`} >
                <div className="navbar-link">
                    { link === 'products' &&
                    <div className="navbar-current">
                        <hr />
                        <div className="navbar-current-transparent-gradient"></div>
                    </div>
                    }
                    <div className="navbar-item-content">
                        <div className="navbar-icon"><img src={productsIcon}  alt="products" /></div>
                        <div className="navbar-link-name">Products</div>
                    </div>
                </div>
            </NavLink>
            }

            { validateRole([1, 2, 3],userRoles) &&
            <NavLink to={`/${companyId}/inventory`} >
                <div className="navbar-link">
                    { link === 'inventory' &&
                    <div className="navbar-current">
                        <hr />
                        <div className="navbar-current-transparent-gradient"></div>
                    </div>
                    }
                    <div className="navbar-item-content">
                        <div className="navbar-icon"><img src={inventoryIcon} alt="inventory" /></div>
                        <div className="navbar-link-name">Inventory</div>
                    </div>
                </div>
            </NavLink>
            }


            { validateRole([1, 2, 4],userRoles) &&
            <NavLink to={`/${companyId}/billing`} >
                <div className="navbar-link">
                    { link === 'billing' &&
                    <div className="navbar-current">
                        <hr />
                        <div className="navbar-current-transparent-gradient"></div>
                    </div>
                    }
                    <div className="navbar-item-content">
                        <div className="navbar-icon"><img src={billingIcon} alt="billing" /></div>
                        <div className="navbar-link-name">Billing</div>
                    </div>
                </div>
            </NavLink>
            }

            { validateRole([1, 2],userRoles) &&
            <NavLink to={`/${companyId}/transactions`} >
                <div className="navbar-link">
                    { link === 'transactions' &&
                    <div className="navbar-current">
                        <hr />
                        <div className="navbar-current-transparent-gradient"></div>
                    </div>
                    }
                    <div className="navbar-item-content">
                        <div className="navbar-icon"><img src={transactionIcon} alt="transaction" /></div>
                        <div className="navbar-link-name">Transactions</div>
                    </div>
                </div>
            </NavLink>
            }

            { validateRole([1, 2],userRoles) &&
            <NavLink to={`/${companyId}/members`} >
                <div className="navbar-link">
                    { link === 'members' &&
                    <div className="navbar-current">
                        <hr />
                        <div className="navbar-current-transparent-gradient"></div>
                    </div>
                    }
                    <div className="navbar-item-content">
                        <div className="navbar-icon"><img src={moreIcon} alt="members" /></div>
                        <div className="navbar-link-name">Members</div>
                    </div>
                </div>
            </NavLink>
            }

            { validateRole([1],userRoles) && <hr />}

            { validateRole([1],userRoles) &&
            <NavLink to={`/${companyId}/settings`} >
                <div className="navbar-link">
                    { link === 'settings' &&
                    <div className="navbar-current">
                        <hr />
                        <div className="navbar-current-transparent-gradient"></div>
                    </div>
                    }
                    <div className="navbar-item-content">
                        <div className="navbar-icon"><img src={settingsIcon} alt="settings" /></div>
                        <div className="navbar-link-name">Settings</div>
                    </div>
                </div>
            </NavLink>
            }

        </>
    );
}

export default Navbar