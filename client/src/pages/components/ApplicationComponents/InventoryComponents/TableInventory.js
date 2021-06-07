import React, { useEffect, useState } from "react";
import { useHttp } from "../../../../hooks/http.hook";
import { Loader } from "../../GeneralComponents/Loader";
import { NoResultDisplay } from "../../GeneralComponents/NoResultDisplay";
import { IconArrowDown, IconArrowUp } from "../../GeneralComponents/Icons";
import orderBy from "lodash";
import './TableInventory.css'

function TableInventory({ companyId }) {

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
    // States for product creation

    const [productToAddCode, setProductToAddCode] = useState(null)
    const [productToAddName, setProductToAddName] = useState(null)
    const [productToAddQuantity, setProductToAddQuantity] = useState(0)
    const [productToAddPrice, setProductToAddPrice] = useState(1)
    const [productToAddCategory, setProductToAddCategory] = useState(null)
    const [productToAddSubcategory, setProductToAddSubcategory] = useState(null)
    const [addProductSubcategorySelectOptionsArray, setAddProductSubcategorySelectOptionsArray] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const [displayAddProduct, setDisplayAddProduct] = useState(false)
    const toggleAddProductComponent = () => {
        if (displayAddProduct) {
            setDisplayAddProduct(false)
        } else {
            setDisplayAddProduct(true)
        }
    }

    const addProductCategoryChangeHandler = event => {
        setAddProductSubcategorySelectOptionsArray(null)
        const category = event.target.value
        setProductToAddSubcategory(null)
        if (category === null || category === '*Category*') {
            setProductToAddCategory(null)
            setProductToAddSubcategory(null)
        } else {
            setProductToAddCategory(category)
            const arr = []
            subcategories.map((item) => {
                if (item.category.name === category) {
                    arr.push(item)
                }
            })
            setAddProductSubcategorySelectOptionsArray(arr)
        }
    }

    const addProductSubcategoryChangeHandler = event => {
        if (event.target.value === '*Subcategory*') {
            setProductToAddSubcategory(null)
        } else {
            setProductToAddSubcategory(event.target.value)
        }
    }


    const addProductHandler = async () => {

        setErrorMsg('')

        let tempQty = parseInt(productToAddQuantity)
        let tempPrice = parseInt(productToAddPrice)

        if (productToAddCode === null || productToAddCode.length === 0
            || productToAddName === null || productToAddName.length === 0
            || productToAddCategory === null
            || productToAddSubcategory === null) {
            setErrorMsg("Please, fill the fields")
            console.log("Please, fill the fields")
            return
        }

        if (isNaN(tempQty)) {
            tempQty = 0
        }

        if (isNaN(tempPrice)) {
            tempPrice = 1
        }

        if (tempQty < 0) {
            setErrorMsg("Quantity can't be less then 0")
            return
        }

        if (tempPrice < 0) {
            setErrorMsg("Price can't be less then 0")
            return
        }

        const categoryId = categories.find((category) => {
            return category.name === productToAddCategory
        })._id

        const subcategoryId = subcategories.find((subcategory) => {
            return subcategory.name === productToAddSubcategory
        })._id

        if (!categoryId || !subcategoryId) {
            setErrorMsg("Something wrong with categories or subcategories")
            return
        }

        const productToAddJSON = {
            productCode: productToAddCode,
            name: productToAddName,
            price: tempPrice,
            categoryId: categoryId,
            subcategoryId: subcategoryId,
            companyId: companyId,
            quantity: tempQty,
        }
        const req = await request('/api/inventories/create', 'POST', productToAddJSON)
        setSuccessMsg('Product has been added')
        await getData()
    }

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
        setDataToDisplay(inventory)
        const search = { searchString, categorySelector, subcategorySelector }
        if (!search.searchString && !search.categorySelector && !search.subcategorySelector) {
            setSortState({ sort: '', sortKey: '' })
            return
        }

        const categorisedData = inventory.filter(item => {
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
        setProductToAddSubcategory(null)
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

    if (!dataState) {
        return <Loader />
    }

    if (dataToDisplay.length === 0) {
        return (
            <NoResultDisplay products={!!inventory} onReset={onReset} />
        )
    }

    // const test = () => { console.log(inventory) }

    return (
        <>
            {/*<button onClick={test}>*/}
            {/*    test*/}
            {/*</button>*/}

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
                        {categories.map(item => (
                            <option key={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-group-append">
                    <select id="subcategorySelector" className="btn btn-outline-secondary" onChange={subcategoryChangeHandler} >
                        <option defaultValue>*Subcategory*</option>
                        {subcategorySelectOptionsArray !== null && subcategorySelectOptionsArray.map((item) => (
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
                            {categories.map(item => (
                                <option key={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select id="subcategorySelector" className="btn btn-outline-secondary" onChange={subcategoryChangeHandler} >
                            <option defaultValue>*Subcategory*</option>
                            {subcategorySelectOptionsArray !== null && subcategorySelectOptionsArray.map((item) => (
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
                            <th onClick={e => onSort(e, 'price')}>
                                Price {sortState.sortKey === 'price' ? <small>{sortState.sort}</small> : null}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataToDisplay.map((item) => (
                            <tr key={item.inventoryId}>
                                <td>{item.productCode}</td>
                                <td>{item.productName}</td>
                                <td>{item.category.name}</td>
                                <td>{item.subcategory.name}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div class='text-center row mt-5' onClick={() => { toggleAddProductComponent() }}>
                <h2>Add Product to Inventory</h2>
                {displayAddProduct
                    ? <IconArrowUp height="50" width="50" color="green" />
                    : <IconArrowDown height="50" width="50" color="green" />}
            </div>

            <div className={displayAddProduct ? "" : "d-none"}>
                <div className="add-product-wrap ">
                    <div className="add-product-inputs-wrap">
                        <div className="add-product-input-wrap">
                            <input
                                className="add-product-input-field"
                                placeholder="Product code"
                                name="productCode"
                                id="productCode"
                                onChange={e => setProductToAddCode(e.target.value)}
                            />
                            <hr className="input-line" />
                        </div>
                        <div className="add-product-input-wrap">
                            <input
                                className="add-product-input-field"
                                placeholder="Product name"
                                name="productName"
                                id="productName"
                                onChange={e => setProductToAddName(e.target.value)}
                            />
                            <hr className="input-line" />
                        </div>
                        <div className="add-product-input-wrap">
                            <input
                                className="add-product-input-field"
                                placeholder="Quantity"
                                type="number"
                                name="quantity"
                                id="quantity"
                                onChange={e => setProductToAddQuantity(e.target.value)}
                            />
                            <hr className="input-line" />
                        </div>
                        <div className="add-product-input-wrap">
                            <input
                                className="add-product-input-field"
                                placeholder="Price"
                                type="number"
                                name="price"
                                id="price"
                                onChange={e => setProductToAddPrice(e.target.value)}
                            />
                            <hr className="input-line" />
                        </div>
                    </div>

                    <div className="add-product-selectors-wrap row">
                        <div className="input-group">
                            <select id="categorySelector"
                                className="btn btn-outline-secondary col-sm m-2"
                                onChange={addProductCategoryChangeHandler} >
                                <option defaultValue>*Category*</option>
                                {categories.map(item => (
                                    <option key={item._id}>{item.name}</option>
                                ))}
                            </select>
                            <select id="subcategorySelector"
                                className="btn btn-outline-secondary col-sm m-2"
                                onChange={addProductSubcategoryChangeHandler} >
                                <option defaultValue>*Subcategory*</option>
                                {addProductSubcategorySelectOptionsArray !== null && addProductSubcategorySelectOptionsArray.map((item) => (
                                    <option key={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="add-product-handler">
                    <button type="button" onClick={addProductHandler} class="btn btn-primary btn-lg text-white">Add Product</button>
                    <div className="error-handler">{errorMsg}</div>
                    <div className="error-handler success-handler">{successMsg}</div>
                </div>
            </div>
        </>
    );
}

export default TableInventory;