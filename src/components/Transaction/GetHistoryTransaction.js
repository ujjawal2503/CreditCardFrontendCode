import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"
import Navigation from "../Login/Navigation";

function GetHistoryTransaction() {
    let initialTransaction = [];
    let [transactions, setTransactions] = useState(initialTransaction);
   let [number, setNumber] = useState(initialTransaction);
    let [btnId, setBtnId] = useState('')

    useEffect(() => {
        console.log(number)
        const URL = `http://localhost:9090/transaction/getHistoryOfTransaction/${number}`;
        axios
            .get(URL)
            .then((response) => {
                setTransactions(response.data);
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
            <div className="container">

                <h1 style={{color:"black"}}>Transaction detail by Card number </h1>
                <hr />
                <div className="form-group form-center" >
                <label>Enter Card number</label>
                <input
                    className="form-control"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                <button onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button>
            </div>
            <hr />

                <table className="table table-stripped table-bordered table-hover table-dark" style={{ backgroundColor: 'pink' }}>
                    <thead>

                        <tr>
                            <th>CreditCardNumber</th>
                            <th>TransactionId</th>
                            <th>TransactionStatus</th>
                            <th>TransactionDate</th>
                            <th>TransactionTime</th>
                            <th>TransactionAmount</th>


                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(
                            transaction =>
                                <tr key={transaction.transactionId}>
                                    <td>{transaction.creditCardNumber}</td>
                                    <td>{transaction.transactionId}</td>
                                    <td>{transaction.status}</td>

                                    <td>{transaction.transactionDate}</td>
                                    <td>{transaction.transactionTime}</td>
                                    <td>{transaction.amount}</td>

                                </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetHistoryTransaction;