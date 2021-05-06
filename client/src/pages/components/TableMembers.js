import React, {useEffect, useState} from "react";
import _ from "lodash";
import {Loader} from "./Loader";

function TableMembers({ companyId }) {

    const [data, setData] = useState(null)
    const [dataToDisplay, setDataToDisplay] = useState(null)
    const [searchString, setSearchString] = useState(null)
    const [dataState, setDataState] = useState(null)
    const [searchState, setSearchState] = useState({
        sort: 'asc',
        sortKey: 'id',
    })

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
        setData(req)
        setDataToDisplay(req)
    }

    useEffect(async () => {
        await getData()
        setDataState(true)
    }, [])

    const onReset = () => {
        setDataToDisplay(data)
        // setSearchString('')
    }

    const onSort = (event, sortKey) => {
        const cloneData = dataToDisplay;
        const sortType = searchState.sort === 'asc' ? 'desc' : 'asc';
        const sortedData = _.orderBy(cloneData, sortKey, sortType);
        setSearchState({
            sort: sortType,
            sortKey
        })
        setDataToDisplay(sortedData)
    }

    const onSearch = () => {
        setDataToDisplay(data)
        const search = searchString
        if (!search) {
            return data
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
            <div className="table-scroll">
                <table className="table">
                    <thead>
                    <tr>
                        <th onClick={e => onSort(e, 'email')}>
                            Email {searchState.sortKey === 'email' ? <small>{searchState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'name')}>
                            Name {searchState.sortKey === 'name' ? <small>{searchState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'surname')}>
                            Surname {searchState.sortKey === 'surname' ? <small>{searchState.sort}</small> : null}
                        </th>
                        <th onClick={e => onSort(e, 'role')}>
                            Role {searchState.sortKey === 'role' ? <small>{searchState.sort}</small> : null}
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
            <button className="btn btn-outline-secondary">
                Add New Member
            </button>
        </>
    );
}

export default TableMembers;