import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from "../context/auth.context";
import Header from "./components/Header";
import CompanyItem from "./components/CompanyItem";
import PlanInfo from "./components/PlanInfo";
import Navbar from "./components/Navbar";
import MoreList from "./components/ApplicationComponents/MoreList";
import ProductList from "./components/ApplicationComponents/ProductList";
import Inventory from "./components/ApplicationComponents/Inventory";
import BuyList from "./components/ApplicationComponents/BuyList";
import SellList from "./components/ApplicationComponents/SellList";
import HomePage from "./components/ApplicationComponents/HomePage";

export const Application = () => {

    const companyId = useParams().id
    const link = useParams().link
    const auth = useContext(AuthContext)

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
                        { link === 'more' && <MoreList /> }
                    </div>
                </div>
            </div>
        </div>
    )
}