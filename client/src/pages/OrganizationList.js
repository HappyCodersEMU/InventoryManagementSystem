import React, {useContext, useEffect, useState} from 'react'
import Header from "./components/Header";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./components/Loader";
import PlanCard from "./components/PlanCard";
import CompanyItem from "./components/CompanyItem";
import PlanInfo from "./components/PlanInfo";
import {AuthContext} from "../context/auth.context";

export const OrganizationList = () => {

    const { loading, request } = useHttp()
    const [dataState, setDataState] = useState(null)
    const [companies, setCompanies] = useState(null)
    const [companyName, setCompanyName] = useState(null)
    const [planName, setPlanName] = useState('classic')
    const [subscriptionPlans, setSubscriptionPlans] = useState(null)
    const auth = useContext(AuthContext)

    const changeHandler = event => {
        setCompanyName(event.target.value)
    }

    const selectHandler = event => {
        setPlanName(event.target.value.toLowerCase())
    }

    const getData = async () => {
        // const req = await request('/api/subscriptions', 'GET')
        const req = [{
            "_id": "607dd90a2fb5d52c4e0b0bb4",
            "name": "New Company 1",
            "subscriptionID": null
        }, {
            "_id": "607dd90a2fb5d52c4e0b0bb5",
            "name": "New Company 2",
            "subscriptionID": null
        }, {
            "_id": "607dd90a2fb5d52c4e0b0bb6",
            "name": "New Company 3",
            "subscriptionID": null
        }]
        setCompanies(req)
    }

    const getSubscriptionPlans = async () => {
        const plans = await request('/api/subscriptions', 'GET')
        setSubscriptionPlans(plans)
    }

    useEffect(async () => {
        if (!dataState) {
            await getData()
            await getSubscriptionPlans()
            setDataState(true)
        }
    }, [])

    const createCompanyHandler = async () => {
        try {
            if (companyName.length < 3) {
                console.log("Length of company name should be more then 3 symbols")
                return
            }
            const userId = auth.userId
            const req = await request('/api/companies', 'POST', { companyName, planName, userId })
        } catch (e) { }
    }

    if (!dataState) {
        return <Loader />
    }

    return (
        <div>
            <div className="background">
                <Header />
                <div className="container">
                    <div className="container-content">
                        <div className="list-container">
                            {companies.map((company) => (
                                <div key={company['_id']}>
                                    <CompanyItem
                                        data={company}
                                        loading={loading}
                                        // onClick={createCompanyHandler}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="company-creation-box">
                            <h1>Create New Company</h1>
                            <input
                                   placeholder="Enter company name"
                                   name="companyName"
                                   id="companyName"
                                   onChange={changeHandler}
                            />
                            <select onChange={selectHandler}>
                                <option defaultChecked>Classic</option>
                                <option>Pro</option>
                                <option>Gold</option>
                            </select>
                            { planName === 'classic' && <PlanInfo data={subscriptionPlans[0]}/>}
                            { planName === 'pro' && <PlanInfo data={subscriptionPlans[1]}/>}
                            { planName === 'gold' && <PlanInfo data={subscriptionPlans[2]}/>}
                            <button onClick={createCompanyHandler}>
                                Create company
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}