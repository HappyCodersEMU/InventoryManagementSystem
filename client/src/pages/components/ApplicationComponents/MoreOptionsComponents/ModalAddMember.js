import React, {useEffect, useState} from "react";
import '../Modal.css'
import {useHttp} from "../../../../hooks/http.hook";

const ModalAddMember = ({ companyId, active, setActive }) => {

    const { request } = useHttp()
    const [roles, setRoles] = useState(null)

    const getRoles = async () => {
        const req = await request(`/api/roles`, 'GET')

        setRoles(req)
    }

    useEffect(async () => {
        await getRoles()
    }, [])

    const test = () => {

    }

    const addHandler = () => {

    }

    const closeHandler = () => {
        setActive(false)
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
                                <li>CompanyID: {companyId}</li>
                                <li>Email<input /></li>
                                <li>
                                    <select></select>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={addHandler}>Confirm</button>
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

export default ModalAddMember;