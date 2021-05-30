import React, { useEffect, useState } from "react";
import orderBy from "lodash";
import { Loader } from "../../GeneralComponents/Loader";
import { Link } from "react-router-dom";
import { useHttp } from "../../../../hooks/http.hook";
import './TableProducts.css'
import { NoResultDisplay } from "../../GeneralComponents/NoResultDisplay";

function TableProducts({ companyId, setModalActive, setModalData }) {

    const { request } = useHttp()

    // Initial data
    const [products, setProducts] = useState(null)
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
        const products = await request('/api/products', 'GET')
        setProducts(products.products)

        setDataToDisplay(products.products)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    const onReset = () => {
        setDataToDisplay(products)
        setSortState({ sort: '', sortKey: '' })
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
        setDataToDisplay(products)
        const search = { searchString, categorySelector, subcategorySelector }
        if (!search.searchString && !search.categorySelector && !search.subcategorySelector) {
            setSortState({ sort: '', sortKey: '' })
            return
        }

        const categorisedData = products.filter(item => {
            if (search.categorySelector === null) { return item }
            if (search.subcategorySelector === null) {
                return item.category.name.toLowerCase().includes(search.categorySelector.toLowerCase())
            }
            return item.category.name.toLowerCase().includes(search.categorySelector.toLowerCase())
                && item.subcategory.name.toLowerCase().includes(search.subcategorySelector.toLowerCase())
        })

        const filteredData = categorisedData.filter(item => {

            if (search.searchString === null) { return item }
            return item['productCode'].toLowerCase().includes(search.searchString.toLowerCase())
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
        if (category === null || category === '*Category*') {
            setCategorySelector(null)
            setSubcategorySelector(null)
        } else {
            setCategorySelector(category)
            const arr = []
            subcategories.map((item) => {
                if (item.category.name === category) {
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

    const addToInventoryHandler = (item) => {
        setModalData(item)
        setModalActive(true)
    }

    if (!dataState) {
        return <Loader />
    }

    if (dataToDisplay.length === 0) {
        return (
            <NoResultDisplay products={!!products} onReset={onReset} />
        )
    }

    return (
        <>
            <div className="input-group mb-3 mt-3 search">
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

            <div className="input-group mb-3 mt-3 search-mobile">
                <div className="search-mobile-input">
                    <input
                        type="text"
                        className="form-control"
                        onChange={changeHandler}
                    />
                </div>

                <div className="search-mobile-selects">
                    <div className="input-group">
                        <select id="categorySelector" className="btn btn-outline-secondary" onChange={categoryChangeHandler} >
                            <option defaultValue>*Category*</option>
                            { categories.map(item => (
                                <option key={item._id}>{ item.name }</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select id="subcategorySelector" className="btn btn-outline-secondary" onChange={subcategoryChangeHandler} >
                            <option defaultValue>*Subcategory*</option>
                            { subcategorySelectOptionsArray !== null && subcategorySelectOptionsArray.map((item) => (
                                <option key={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="search-mobile-buttons">
                    <div className="input-group">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={onSearch} >Search
                        </button>
                    </div>
                    <div className="input-group">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={onReset} >Reset
                        </button>
                    </div>
                </div>

            </div>

            <div className="table-wrap">
                <table className="table table-products">
                    <thead>
                        <tr>
                        <th onClick={e => onSort(e, 'productCode')}>
                            Code {sortState.sortKey === 'productCode' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'name')}>
                            Name {sortState.sortKey === 'name' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'category.name')}>
                            Category {sortState.sortKey === 'categoryId.name' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'subcategory.name')}>
                            Subcategory {sortState.sortKey === 'subcategory.name' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th>

                        </th>
                    </tr>
                    </thead>
                <tbody>
                    {dataToDisplay.map((item) => (
                        <tr key={item._id}>
                            <td>{item.productCode}</td>
                            <td>{item.name}</td>
                            <td>{item.category.name}</td>
                            <td>{item.subcategory.name}</td>
                            <td>
                                <Link to={`/${companyId}/buy?${item.productCode}`} className="btn btn-outline-dark" >Buy</Link>
                                <button onClick={e => addToInventoryHandler(item)} className="btn btn-outline-dark" >Add</button>
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

export default TableProducts;