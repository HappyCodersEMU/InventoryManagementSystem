import React, {useEffect, useState} from "react";
import orderBy from "lodash";
import {Loader} from "../../GeneralComponents/Loader";
import './TableMembers.css'
import {useHttp} from "../../../../hooks/http.hook";

function TableMembers({ companyId, setModalActive }) {

    const { request } = useHttp()

    // Initial data
    const [data, setData] = useState(null)

    // Initial data state
    const [dataState, setDataState] = useState(null)

    // Data that will be displayed for user (can be sorted, filtered)
    const [dataToDisplay, setDataToDisplay] = useState(null)

    // Variables that used to sort or filter dataToDisplay
    const [searchString, setSearchString] = useState(null)
    const [sortState, setSortState] = useState({
        sort: 'asc',
        sortKey: 'id',
    })


    const test = () => {

    }

    const getData = async () => {
        const req = await request(`/api/members?companyId=${companyId}`, 'GET')
        const memberRoles = null
        setData(req)
        setDataToDisplay(req)
    }

    const addMemberHandler = () => {
        setModalActive(true)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    const onReset = () => {
        setDataToDisplay(data)
        setSortState({ sort: '', sortKey: ''})
        setSearchString('')
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
        const search = searchString
        if (!search) {
            setSortState({ sort: '', sortKey: ''})
            return
        }
        const filteredData = data.filter(item => {
            return item.userID.email.toLowerCase().includes(search.toLowerCase())
                || item.userID.name.toLowerCase().includes(search.toLowerCase())
                || item.userID.surname.toLowerCase().includes(search.toLowerCase())
                || item.roleID.roleName.toLowerCase().includes(search.toLowerCase())
        })
        setDataToDisplay(filteredData)
    }

    const changeHandler = event => {
        setSearchString(event.target.value)
    }

    if (!dataState) {
        return <Loader />
    }

    if (dataToDisplay.length === 0) {
        return (
            <>
                <div>No data found</div>
                { data && <button onClick={onReset}>Reset</button>}
            </>
        )
    }

    return (
        <>
            {/*<button className="btn btn-outline-secondary btn-add-member"*/}
            {/*        onClick={test}>*/}
            {/*    test*/}
            {/*</button>*/}

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
            </div>
            <div className="table-wrap">
                <table className="table table-members">
                    <thead>
                    <tr>
                        <th onClick={e => onSort(e, 'userID.email')}>
                            Email {sortState.sortKey === 'userID.email' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'userID.name')}>
                            Name {sortState.sortKey === 'userID.name' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'userID.surname')}>
                            Surname {sortState.sortKey === 'userID.surname' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'roleID.roleName')}>
                            Role {sortState.sortKey === 'roleID.roleName' ? <small>{sortState.sort}</small> : null}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataToDisplay.map((user) => (
                        <tr key={user._id}>
                            <td>{user.userID.email}</td>
                            <td>{user.userID.name}</td>
                            <td>{user.userID.surname}</td>
                            <td>{user.roleID.roleName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <button className="btn btn-outline-secondary btn-add-member"
                    onClick={addMemberHandler}>
                Add New Member
            </button>
        </>
    );
}

export default TableMembers;