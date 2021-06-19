import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navigation from '../Login/Navigation'

function GetCustomer(props) {

    let initialCustomer = {}
    let [customer, setCustomer] = useState(initialCustomer)
    let [username, setusername] = useState(0)
    let [btnId, setBtnId] = useState(0)
 
    useEffect(() => {
        const URL = `http://localhost:9090/customer/getCustomer/${username}`;
        axios.get(URL).then((response) => {
            setCustomer(response.data)
            console.log(response.data)
        })
            .catch((error) => console.log(error.message));
    }, [btnId]);

    function handleBtnClick(event) {
        event.preventDefault()
        setBtnId(username)
    }

    return (

        <div>
            <Navigation/>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                        <h3 className="text-center w4-padding w2-xlarge w3-text-black">Get Customer</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label className="w4-padding w2-xlarge w3-text-white">Customer Username</label>
                                    <input className="form-control" placeholder="Enter Customer Id" name="username"
                                        value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>
                                <br />
                                <button onClick={handleBtnClick} className="btn btn-primary">Get Details</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row m-2">
                <table className="table table-bordered table-hover bg-dark text-light mt-5">
                    <thead className="table-dark mt-5">
                        <tr>
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Customer Mobile</th>
                            <th>Customer Dob</th>
                            <th>Customer Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            <tr>
                                <td>{customer.username}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.contactNo}</td>
                                <td>{customer.dob}</td>
                                <td>{customer.address}</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetCustomer;