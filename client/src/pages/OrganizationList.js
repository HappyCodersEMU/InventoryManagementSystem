import React, { useContext, useEffect, useState } from 'react'
import Header from "./components/GeneralComponents/Header";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./components/GeneralComponents/Loader";
import CompanyItem from "./components/CompanyItem";
import PlanInfo from "./components/PlanInfo";
import { AuthContext } from "../context/auth.context";
import './OrganizationList.css'
import { Link } from "react-router-dom";

export const OrganizationList = () => {

    const auth = useContext(AuthContext)
    const { loading, request } = useHttp()

    // Initial data
    const [companiesToDisplay, setCompaniesToDisplay] = useState([])
    const [subscriptionPlans, setSubscriptionPlans] = useState(null)

    // Initial data state
    const [dataState, setDataState] = useState(null)

    // Plan info to display
    const [planInfoData, setPlanInfoData] = useState(null)

    // Variables to create new company
    const [companyName, setCompanyName] = useState(null)
    const [planName, setPlanName] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    const test = () => {
        console.log(subscriptionPlans)
    }

    const changeHandler = event => {
        setCompanyName(event.target.value)
    }

    const selectHandler = event => {
        const selectedPlanName = event.target.value
        if (selectedPlanName === '*Subscription Plan*') {
            setPlanName(null)
            return
        }
        const selectedPlanData = subscriptionPlans.find((item) => {
            return item.name === selectedPlanName
        })

        setPlanName(selectedPlanName)
        setPlanInfoData(selectedPlanData)
    }

    const getData = async () => {
        const userId = auth.userId
        const members = await request(`/api/members?userId=${userId}`, 'GET')
        const plans = await request('/api/subscriptions', 'GET')
        const companies = []

        members.map((member) => {
            member.company.subscriptionName = plans.find(plan => plan._id === member.company.subscription).name
            companies.push(member.company)
        })

        setSubscriptionPlans(plans)
        setCompaniesToDisplay(companies)
    }

    useEffect(async () => {
        if (!dataState) {
            await getData()
            setDataState(true)
        }
    }, [])

    const createCompanyHandler = async () => {
        try {
            if (!companyName || companyName.length < 3) {
                setErrorMsg('Length of company name should be more then 3 symbols')
                return
            }
            if (!planName || planName === '*Subscription Plan*') {
                setErrorMsg('Choose the subscription plan')
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
                    <div className="orglist-container">
                        <div className="orglist-company-list">
                            {companiesToDisplay.map((company) => (
                                <div key={company['_id']}>
                                    <CompanyItem
                                        data={company}
                                        loading={loading}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="orglist-company-creation-wrap">
                        <div className="orglist-company-creation-box">
                            <h1>Create New Company</h1>
                            <div className="orglist-company-input-wrap">
                                <label className="orglist-company-input-label" htmlFor="companyName" data-placeholder="">Enter company name</label>
                                <input
                                    className="orglist-company-input-field"
                                    placeholder="Company name"
                                    name="companyName"
                                    id="companyName"
                                    onChange={changeHandler}
                                />
                                <hr className="input-line" />
                            </div>
                            <div className="orglist-company-select-wrap">
                                <label className="orglist-company-select-label" htmlFor="planSelector" data-placeholder="">Select your plan</label>
                                <select onChange={selectHandler} name="planSelector" className="orglist-company-select-field" >
                                    <option defaultChecked>*Subscription Plan*</option>
                                    {subscriptionPlans && subscriptionPlans.map((item) => (
                                        <option key={item._id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            {!planName && <div className="orglist-company-plan-info"></div>}
                            {planName && planName !== '*Subscription Plan*' && <PlanInfo data={planInfoData} />}
                            <button onClick={createCompanyHandler} className="orglist-company-create-btn">
                                Create company
                            </button>
                            <div className="error-handler">{errorMsg}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}