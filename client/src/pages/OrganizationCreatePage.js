import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./components/GeneralComponents/Loader";
import PlanCard from "./components/PlanCard";
import { AuthContext } from "../context/auth.context";

export const OrganizationCreatePage = () => {

    const auth = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [dataState, setDataState] = useState(null)
    const [subscriptionPlans, setSubscriptionPlans] = useState(null)
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
            <div className="organization-container">
                <div className="organization-box">
                    <div className="organization-input-box">
                        <div className="organization-input-wrap">
                            <label>Name of Organization<input name="companyName" onChange={changeHandler} /></label>
                        </div>
                    </div>


                    <div className="organization-plan-cards-wrap">
                        {/* 
                            iterate over each subscription and pass it to PlanCard component.
                            <PlanCard /> will be rendered for each plan.
                        */}
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
                    <button onClick={logoutHandler}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    )
}