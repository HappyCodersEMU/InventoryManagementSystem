import React, { useEffect, useState } from "react";
import { useHttp } from "../../../../hooks/http.hook";
import { Loader } from "../../GeneralComponents/Loader";
import '../Modal.css'

const ModalAddMember = ({ companyId, setActive, setAddMemberTempData }) => {

    const { request } = useHttp()

    // Initial data
    const [roles, setRoles] = useState(null)

    // Initial data state
    const [dataState, setDataState] = useState(null)

    // Variables to create new member
    const [selectedRole, setSelectedRole] = useState(null)
    const [emailToAdd, setEmailToAdd] = useState(null)

    const getRoles = async () => {
        const req = await request(`/api/roles`, 'GET')
        setRoles(req)
    }

    useEffect(async () => {
        await getRoles()
        setDataState(true)
    }, [])

    const roleChangeHandler = (event) => {
        const selected = event.target.value
        if (selected === '*Role*') {
            setSelectedRole(null)
        } else {
            const role = roles.find((role) => {
                return role.roleName === selected
            })
            setSelectedRole(role._id)
        }
    }

    const emailChangeHandler = (event) => {
        setEmailToAdd(event.target.value)
    }

    const addHandler = async () => {
        try {
            const req = await request('/api/members', 'POST', { email: emailToAdd, companyId, roleId: selectedRole })
            setAddMemberTempData(req)
            setActive(false)
        } catch (e) {
            console.log("add member: ", e)
        }
    }

    const closeHandler = () => {
        setActive(false)
    }

    if (!dataState) {
        return <Loader />
    }

    return (
        <>
            <div className="modal">
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
                                <li>Email: <input onChange={emailChangeHandler} /></li>
                                <li>Role:&nbsp;
                                    <select id="categorySelector" className="btn btn-outline-secondary" onClick={roleChangeHandler}>
                                        <option defaultValue>*Role*</option>
                                        {roles.map((role) => (
                                            <option key={role._id}>{role.roleName}</option>
                                        ))}
                                    </select>
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={addHandler}>Add</button>
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