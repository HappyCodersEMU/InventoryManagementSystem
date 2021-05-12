import React from "react";
import TableMembers from "./TableMembers";

const ListMembers = ({ companyId }) => {

    return (
        <>
            <TableMembers companyId={ companyId } />
        </>
    );
}

export default ListMembers;