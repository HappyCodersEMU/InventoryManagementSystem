import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import { Loader } from "./components/GeneralComponents/Loader";

import Header from "./components/GeneralComponents/Header";
import CompanyItem from "./components/CompanyItem";
import PlanInfo from "./components/PlanInfo";

import clockIcon from "../public/icons/clock.png"
import './OrganizationList.css'

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
    const [successMsg, setSuccessMsg] = useState(null)

    const [clockState, setClockState] = useState(null)

    const [userData, setUserData] = useState(null)

    const logoutHandler = async () => {
        try {
            auth.logout()
        } catch (e) {}
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
        const user = await request(`/api/users/${auth.userId}`, 'GET')
        const companies = []

        members.map((member) => {
            member.company.subscriptionName = plans.find(plan => plan._id === member.company.subscription).name
            companies.push(member.company)
        })

        setUserData(user)
        setSubscriptionPlans(plans)
        setCompaniesToDisplay(companies)
    }

    const startClock = () => {

        if (clockState === null) {
            setInterval(() => {
                const now = new Date
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];
                const outputDate = now.getDate() + ' '
                    + monthNames[now.getMonth()] + ', '
                    + now.toLocaleTimeString()
                setClockState(outputDate)
            }, 1000)
        }
    }

    useEffect(async () => {
        if (!dataState) {
            await getData()
            startClock()
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
            setSuccessMsg('New company has been created')
            getData()
        } catch (e) { }
    }

    if (!dataState) {
        return <Loader />
    }

    // const test = () => { console.log(subscriptionPlans) }

    return (
        <div>
            <div className="background">
                <div className="background-colored"></div>
                <div className="background-gray"></div>
                <div className="content">
                    <Header userData={userData} />
                    <div className="container">

                        <div className="container-header">
                            <span className="clock"><img src={clockIcon} alt="clock" />{clockState}</span>
                            <div className="orglist-user-block">
                                <span>{userData.name} {userData.surname}</span><br />
                                <span onClick={logoutHandler} className="orglist-logout-btn">
                                    Log out
                                </span>
                            </div>
                        </div>
                        <div className="container-subheader"><span><i>Select your company</i></span></div>

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
                            <hr />
                        </div>


                        <div className="orglist-company-creation-wrap">
                            <h3>Create New Company</h3>
                            <div className="orglist-company-creation-box">
                                <div className="orglist-company-inputselect-wrap">
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
                                </div>

                                <div className="orglist-company-plan-info">
                                    {!planName && <div className="orglist-company-plan-info-data"></div>}
                                    {planName && planName !== '*Subscription Plan*' && <PlanInfo data={planInfoData} />}
                                </div>

                                <div className="orglist-company-create-handler">
                                    <button onClick={createCompanyHandler} className="orglist-company-create-btn">
                                        Create company
                                    </button>
                                    <div className="error-handler">{errorMsg}</div>
                                    <div className="error-handler success-handler">{successMsg}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}