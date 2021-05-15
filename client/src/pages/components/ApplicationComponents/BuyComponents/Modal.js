import React from "react";
import './Modal.css'

const Modal = ({ active, setActive, modalData, setModalData }) => {

    const test = () => {
        console.log(modalData)
    }

    const buyHandler = () => {

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
                            <h5 className="modal-title">Buy verification</h5>
                            <button type="button" className="close" aria-label="Close">
                                <span aria-hidden="true" onClick={closeHandler}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul>
                                <li>Product Code: ${modalData.code}</li>
                                <li>Product Name: ${modalData.name}</li>
                                <li>Company-seller: ${modalData.seller}</li>
                                <li>Quantity: ${modalData.quantity}</li>
                                <li>Price: ${modalData.price}</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={buyHandler}>Confirm</button>
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

export default Modal;