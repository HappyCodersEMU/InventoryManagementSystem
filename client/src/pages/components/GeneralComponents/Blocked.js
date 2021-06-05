import React from 'react'
import { Link } from "react-router-dom";
import './Blocked.css'

export const Blocked = () => {
    return (
        <>
            <div className="blocked-container">
                <div className="blocked-wrap">
                    <h1>Blocked</h1>
                    <p>You don't belong to this organization</p>
                    <p className="blocked-link"><Link to='/orglist' >Choose your organization</Link></p>
                </div>
            </div>
        </>
    )
}