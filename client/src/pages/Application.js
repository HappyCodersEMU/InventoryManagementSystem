import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import Header from "./components/GeneralComponents/Header";
import Navbar from "./components/GeneralComponents/Navbar";
import MoreList from "./components/ApplicationComponents/MoreOptionsComponents/MoreList";
import Inventory from "./components/ApplicationComponents/Inventory";
import SellList from "./components/ApplicationComponents/SellList";
import HomePage from "./components/ApplicationComponents/HomePage";
import TableMembers from "./components/ApplicationComponents/MoreOptionsComponents/TableMembers";
import TableProducts from "./components/ApplicationComponents/ProductComponents/TableProducts";
import TableBuy from "./components/ApplicationComponents/BuyComponents/TableBuy";
import Modal from "./components/ApplicationComponents/BuyComponents/Modal";
import ModalAddMember from "./components/ApplicationComponents/MoreOptionsComponents/ModalAddMember";
import {useAuth} from "../hooks/auth.hook";
import {AuthContext} from "../context/auth.context";
import {useHttp} from "../hooks/http.hook";
import {Blocked} from "./components/GeneralComponents/Blocked";
import ModalAddToInventory from "./components/ApplicationComponents/ProductComponents/ModalAddToInventory";
import TableInventory from "./components/ApplicationComponents/InventoryComponents/TableInventory";
import {Loader} from "./components/GeneralComponents/Loader";
import Billing from "./components/ApplicationComponents/Billing";

export const Application = () => {

    const auth = useAuth(AuthContext)
    const { request } = useHttp()

    const validateRole = (roles, userRoles) => (
        // userRoles && roles.map(role => userRoles.indexOf(role) !== -1).includes(true)
        roles.includes(userRoles)
    )


    // Modal States
    const [modalAddMemberActive, setModalAddMemberActive] = useState(false)

    const [modalAddToInventoryActive, setModalAddToInventoryActive] = useState(false)
    const [modalAddToInventoryData, setModalAddToInventoryData] = useState(false)

    const [modalActive, setModalActive] = useState(false)
    const [modalData, setModalData] = useState(false)

    // Block States
    const [dataState, setDataState] = useState(false)
    const [authState, setAuthState] = useState(false)
    const [blocked, setBlocked] = useState(true)

    const [userRoles, setUserRoles] = useState(null)

    const companyId = useParams().id
    const link = useParams().link

    const checkAccess = async () => {
        try {
            const req = await request(`/api/members?userId=${auth.userId}&companyId=${companyId}`, 'GET')
            console.log(req)
            if (req[0]) {
                setBlocked(false)
            }
            req[0].test = 3
            setUserRoles(req[0].roleID.roleCode)
            setDataState(true)
        } catch (e) {}
    }

    useEffect(async () => {
        if (auth.userId)
        {
            await checkAccess()
        }
        setAuthState(true)
    }, [authState])


    if (dataState !== true) {
        return (
            <Loader />
        )
    }

    if (blocked === true) {
        return (
            <Blocked />
        )
    }

    const test = () => {
        console.log(userRoles)
    }

    return (
        <div>

            { modalAddMemberActive === true && <ModalAddMember
                companyId={companyId}
                active={modalAddMemberActive}
                setActive={setModalAddMemberActive}
            /> }

            { modalAddToInventoryActive === true && <ModalAddToInventory
                companyId={companyId}
                active={modalAddToInventoryActive}
                setActive={setModalAddToInventoryActive}
                modalData={modalAddToInventoryData}
                setModalData={setModalAddToInventoryData}
            /> }


            <div className="background">
                <Header companyId={companyId} />
                {/*<button onClick={test}>Test</button>*/}
                <div className="container">
                    <div className="navbar-wrap">
                        <Navbar companyId={companyId} />
                    </div>
                    <div className="content-wrap">
                        { link === 'home' && <HomePage /> }
                        { validateRole([1, 2, 3],userRoles) && link === 'products' && <TableProducts companyId={companyId} setModalActive={setModalAddToInventoryActive} setModalData={setModalAddToInventoryData}/> }
                        { validateRole([1, 2, 3],userRoles) && link === 'inventory' && <TableInventory companyId={companyId} /> }
                        { validateRole([1, 3, 4],userRoles) && link === 'billing' && <Billing companyId={companyId} setModalActive={setModalAddToInventoryActive} setModalData={setModalAddToInventoryData}/> }
                        { validateRole([1, 3],userRoles) && link === 'buy' && <TableBuy companyId={ companyId } setModalActive={setModalActive} setModalData={setModalData}/> }
                        { validateRole([1, 3],userRoles) && link === 'sell' && <SellList /> }
                        { link === 'more' && <MoreList companyId={companyId} /> }
                        <>
                            { validateRole([1],userRoles) && link === 'list-members' && <TableMembers companyId={ companyId } setModalActive={setModalAddMemberActive}/> }
                            {/*{ validateRole([1, 3],userRoles) && link === 'transactions' && <TableMembers companyId={ companyId } setModalActive={setModalAddMemberActive}/> }*/}
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}