import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Navigation from '../Login/Navigation'
function GetPayment() {
    let initialPayment = []
    let [payment, setPayment] = useState(initialPayment)
    let [pid, setPid] = useState(0)
    let [btnId, setBtnId] = useState(0)



    useEffect(() => {
        const URL = `http://localhost:9090/payment/getPayment/${pid}`;
        axios.get(URL).then((response) => {
            setPayment(response.data)
            console.log(response.data)
        })
            .catch((error) => console.log(error.message));
    }, [btnId])

    function handleBtnClick(event) {
        event.preventDefault()
        setBtnId(pid)
    }

    return (
        <div>
            <Navigation />
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                        <h3 className="text-center">Get Payment</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label className="text center">Payment Id</label>
                                    <input className="form-control" placeholder="Enter Statement Id" name="sid"
                                        value={pid} onChange={(e) => setPid(e.target.value)} />
                                </div>
                                <br />
                                <center>
                                    <button onClick={handleBtnClick} className="btn btn-primary">Get Details</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <table className="table table-bordered border-dark table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Amount</th>
                            <th>PaidDate</th>
                            <th>PaidTime</th>
                            <th>PaymentId</th>
                            <th>PaymentMethod</th>
                            <th>CardNumber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{payment.amount}</td>
                                <td>{payment.paidDate}</td>
                                <td>{payment.paidTime}</td>
                                <td>{payment.paymentId}</td>
                                <td>{payment.paymentMethod}</td>
                                <td>{payment.card}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetPayment
