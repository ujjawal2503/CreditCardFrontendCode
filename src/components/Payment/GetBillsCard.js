import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"
import Navigation from "../Login/Navigation";
function GetBillsCard() {
    let initialStatement = [];
    let [statements, setStatements] = useState(initialStatement);
    let [number, setNumber] = useState('');
    let [btnId, setBtnId] = useState('')

    useEffect(() => {
        const URL = `http://localhost:9090/payment/pendingBills/${number}`;
        axios
            .get(URL)
            .then((response) => {
                setStatements(response.data);
                console.log(response.data);
            })
            .catch((error) => console.log(error.message));
    }, [btnId]);


    function handleBtnClick() {
        setBtnId(number)
    }

    return (
        <div>
            <Navigation />
            <div className="container" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                <h1 >Pending Bill Card</h1>
                <hr />
                <div className="form-group form-center" >
                    <label >Enter Card number</label>
                    <input
                        className="form-control"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                    <button  onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button>
                </div>
                <hr />

                <table className="table table-stripped table-bordered table-hover table-dark" style={{ backgroundColor: 'pink' }}>
                    <thead>

                        <tr>
                            <th>Statement ID</th>
                            <th>Bill Amount</th>
                            <th>Billing Date</th>
                            <th>Due Amount</th>
                            <th>Due Date</th>
                            <th>User Name</th>
                            <th>Card Number</th>


                        </tr>
                    </thead>
                    <tbody>
                        {statements.map(
                            statement =>
                                <tr key={statement.statementId}>
                                    <td>{statement.statementId}</td>
                                    <td>{statement.billAmount}</td>
                                    <td>{statement.billingDate}</td>
                                    <td>{statement.dueAmount}</td>
                                    <td>{statement.dueDate}</td>
                                    <td>{statement.customerId}</td>
                                    <td>{statement.cardNumber}</td>

                                </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetBillsCard;