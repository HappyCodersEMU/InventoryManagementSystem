import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
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

export const Application = () => {

    const [modalAddMemberActive, setModalAddMemberActive] = useState(false)
    const [modalAddMemberTemp, setModalAddMemberTemp] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [modalData, setModalData] = useState(false)

    const companyId = useParams().id
    const link = useParams().link

    const test = () => {
    }

    return (
        <div>
            <button onClick={test}>test</button>

            { modalAddMemberActive === true && <ModalAddMember
                companyId={companyId}
                active={modalAddMemberActive}
                setActive={setModalAddMemberActive}
            /> }


            <div className="background">
                <Header />
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