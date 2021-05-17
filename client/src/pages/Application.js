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

export const Application = () => {
    const auth = useAuth(AuthContext)


    const { request } = useHttp()
    const [modalAddMemberActive, setModalAddMemberActive] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [modalData, setModalData] = useState(false)

    const [dataState, setDataState] = useState(null)

    const [blocked, setBlocked] = useState(false)

    if (auth.userId) {
        // setUserState(auth.userId)
        // console.log(auth.userId)
    } else { }

    const companyId = useParams().id
    const link = useParams().link

    const setUser = () => {

    }

    const checkAccess = async () => {
        try {
            const req = await request(`/api/members?userId=${auth.userId}&companyId=${companyId}`, 'GET')
            if (!req[0]) {
                setBlocked(true)
            }
        } catch (e) {
        }

    }

    useEffect(async () => {
        if (auth.userId)
        {
            await checkAccess()
        }
        setDataState(true)
    }, [dataState])


    if (blocked === true) {
        return (
            <>
                <h1>Blocked</h1>
                <Link to='/orglist'>To Orglist</Link>
            </>
        )
    }

    const test = () => {
        console.log(auth)
    }

    return (
        <div>

            { modalAddMemberActive === true && <ModalAddMember
                companyId={companyId}
                active={modalAddMemberActive}
                setActive={setModalAddMemberActive}
            /> }


            <div className="background">
                <Header />
                {/*<button onClick={test}>Test</button>*/}
                <div className="container">
                    <div className="navbar-wrap">
                        <Navbar companyId={companyId} />
                    </div>
                    <div className="content-wrap">
                        { link === 'home' && <HomePage /> }
                        { link === 'products' && <TableProducts companyId={ companyId } /> }
                        { link === 'inventory' && <Inventory /> }
                        { link === 'buy' && <TableBuy companyId={ companyId } setModalActive={setModalActive} setModalData={setModalData}/> }
                        { link === 'sell' && <SellList /> }
                        { link === 'more' && <MoreList companyId={companyId} /> }
                        <>
                            { link === 'list-members' && <TableMembers companyId={ companyId } setModalActive={setModalAddMemberActive}/> }
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}