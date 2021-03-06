import React, {useCallback, useEffect, useState} from "react";
import orderBy from "lodash";
import { Loader } from "../../GeneralComponents/Loader";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function TableBuy({ companyId, setModalActive, setModalData }) {

    // Initial data
    const [data, setData] = useState(null)
    const [categories, setCategories] = useState(null)
    const [subcategories, setSubcategories] = useState(null)

    // Initial data state
    const [dataState, setDataState] = useState(null)

    // Data that will be displayed for user (can be sorted, filtered)
    const [dataToDisplay, setDataToDisplay] = useState(null)

    // Variables that used to sort or filter dataToDisplay
    const [searchString, setSearchString] = useState(null)
    const [categorySelector, setCategorySelector] = useState(null)
    const [subcategorySelector, setSubcategorySelector] = useState(null)
    const [subcategorySelectOptionsArray, setSubcategorySelectOptionsArray] = useState(null)
    const [sortState, setSortState] = useState({
        sort: 'asc',
        sortKey: 'id',
    })

    // Popup window

    const buyHandler = (_id, code, name, seller, quantity, price) => {
        setModalData({_id, code, name, seller, quantity, price})
        setModalActive(true)
    }

    const test = () => {
    }

    const getData = async () => {
        const req = []
        let count = 1;
        for (let i = 1; i <= 15; i++) {
            for (let j = 1; j <= 2; j++) {
                const abc = {
                    "_id": `607dd90a2fb5d52c4e0b0bb1${count}`,
                    "code": `code${count}`,
                    "name": `Name${count}`,
                    "seller": `company${i}`,
                    "quantity": `${count}`,
                    "price": `${count}`
                }
                req.push(abc)
                count++;
            }
        }
        await setData(req)
        await setDataToDisplay(req)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    useEffect(() => {
        const search = window.location.search
        setSearchString(search.replace('?', ''))
        onSearch()
    },[dataState])

    const onReset = () => {
        setDataToDisplay(data)
        setSortState({ sort: '', sortKey: ''})
        // setSearchString('')
    }

    const onSort = (event, sortKey) => {
        const cloneData = dataToDisplay;
        const sortType = sortState.sort === 'asc' ? 'desc' : 'asc';
        const sortedData = orderBy.orderBy(cloneData, sortKey, sortType);
        setSortState({
            sort: sortType,
            sortKey
        })
        setDataToDisplay(sortedData)
    }

    const onSearch = () => {
        setDataToDisplay(data)
        const search = { searchString, categorySelector, subcategorySelector }
        if (!search.searchString && !search.categorySelector && !search.subcategorySelector) {
            setSortState({ sort: '', sortKey: ''})
            return
        }

        const categorisedData = data.filter(item => {
            if (search.categorySelector === null) { return item }
            if (search.subcategorySelector === null) {
                return item['category'].toLowerCase().includes(search.categorySelector.toLowerCase())
            }
            return item['category'].toLowerCase().includes(search.categorySelector.toLowerCase())
                && item['subcategory'].toLowerCase().includes(search.subcategorySelector.toLowerCase())
        })

        const filteredData = categorisedData.filter(item => {

            if (search.searchString === null) { return item }
            return item['code'].toLowerCase().includes(search.searchString.toLowerCase())
                || item['name'].toLowerCase().includes(search.searchString.toLowerCase())
        })

        setDataToDisplay(filteredData)
    }

    const changeHandler = event => {
        setSearchString(event.target.value)
    }

    const categoryChangeHandler = event => {
        setSubcategorySelectOptionsArray(null)
        const category = event.target.value
        if (category === null || category === '*Category*')
        {
            setCategorySelector(null)
            setSubcategorySelector(null)
        } else {
            setCategorySelector(category)
            const arr = []
            data.map((item) => {  // CHANGE data.map TO subcategory.map AFTER getData FUNCTION IS IMPLEMENTED
                if (item.category === category) {
                    arr.push(item)
                }
            })
            setSubcategorySelectOptionsArray(arr)
        }
    }

    const subcategoryChangeHandler = event => {
        if (event.target.value === '*Subcategory*') {
            setSubcategorySelector(null)
        } else {
            setSubcategorySelector(event.target.value)
        }
    }

    if (!dataState) {
        return <Loader />
    }

    return (
        <>
            {/*<button onClick={test}>*/}
            {/*    test*/}
            {/*</button>*/}


            <h1>Buy Table</h1>
            <div className="input-group mb-3 mt-3">
                <div className="input-group-prepend">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={onSearch} >Search
                    </button>
                </div>
                <div className="input-group-prepend">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={onReset} >Reset
                    </button>
                </div>
                <input
                    type="text"
                    className="form-control"
                    onChange={changeHandler}
                />
                <div className="input-group-append">
                    <select id="categorySelector" className="btn btn-outline-secondary" onChange={categoryChangeHandler} >
                        <option defaultValue>*Category*</option>
                        <option>category1</option>
                        <option>category2</option>
                    </select>
                </div>
                <div className="input-group-append">
                    <select id="subcategorySelector" className="btn btn-outline-secondary" onChange={subcategoryChangeHandler} >
                        <option defaultValue>*Subcategory*</option>
                        { subcategorySelectOptionsArray !== null && subcategorySelectOptionsArray.map((item) => (
                            <option key={item._id}>{item.subcategory}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="table-wrap">
                <table className="table">
                    <thead>
                    <tr>
                        <th onClick={e => onSort(e, 'code')}>
                            Code {sortState.sortKey === 'code' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'name')}>
                            Name {sortState.sortKey === 'name' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'seller')}>
                            Seller {sortState.sortKey === 'seller' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Price
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataToDisplay.map((item) => (
                        <tr key={item._id}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.seller}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={e => buyHandler(
                                        item._id,
                                        item.code,
                                        item.name,
                                        item.seller,
                                        item.quantity,
                                        item.price
                                    )}
                                className="btn btn-outline-dark">
                                    Buy
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <hr />
        </>
    );
}

export default TableBuy;