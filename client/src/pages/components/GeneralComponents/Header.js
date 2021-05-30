import React, { useContext } from "react";

import logo from "../../../public/images/temp-logo.png"
import notificationBell from "../../../public/icons/bell.png"
import settingsIcon from "../../../public/icons/settings.png"
import chatIcon from "../../../public/icons/chat.png"

import {AuthContext} from "../../../context/auth.context";
import './Header.css'
import { NavLink } from "react-router-dom";

function Header({ companyId, userRoleName, userData, link }) {

    const auth = useContext(AuthContext)

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }

    return (
        <>
            <header>
                <div className="header-content">
                    { link &&
                    <NavLink to={`/${companyId}/home`} >
                        <div className="header-logo-wrap">
                            <img alt="logo" src={logo} />
                            <h3>Happy Coders</h3>
                        </div>
                    </NavLink>
                    }
                    { !link &&
                    <div className="header-logo-wrap">
                        <img src={logo} alt="logo" />
                        <h3>Happy Coders</h3>
                    </div>
                    }
                    {/*{ companyData &&*/}
                    {/*<div className="header-orgdata-wrap">*/}
                    {/*    <div className="header-orgdata-block">*/}
                    {/*        <h3 className="header-orgdata-company-name">*/}
                    {/*            {companyData.name}*/}
                    {/*        </h3>*/}
                    {/*        <Link to={`/orglist`}>*/}
                    {/*            <span>Choose another organization</span>*/}
                    {/*        </Link>*/}
                    {/*    </div>*/}
                    {/*</div> }*/}
                    {/*<div className="header-user-wrap">*/}
                    {/*    <div className="header-user-block">*/}
                    {/*        <div className="header-userdata">*/}
                    {/*            <span>{userData.name} {userData.surname}</span>*/}
                    {/*            <div onClick={logoutHandler} className="logout-btn">*/}
                    {/*                Log out*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="header-user-wrap">
                        <div className="header-user-block-left">
                            <div><img src={chatIcon} alt="chat" /></div>
                            <div><img src={notificationBell} alt="notification" /></div>
                            <div><img src={settingsIcon} alt="settings" /></div>
                        </div>
                        <hr />
                        <div className="header-user-block-right">
                            <span>{userData.name} {userData.surname}</span>
                            {/*<span>Benedict ALDSAJOdhsad</span>*/}
                            <div>
                                { userRoleName && <span className="header-user-roleName">{userRoleName}</span>}
                                {/*<span>Administrator</span>*/}
                                <span onClick={logoutHandler} className="header-logout-btn">
                                    Log out
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
    );
}

export default Header;