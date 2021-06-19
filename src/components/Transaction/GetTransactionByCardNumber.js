import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"
import Navigation from "../Login/Navigation";

function GetTransactionByCardNumber() {
    let initialTransaction = [];
    let [transactions, setTransactions] = useState(initialTransaction);
    let [number, setNumber] = useState('');
    let [btnId, setBtnId] = useState('')

    useEffect(() => {
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
            <h1 style={{color:'black'}}>Transaction detail by Card number </h1>
            <hr />
            <div className="form-group form-center" >
                <label>Enter Card number</label>
                <input
                    className="form-control"
                    type="number"
                    value={number}
                   /// maxLength="12"
                    min="100000000000"
                    max="999999999999"
                    onChange={(e) => setNumber(e.target.value)}
                />
                <br/>
                <button onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button>
            </div>
         
          <div className="container">
            <table className="table table-stripped table-bordered table-hover table-dark">
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

export default GetTransactionByCardNumber;