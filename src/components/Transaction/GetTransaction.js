import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"
import Navigation from "../Login/Navigation";
const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

function GetTransaction() {
    let initialTransaction = {};
    let [transaction, setTransaction] = useState(initialTransaction);
    let [transactionId, setTransactionId] = useState(0);
    let [btnId, setBtnId] = useState(0)

    useEffect(() => {
        const URL = `http://localhost:9090/transaction/getTransaction/${transactionId}`;
        axios
            .get(URL)
            .then((response) => {
                setTransaction(response.data);
                console.log(response.data);
            })
            .catch((error) => console.log(error.message));
    }, [btnId]);


    function handleBtnClick() {
        setBtnId(transactionId)
    }

    return (
        <div style={divStyle}>
            <Navigation />
            <div className="container">
           <h1 style={{color:"black"}}>Transaction details</h1>
            <hr />
            <div className="form-group container form-center" style={{divStyle}}>
                <label style={{color:"black"}}>Enter transaction id</label>
                <input
                    className="form-control"
                    type="number"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                />
                <button  onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button>
            </div>
            <hr />

            <table className="table table-stripped table-bordered table-hover table-dark"  >


                <tr>
                    <th>TransactionId</th>
                    <th>TransactionStatus</th>
                    <th>TransactionDate</th>
                    <th>TransactionTime</th>
                    <th>TransactionAmount</th>
                    <th>CreditCardNumber</th>

                </tr>
                <tr>
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.status}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.transactionTime}</td>
                    <td>{transaction.creditCardNumber}</td>
                </tr>

            </table>
        </div>
        </div>
    );
}

export default GetTransaction;