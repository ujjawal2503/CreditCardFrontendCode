import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css"
import Navigation from "../Login/Navigation";

function GetCustomerCreditCard() {
    let initialCreditCard = [];
    let [creditCards, setCreditCards] = useState(initialCreditCard);
    let [username, setUserName] = useState(sessionStorage.getItem('username'));
    let [btnId, setBtnId] = useState(0)

    useEffect(() => {
        const URL = `http://localhost:9090/creditCard/getAllCreditCards/${username}`;
        axios
            .get(URL)
            .then((response) => {
                setCreditCards(response.data);
                console.log(response.data);
            })
            .catch((error) => console.log(error.message));
    }, [btnId]);


    function handleBtnClick() {
        setBtnId(username)
    }

    return (
        <div>
            <Navigation />
            <h1 className="text-center" style={{color:"black"}}>Enter to world of creditCard</h1>
            <hr />
          
           <div className="container">
            <table className="table table-dark table-bordered table-hover table-stripped">
                <thead>

                    <tr>
                        <th>Card_number</th>
                        <th>Bank_name</th>
                        <th>Card_type</th>
                        <th>Card_name</th>
                        <th>Credit_limit</th>
                        <th>CVV</th>
                        <th>Expiry_date</th>
                        <th>Used_limit</th>
                        <th>Username</th>

                    </tr>
                </thead>
                <tbody>
                    {creditCards.map(
                        creditCard =>
                            <tr key={creditCard.cardNumber}>
                                <td>{creditCard.cardNumber}</td>
                                <td>{creditCard.bankName}</td>
                                <td>{creditCard.cardType}</td>
                                <td>{creditCard.cardType}</td>
                                <td>{creditCard.creditLimit}</td>
                                <td>{creditCard.cvv}</td>
                                <td>{creditCard.expiryDate}</td>
                                <td>{creditCard.usedLimit}</td>
                                <td>{creditCard.username}</td>
                            </tr>)}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default GetCustomerCreditCard;