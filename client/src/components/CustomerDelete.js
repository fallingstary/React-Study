import React, { useState, useEffect } from "react";

function CustomerDelete(deleteProps) {
    const deleteCustomer = (id) => {
        console.log(deleteProps);
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'delete'
        });
        deleteProps.stateRefresh();
    }
    return (
        <button onClick={(e) => { deleteCustomer(deleteProps.id) }}>삭제</button>
    );

}

export default CustomerDelete;