import React, {useContext, useEffect, useState} from 'react'
import Header from "./components/GeneralComponents/Header";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "./components/GeneralComponents/Loader";
import CompanyItem from "./components/CompanyItem";
import PlanInfo from "./components/PlanInfo";
import {AuthContext} from "../context/auth.context";

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

    const test = () => {
        console.log(subscriptionPlans)
    }

    const changeHandler = event => {
        setCompanyName(event.target.value)
    }

    const selectHandler = event => {
        const selectedPlanName = event.target.value
        const selectedPlanData = subscriptionPlans.find((item) => {
            return item.name === selectedPlanName
        })

        setPlanName(selectedPlanName)
        setPlanInfoData(selectedPlanData)
    }

    const getData = async () => {
        const userID = auth.userId
        const data = await request(`/api/members?userId=${userID}`, 'GET')
        const companies = await request(`/api/companies`, 'GET')
        const plans = await request('/api/subscriptions', 'GET')
        const arr = []

        data.map((item) => {
            companies.map((company) => {
                if (company._id === item.companyID._id) {
                    arr.push(company)
                }
            })
        })

        setSubscriptionPlans(plans)
        setCompaniesToDisplay(arr)
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
                console.log("Length of company name should be more then 3 symbols")
                return
            }
            if (!planName || planName === '*Subscription Plan*') {
                console.log("Choose the subscription plan")
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
                <button onClick={test}>
                    Test
                </button>
                <div className="container">
                    <div className="list-container">
                        {companiesToDisplay.map((company) => (
                            <div key={company['_id']}>
                                <CompanyItem
                                    data={company}
                                    loading={loading}
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
                        <select onChange={selectHandler} >
                            <option defaultChecked>*Subscription Plan*</option>
                            { subscriptionPlans && subscriptionPlans.map((item) => (
                                <option key={item._id}>{item.name}</option>
                            ))}
                        </select>
                        { planName && planName !== '*Subscription Plan*' && <PlanInfo data={planInfoData}/>}
                        <button onClick={createCompanyHandler}>
                            Create company
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}