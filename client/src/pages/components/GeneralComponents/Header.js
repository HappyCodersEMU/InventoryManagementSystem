import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/auth.context";
import './Header.css'
import {useHttp} from "../../../hooks/http.hook";
import {Loader} from "./Loader";
import {Link} from "react-router-dom";

function Header({ companyId }) {
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [userData, setUserData] = useState(null)
    const [companyData, setCompanyData] = useState('')
    const [dataState, setDataState] = useState(false)

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
    }

    const getData = async () => {
        const user = await request(`/api/users/${auth.userId}`, 'GET')
        if (companyId) {
            const company = await request(`/api/companies/${companyId}`, 'GET')
            setCompanyData(company)
        }
        setUserData(user)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    if (!dataState) {
        return (<Loader />)
    }

    return (
        <>
            <header>
                <div className="header-content">
                    <div className="header-logo-wrap">
                        Logo block
                    </div>
                    { companyData &&
                    <div className="header-orgdata-wrap">
                        <div className="header-orgdata-block">
                            <h3 className="header-orgdata-company-name">
                                {companyData.name}
                            </h3>
                            <Link to={`/orglist`}>
                                <span>Choose another organization</span>
                            </Link>
                        </div>
                    </div> }
                    <div className="header-user-wrap">
                        <div className="header-user-block">
                            <div className="header-userdata">
                                <span>{userData.name} {userData.surname}</span>
                                <div onClick={logoutHandler} className="logout-btn">
                                    Log out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;