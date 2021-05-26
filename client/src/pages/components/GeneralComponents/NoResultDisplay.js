import React from 'react'
import './NoResultDisplay.css'

export const NoResultDisplay = ({ products, onReset }) => {
    return (
        <>
            <h1 className="no-result-display-text">No data found</h1>
            { products && <button className="btn btn-outline-dark no-result-display-btn" onClick={onReset}>Reset</button>}
        </>
    )
}