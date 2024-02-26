import React from "react";

function Customer(customer) {
    return (
        <div>
            <CustomerProfile
                id={customer.id}
                image={customer.image}
                name={customer.name}
            />
            <CustomerInfo
                birthday={customer.birthday}
                gender={customer.gender}
                job={customer.job}
            />
        </div>
    )
}

function CustomerProfile(customer) {
    return (
        <div>
            <img src={customer.image} alt="profile"></img>
            <h2>{customer.name}({customer.id})</h2>
        </div>
    )
}

function CustomerInfo(customer) {
    return (
        <div>
            <p>{customer.birthday}</p>
            <p>{customer.gender}</p>
            <p>{customer.job}</p>
        </div>
    )
}

export default Customer;