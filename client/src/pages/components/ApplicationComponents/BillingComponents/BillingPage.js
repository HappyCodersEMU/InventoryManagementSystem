import React, { useEffect, useState } from "react";
import orderBy from "lodash";
import { Loader } from "../../GeneralComponents/Loader";
import { useHttp } from "../../../../hooks/http.hook";
import './BillingPage.css'
import {NoResultDisplay} from "../../GeneralComponents/NoResultDisplay";
import plusIcon from "../../../../public/icons/plus.png"
import minusIcon from "../../../../public/icons/minus.png"

function BillingPage ({ companyId, setModalActive, setModalData }) {

    const { request } = useHttp()

    // Initial data
    const [inventory, setInventory] = useState(null)
    const [categories, setCategories] = useState(null)
    const [subcategories, setSubcategories] = useState(null)

    // Initial data state
    const [dataState, setDataState] = useState(null)

    // Data that will be displayed for user (can be sorted, filtered)
    const [dataToDisplay, setDataToDisplay] = useState(null)

    // States that used to sort or filter dataToDisplay
    const [searchString, setSearchString] = useState(null)
    const [categorySelector, setCategorySelector] = useState(null)
    const [subcategorySelector, setSubcategorySelector] = useState(null)
    const [subcategorySelectOptionsArray, setSubcategorySelectOptionsArray] = useState(null)
    const [sortState, setSortState] = useState({
        sort: 'asc',
        sortKey: 'id',
    })

    // Initial data
    const [cartData, setCartData] = useState([])
    const [finalErrMsg, setFinalErrMsg] = useState('')
    const [cartErrorMsg, setCartErrorMsg] = useState('')
    const [totalPriceToDisplay, setTotalPriceToDisplay] = useState(0)

    const getData = async () => {

        const categories = await request('/api/categories', 'GET')
        setCategories(categories.categories)
        const subcategories = await request('/api/subcategories', 'GET')
        setSubcategories(subcategories.subcategories)
        const inventory = await request(`/api/inventories?companyId=${companyId}`, 'GET')

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
            console.log(item)
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
        setSubcategorySelector(null)
        if (category === null || category === '*Category*')
        {
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

    const addToCart = item => {
        if (finalErrMsg !== '') { setFinalErrMsg('') }
        setCartErrorMsg('')
        if (item.quantity !== 0) {
            if (!cartData.find((cartItem) => (cartItem.productCode === item.productCode))) {
                const itemToAdd = {...item, cartQuantity: 1, price: 15.00}
                cartData.push(itemToAdd)
                setTotalPriceToDisplay(totalPriceToDisplay + itemToAdd.price)
            } else {
                const itemToChangeIndex = cartData.findIndex((cartItem) => (cartItem.productCode === item.productCode))
                if (cartData[itemToChangeIndex].quantity > cartData[itemToChangeIndex].cartQuantity) {
                    cartData[itemToChangeIndex].cartQuantity++
                    setTotalPriceToDisplay(totalPriceToDisplay + cartData[itemToChangeIndex].price)
                } else {
                    setCartErrorMsg("Maximum number of products")
                }
            }
        } else {
            setCartErrorMsg("Product is out of stock")
        }
    }

    const removeOneFromItem = item => {
        if (item.cartQuantity === 1) {
            const itemToChangeIndex = cartData.findIndex((cartItem) => (cartItem.productCode === item.productCode))
            setTotalPriceToDisplay(totalPriceToDisplay - cartData[itemToChangeIndex].price)
            cartData.splice(itemToChangeIndex, 1)
        }
        if (item.cartQuantity > 1) {
            const itemToChangeIndex = cartData.findIndex((cartItem) => (cartItem.productCode === item.productCode))
            cartData[itemToChangeIndex].cartQuantity--
            setTotalPriceToDisplay(totalPriceToDisplay - cartData[itemToChangeIndex].price)
        }
    }

    const finishCheckOut = () => {
        const arrToSend = []
        cartData.map((item) => {
            const obj = {
                inventoryProductId: item.inventoryId,
                quantity: item.cartQuantity,
                price: item.price * item.cartQuantity,
            }
            arrToSend.push(obj)
        })
        if (arrToSend.length > 0) {
            console.log(arrToSend)
        } else {
            setFinalErrMsg("Nothing to checkout")
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
        console.log(cartData)
    }

    return (
        <>
            {/*<button onClick={test}>*/}
            {/*    test*/}
            {/*</button>*/}

            <div className="billing-wrap">
                <div className="billing-inventory-table-wrap">
                    <h2>Inventory</h2>
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
                        <table className="table table-inventory">
                            <thead>
                            <tr>
                                {/*<th onClick={e => onSort(e, 'productCode')}>*/}
                                {/*    Code {sortState.sortKey === 'productCode' ? <small>{sortState.sort}</small> : null}*/}
                                {/*</th>*/}
                                <th onClick={e => onSort(e, 'productName')}>
                                    Name {sortState.sortKey === 'productName' ? <small>{sortState.sort}</small> : null}
                                </th>
                                <th onClick={e => onSort(e, 'categoryName')}>
                                    Category {sortState.sortKey === 'categoryName' ? <small>{sortState.sort}</small> : null}
                                </th>
                                <th onClick={e => onSort(e, 'subcategoryName')}>
                                    Subcategory {sortState.sortKey === 'subcategoryName' ? <small>{sortState.sort}</small> : null}
                                </th>
                                <th>

                                </th>
                                {/*<th onClick={e => onSort(e, 'quantity')}>*/}
                                {/*    Quantity {sortState.sortKey === 'quantity' ? <small>{sortState.sort}</small> : null}*/}
                                {/*</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {dataToDisplay.map((item) => (
                                <tr key={item.inventoryId}>
                                    {/*<td>{item.productCode}</td>*/}
                                    <td>{item.productName}</td>
                                    <td>{item.category.name}</td>
                                    <td>{item.subcategory.name}</td>
                                    {/*<td>{item.quantity}</td>*/}
                                    <td className="billing-table-button">
                                        <button onClick={event => addToCart(item)}><img src={plusIcon} alt="add"/></button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="billing-cart-wrap">
                    <h2>Cart</h2>
                    <span className="billing-cart-error">{cartErrorMsg}</span>
                    <div className="table-wrap">
                        <table className="table billing-cart-table">
                            <thead>
                            <tr>
                                {/*<th onClick={e => onSort(e, 'productCode')}>*/}
                                {/*    Code {sortState.sortKey === 'productCode' ? <small>{sortState.sort}</small> : null}*/}
                                {/*</th>*/}
                                <th>Name</th>
                                {/*<th>Category</th>*/}
                                {/*<th>Subcategory</th>*/}
                                <th>Quantity</th>
                                <th></th>
                                {/*<th onClick={e => onSort(e, 'quantity')}>*/}
                                {/*    Quantity {sortState.sortKey === 'quantity' ? <small>{sortState.sort}</small> : null}*/}
                                {/*</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {cartData.map((item) => (
                                <tr key={item.inventoryId}>
                                    {/*<td>{item.productCode}</td>*/}
                                    <td>{item.productName}</td>
                                    {/*<td>{item.category.name}</td>*/}
                                    {/*<td>{item.subcategory.name}</td>*/}
                                    <td>{item.cartQuantity}</td>
                                    <td className="billing-table-button">
                                        <button onClick={e => removeOneFromItem(item)}><img src={minusIcon} alt="remove"/></button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="orglist-company-create-handler">
                <div className="billing-total-price">${totalPriceToDisplay}</div>
                <button onClick={finishCheckOut} className="orglist-company-create-btn billing-checkout-btn">
                    Finish checkout
                </button>
                <div className="error-handler">{finalErrMsg}</div>
            </div>
        </>
    );
}

export default BillingPage;