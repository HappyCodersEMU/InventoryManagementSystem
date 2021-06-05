import React, { useEffect, useState } from "react";
import { useHttp } from "./../../../hooks/http.hook";
import { Loader } from "./../GeneralComponents/Loader";
import './ProductComponents/TableProducts.css'

function SellList({ companyId }) {

    const { request } = useHttp()

    // Initial data
    const [transactions, setTransaction] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(async () => {
        const data = await request(`/api/transactions?companyId=${companyId}`, 'GET')
        setIsLoading(false)
        setTransaction(data)

    }, [])


    if (isLoading) {
        return <Loader />
    }
    if (transactions.length < 1) {
        return (
            "No records"
        )
    }
    return (
        <>
            <div className="table-wrap">
                <table className="table table-products">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((item) => (
                            <tr key={item.productCode}>
                                <td>{item.productCode}</td>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{new Date(item.date).toLocaleString()}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
        </>
    );
}

export default SellList;