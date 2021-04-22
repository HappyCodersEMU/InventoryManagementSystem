import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./components/Loader";
import {AuthContext} from "../context/auth.context";

export const OrganizationPage = () => {

    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()
    const [dataState, setDataState] = useState(null)
    const [data, setData] = useState(null)
    const [companyName, setCompanyName] = useState('')

    const getData = async () => {
        const temp = await request('/api/subscription', 'GET')
        setData(temp)
    }

    useEffect(async () => {
        if (!dataState) {
            await getData()
            setDataState(true)
        }
    }, [])

    const changeHandler = event => {
        setCompanyName(event.target.value)
    }

    const createCompanyHandler = async (event) => {
        try {
            const planName = event.target.getAttribute('value')
            if (companyName.length < 3) {
                console.log("Length of company name should be more then 3 symbols")
                return
            }
            const userId = auth.userId
            const req = await request('/api/company/create', 'POST', {companyName, planName, userId})
        } catch (e) {}
    }

    if (!dataState) {
        return <Loader/>
    }

    return (
        <div>
            <div className="organization-container">
                <div className="organization-box">
                    <div className="organization-input-box">
                        <div className="organization-input-wrap">
                            <label>Name of Organization<input name="companyName" onChange={changeHandler}/></label>
                        </div>
                    </div>
                    <div className="organization-plan-cards-wrap">
                        <div className="organization-plan-card">
                            <div className="plan-header">
                                <h1>{data[0].name.toUpperCase()}</h1>
                                <span className="plan-price">${data[0].price}</span>
                            </div>
                            <div className="plan-body">
                                <span>{data[0].transPerMonth} Transactions / Month</span><br/>
                                <span>{data[0].numProducts} Products</span><br/>
                                <span>{data[0].numMembers} Users</span>
                            </div>
                            <div className="plan-button">
                                <button disabled={loading} value={data[0].name} onClick={createCompanyHandler}>
                                    Select Plan
                                </button>
                            </div>
                        </div>
                        <div className="organization-plan-card">
                            <div className="plan-header">
                                <h1>{data[1].name.toUpperCase()}</h1>
                                <span className="plan-price">${data[1].price}</span>
                            </div>
                            <div className="plan-body">
                                <span>{data[1].transPerMonth} Transactions / Month</span><br/>
                                <span>{data[1].numProducts} Products</span><br/>
                                <span>{data[1].numMembers} Users</span>
                            </div>
                            <div className="plan-button">
                                <button disabled={loading} value={data[1].name} onClick={createCompanyHandler}>
                                    Select Plan
                                </button>
                            </div>
                        </div>
                        <div className="organization-plan-card">
                            <div className="plan-header">
                                <h1>{data[2].name.toUpperCase()}</h1>
                                <span className="plan-price">${data[2].price}</span>
                            </div>
                            <div className="plan-body">
                                <span>{data[2].transPerMonth} Transactions / Month</span><br/>
                                <span>{data[2].numProducts} Products</span><br/>
                                <span>{data[2].numMembers} Users</span>
                            </div>
                            <div className="plan-button">
                                <button disabled={loading} value={data[2].name} onClick={createCompanyHandler}>
                                    Select Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}