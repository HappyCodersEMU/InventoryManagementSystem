import React from "react";

const BuyList = () => {

    const test = () => {
        const search = window.location.search.replace('?', '')
    }

    return (
        <>
            BuyList
            <button onClick={test}>
                test
            </button>
        </>
    );
}

export default BuyList;