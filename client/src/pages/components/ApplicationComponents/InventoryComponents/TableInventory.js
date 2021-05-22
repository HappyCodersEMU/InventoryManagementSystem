import React, { useEffect, useState } from "react";
import orderBy from "lodash";
import { Loader } from "../../GeneralComponents/Loader";
import { Link} from "react-router-dom";
import { useHttp } from "../../../../hooks/http.hook";
// import './TableProducts.css'
import {NoResultDisplay} from "../../GeneralComponents/NoResultDisplay";

function TableInventory ({ companyId, setModalActive, setModalData }) {

    const { request } = useHttp()

    // Initial data
    const [inventory, setInventory] = useState(null)
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

    const getData = async () => {

        const categories = await request('/api/categories', 'GET')
        setCategories(categories.categories)
        const subcategories = await request('/api/subcategories', 'GET')
        setSubcategories(subcategories.subcategories)
        const inventory = await request(`/api/inventories/companies/${companyId}`)

        inventory.products.forEach((item) => {
            categories.categories.find((category) => {
                if (category._id === item.categoryId) {
                    item.categoryName = category.name
                    subcategories.subcategories.find((subcategory) => {
                        if (subcategory._id === item.subcategoryId) {
                            return item.subcategoryName = subcategory.name
                        }
                    })
                }
            })
        })

        setInventory(inventory.products)

        setDataToDisplay(inventory.products)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    const onReset = () => {
        setDataToDisplay(inventory)
        setSortState({ sort: '', sortKey: ''})
        setSearchString('')
        setCategorySelector(null)
        setSubcategorySelector(null)
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
        setDataToDisplay(inventory)
        const search = { searchString, categorySelector, subcategorySelector }
        if (!search.searchString && !search.categorySelector && !search.subcategorySelector) {
            setSortState({ sort: '', sortKey: ''})
            return
        }

        const categorisedData = inventory.filter(item => {
            if (search.categorySelector === null) { return item }
            if (search.subcategorySelector === null) {
                return item.categoryName.toLowerCase().includes(search.categorySelector.toLowerCase())
            }
            return item.categoryName.toLowerCase().includes(search.categorySelector.toLowerCase())
                && item.subcategoryName.toLowerCase().includes(search.subcategorySelector.toLowerCase())
        })

        const filteredData = categorisedData.filter(item => {

            if (search.searchString === null) { return item }
            return item['productCode'].toLowerCase().includes(search.searchString.toLowerCase())
                || item['productName'].toLowerCase().includes(search.searchString.toLowerCase())
                || item['quantity'].toString().toLowerCase().includes(search.searchString.toLowerCase())
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
            subcategories.map((item) => {
                if (item.categoryId.name === category) {
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

    if (dataToDisplay.length === 0) {
        return (
            <NoResultDisplay products={!!inventory} onReset={onReset} />
        )
    }

    const test = () => {
        console.log(inventory)
    }

    return (
        <>
            <button onClick={test}>
                test
            </button>



            <h1>Products</h1>
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
                        { categories.map(item => (
                            <option key={item._id}>{ item.name }</option>
                        ))}
                    </select>
                </div>
                <div className="input-group-append">
                    <select id="subcategorySelector" className="btn btn-outline-secondary" onChange={subcategoryChangeHandler} >
                        <option defaultValue>*Subcategory*</option>
                        { subcategorySelectOptionsArray !== null && subcategorySelectOptionsArray.map((item) => (
                            <option key={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="table-wrap">
                <table className="table table-products">
                    <thead>
                    <tr>
                        <th onClick={e => onSort(e, 'productCode')}>
                            Code {sortState.sortKey === 'productCode' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'productName')}>
                            Name {sortState.sortKey === 'productName' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'categoryName')}>
                            Category {sortState.sortKey === 'categoryName' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'subcategoryName')}>
                            Subcategory {sortState.sortKey === 'subcategoryName' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'quantity')}>
                            Quantity {sortState.sortKey === 'quantity' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataToDisplay.map((item) => (
                        <tr key={item.inventoryId}>
                            <td>{item.productCode}</td>
                            <td>{item.productName}</td>
                            <td>{item.categoryName}</td>
                            <td>{item.subcategoryName}</td>
                            <td>{item.quantity}</td>

                            <td>

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

export default TableInventory;