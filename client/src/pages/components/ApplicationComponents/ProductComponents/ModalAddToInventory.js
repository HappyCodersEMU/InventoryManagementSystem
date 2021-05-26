import React, {useState} from "react";
import '../Modal.css'
import {useHttp} from "../../../../hooks/http.hook";

const ModalAddToInventory = ({companyId, active, setActive, modalData, setModalData }) => {

    const [quantityToAdd, setQuantityToAdd] = useState(0)

    const { request } = useHttp()
    const test = () => {
        console.log(quantityToAdd)
        console.log(companyId)
        console.log(modalData)
    }

    const quantityChangeHandler = event => {
        setQuantityToAdd(event.target.value)
    }

    const addToInventoryHandler = async () => {
        if (quantityToAdd >= 0) {
            const quantity = parseInt(quantityToAdd)
            const body = {companyId: companyId, productId: modalData._id, quantity: quantity}
            const req = await request('/api/inventories', 'POST', body)
            setActive(false)
        } else {
            console.log("Quantity can't be less then 0")
        }

    }

    const closeHandler = () => {
        setActive(false)
        setModalData(null)
    }

    return (
        <>
            <div className="modal">
                <button onClick={test}>Test</button>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add product to inventory</h2>
                        </div>
                        <div className="modal-body">
                            <ul>
                                <li>Product code: {modalData.productCode}</li>
                                <li>Product name: {modalData.name}</li>
                                <li>Product category: {modalData.categoryId.name}</li>
                                <li>Product subcategory: {modalData.subcategoryId.name}</li>
                            </ul>

                            <input placeholder="Enter quantity of product that you want to add" type="number" onChange={quantityChangeHandler}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={addToInventoryHandler}>Confirm</button>
                            <button type="button"
                                    className="btn btn-secondary"
                                    onClick={closeHandler}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddToInventory;