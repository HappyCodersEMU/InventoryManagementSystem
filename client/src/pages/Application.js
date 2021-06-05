import React, { useEffect, useState } from 'react'
import { useAuth } from "../hooks/auth.hook";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Link, useParams } from 'react-router-dom'
import { Blocked } from "./components/GeneralComponents/Blocked";
import { Loader } from "./components/GeneralComponents/Loader";

import Header from "./components/GeneralComponents/Header";
import Navbar from "./components/GeneralComponents/Navbar";
import NavbarMobile from "./components/GeneralComponents/NavbarMobile";
import HomePage from "./components/ApplicationComponents/HomePage";
import TableProducts from "./components/ApplicationComponents/ProductComponents/TableProducts";
import ModalAddToInventory from "./components/ApplicationComponents/ProductComponents/ModalAddToInventory";
import TableInventory from "./components/ApplicationComponents/InventoryComponents/TableInventory";
import TableMembers from "./components/ApplicationComponents/MoreOptionsComponents/TableMembers";
import ModalAddMember from "./components/ApplicationComponents/MoreOptionsComponents/ModalAddMember";
import BillingPage from "./components/ApplicationComponents/BillingComponents/BillingPage";
import SellList from "./components/ApplicationComponents/SellList";

import clockIcon from "../public/icons/clock.png";
import menuIcon from "../public/icons/menu.png";

export const Application = () => {

    const auth = useAuth(AuthContext)
    const { request } = useHttp()

    const validateRole = (roles, userRoles) => (
        roles.includes(userRoles)
    )


    // Modal States
    const [modalAddMemberActive, setModalAddMemberActive] = useState(false)
    const [addMemberTempData, setAddMemberTempData] = useState(null)


    const [modalAddToInventoryActive, setModalAddToInventoryActive] = useState(false)
    const [modalAddToInventoryData, setModalAddToInventoryData] = useState(false)

    // Block States
    const [dataState, setDataState] = useState(false)
    const [authState, setAuthState] = useState(false)
    const [blocked, setBlocked] = useState(true)

    // User Roles
    const [userData, setUserData] = useState(null)
    const [userRoles, setUserRoles] = useState(null)
    const [userRoleName, setUserRoleName] = useState(null)

    // Company Name
    const [companyName, setCompanyName] = useState(null)

    // Clocks
    const [clockState, setClockState] = useState(null)

    // Navbar Mobile
    const [navbarMobileState, setNavbarMobileState] = useState(false)

    const startClock = () => {

        if (clockState === null) {
            setInterval(() => {
                const now = new Date
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const outputDate = now.getDate() + ' '
                    + monthNames[now.getMonth()] + ', '
                    + now.toLocaleTimeString()
                setClockState(outputDate)
            }, 1000)
        }
    }

    const companyId = useParams().id
    const link = useParams().link

    const checkAccess = async () => {
        try {
            const req = await request(`/api/members?userId=${auth.userId}&companyId=${companyId}`, 'GET')
            if (req[0]) {
                startClock()
                setBlocked(false)
                const user = await request(`/api/users/${auth.userId}`, 'GET')
                setUserData(user)
            }
            setCompanyName(req[0].company.name)
            setUserRoles(req[0].role.roleCode)
            setUserRoleName(req[0].role.roleName)
        } catch (e) { }
    }

    useEffect(async () => {
        if (auth.userId) {
            await checkAccess()
            setDataState(true)
        }
        setAuthState(true)
    }, [authState])


    if (blocked === true) {
        return (
            <Blocked />
        )
    }

    if (dataState !== true) {
        return (
            <Loader />
        )
    }

    // const test = () => { console.log(companyName) }

    return (
        <div>

            { navbarMobileState === true && <NavbarMobile companyId={companyId}
                validateRole={validateRole}
                userRoles={userRoles}
                link={link}
                setNavbarMobileState={setNavbarMobileState}
                companyName={companyName}
                userData={userData} />}

            { modalAddMemberActive === true && <ModalAddMember
                companyId={companyId}
                active={modalAddMemberActive}
                setActive={setModalAddMemberActive}
                setAddMemberTempData={setAddMemberTempData}
            />}

            { modalAddToInventoryActive === true && <ModalAddToInventory
                companyId={companyId}
                active={modalAddToInventoryActive}
                setActive={setModalAddToInventoryActive}
                modalData={modalAddToInventoryData}
                setModalData={setModalAddToInventoryData}
            />}


            <div className="background">
                <div className="background-colored"></div>
                <div className="background-gray"></div>
                <div className="content">
                    <Header companyId={companyId} userRoleName={userRoleName} userData={userData} link={link} />
                    {/*<button onClick={test}>Test</button>*/}
                    <div className="container">
                        <div className="navbar-wrap">
                            <Navbar companyId={companyId} validateRole={validateRole} userRoles={userRoles} link={link} />
                        </div>
                        <div className="container-header">
                            <span className="clock"><img src={clockIcon} alt="clock" />{clockState}</span>
                            <div className="navbar-mobile-wrap" onClick={event => setNavbarMobileState(true)}>
                                <img src={menuIcon} alt="menu" />
                            </div>
                            <div className="company-name-wrap">
                                <span>{companyName}</span>
                                <Link to={'/orglist'} >Switch to another company</Link>
                            </div>
                        </div>
                        <div className="container-subheader"><span>
                            {link === 'dashboard' && <i>Dashboard</i>}
                            {link === 'products' && <i>Products</i>}
                            {link === 'inventory' && <i>Inventory</i>}
                            {link === 'billing' && <i>Billing</i>}
                            {link === 'transactions' && <i>Transactions</i>}
                            {link === 'more' && <i>More</i>}
                            {link === 'settings' && <i>Settings</i>}
                        </span>
                        </div>

                        <div className="content-wrap">
                            <div className="content-box">
                                {link === 'home' && <HomePage />}
                                {validateRole([1, 2, 3], userRoles) && link === 'products' && <TableProducts companyId={companyId} setModalActive={setModalAddToInventoryActive} setModalData={setModalAddToInventoryData} />}
                                {validateRole([1, 2, 3], userRoles) && link === 'inventory' && <TableInventory companyId={companyId} />}
                                {validateRole([1, 2, 4], userRoles) && link === 'billing' && <BillingPage companyId={companyId} setModalActive={setModalAddToInventoryActive} setModalData={setModalAddToInventoryData} />}
                                {validateRole([1, 2], userRoles) && link === 'transactions' && <SellList companyId={companyId} />}
                                {validateRole([1, 2], userRoles) && link === 'members' &&
                                    <TableMembers companyId={companyId} setModalActive={setModalAddMemberActive}
                                        addMemberTempData={addMemberTempData} setAddMemberTempData={setAddMemberTempData} />
                                }
                                {validateRole([1], userRoles) && link === 'settings' && <SellList companyId={companyId} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}