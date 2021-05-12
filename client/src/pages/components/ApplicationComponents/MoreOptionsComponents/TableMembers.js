import React, {useEffect, useState} from "react";
import orderBy from "lodash";
import {Loader} from "../../GeneralComponents/Loader";
import './TableMembers.css'

function TableMembers({ companyId }) {

    const [data, setData] = useState(null)
    const [dataToDisplay, setDataToDisplay] = useState(null)
    const [searchString, setSearchString] = useState(null)
    const [dataState, setDataState] = useState(null)
    const [newDataState, setNewDataState] = useState(null)
    const [sortState, setSortState] = useState({
        sort: 'asc',
        sortKey: 'id',
    })
    const [temp, setTemp] = useState(false)

    const test = () => {
        console.log(data)
    }

    const getData = async () => {
        const req = []
        for (let i = 1; i <= 70; i++) {
            const abc = {
                "_id": `607dd90a2fb5d52c4e0b0bb1${i}`,
                "email": `${i}@yandex.ru`,
                "name": `Name${i}`,
                "surname": `Surname${i}`,
                "role": `role${i}`
            }
            req.push(abc)
        }
        if (temp === true) {
            const abc = {
                "_id": `607dd90a2fb5d52c4e0b0bb1KAVO`,
                "email": `kavo@yandex.ru`,
                "name": `kavo`,
                "surname": `kavo`,
                "role": `kavo`
            }
            req.push(abc)
        }
        setData(req)
        setDataToDisplay(req)
        setTemp(true)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    useEffect(async () => {
        if (newDataState === true) {
            await getData()
            setNewDataState(false)
        }
    }, [newDataState])

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
            return item['email'].toLowerCase().includes(search.toLowerCase())
                || item['name'].toLowerCase().includes(search.toLowerCase())
                || item['surname'].toLowerCase().includes(search.toLowerCase())
                || item['role'].toLowerCase().includes(search.toLowerCase())
        })
        setDataToDisplay(filteredData)
    }

    const changeHandler = event => {
        setSearchString(event.target.value)
    }

    if (!dataState) {
        return <Loader />
    }

    return (
        <>
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
                        <th onClick={e => onSort(e, 'email')}>
                            Email {sortState.sortKey === 'email' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'name')}>
                            Name {sortState.sortKey === 'name' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'surname')}>
                            Surname {sortState.sortKey === 'surname' ? <small>{sortState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'role')}>
                            Role {sortState.sortKey === 'role' ? <small>{sortState.sort}</small> : null}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataToDisplay.map((user) => (
                        <tr key={user._id}>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <button className="btn btn-outline-secondary btn-add-member"
            onClick={(e) => {setNewDataState(true)}}>
                Add New Member
            </button>
            <button className="btn btn-outline-secondary btn-add-member"
                    onClick={test}>
                test
            </button>
        </>
    );
}

export default TableMembers;