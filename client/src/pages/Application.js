import React from 'react'
import {useParams} from 'react-router-dom'
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MoreList from "./components/ApplicationComponents/MoreOptionsComponents/MoreList";
import ProductList from "./components/ApplicationComponents/ProductList";
import Inventory from "./components/ApplicationComponents/Inventory";
import BuyList from "./components/ApplicationComponents/BuyList";
import SellList from "./components/ApplicationComponents/SellList";
import HomePage from "./components/ApplicationComponents/HomePage";
import ListMembers from "./components/ApplicationComponents/MoreOptionsComponents/ListMembers";

export const Application = () => {

    const companyId = useParams().id
    const link = useParams().link

    return (
        <div>
            <div className="background">
                <Header />
                <div className="container">
                    <div className="navbar-wrap">
                        <Navbar companyId={companyId} />
                    </div>
                    <div className="content-wrap">
                        { link === 'home' && <HomePage /> }
                        { link === 'products' && <ProductList /> }
                        { link === 'inventory' && <Inventory /> }
                        { link === 'buy' && <BuyList /> }
                        { link === 'sell' && <SellList /> }
                        { link === 'more' && <MoreList companyId={companyId} /> }
                        <>
                            { link === 'list-members' && <ListMembers companyId={companyId} /> }

                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}