import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./components/GeneralComponents/Loader";
import { AuthContext } from "../context/auth.context";
import PlanCard from "./components/PlanCard";
import './OrganizationCreatePage.css'

export const OrganizationCreatePage = () => {

    const auth = useContext(AuthContext)
    const { loading, request } = useHttp()

    // Initial data
    const [subscriptionPlans, setSubscriptionPlans] = useState(null)
    // Initial data state
    const [dataState, setDataState] = useState(null)
    // Company Name for new organization
    const [companyName, setCompanyName] = useState('')

    const getData = async () => {
        const plans = await request('/api/subscriptions', 'GET')
        setSubscriptionPlans(plans)
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
            const req = await request('/api/companies', 'POST', { companyName, planName, userId })
            auth.login(auth.token, auth.userId, req.hasCompany)
        } catch (e) { }
    }

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) { }
    }

    if (!dataState) {
        return <Loader />
    }

    return (
        <div>
            <div className="organization-background">
                <div className="organization-container">
                    <div className="organization-box">
                        <div className="logout-wrap">
                            <div>*User e-mail*</div>
                            <button className="logout-btn" onClick={logoutHandler}>
                                Log out
                            </button>
                        </div>
                        <div className="organization-input-box">
                            <div className="organization-input-wrap">
                                <label className="organization-input-label" htmlFor="companyName" data-placeholder="">Enter company name</label>
                                <input className="organization-input-field" name="companyName" onChange={changeHandler} placeholder="Company name" />
                                <hr className="input-line" />
                            </div>
                        </div>

                        <div className="organization-plan-cards-wrap">
                            {subscriptionPlans.map((plan) => (
                                <div key={plan.name}>
                                    <PlanCard
                                        data={plan}
                                        loading={loading}
                                        onClick={createCompanyHandler}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}