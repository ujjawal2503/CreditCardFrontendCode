import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Login/Navigation";

function GetCreditCard() {
  let initialCreditCard = {};
  let [creditCard, setCreditCard] = useState(initialCreditCard);
  let [cardNumber, setCardNumber] = useState();
  let [btnId, setBtnId] = useState(0)

  useEffect(() => {
    const URL = `http://localhost:9090/creditCard/getCreditCard/${cardNumber}`;
    axios
      .get(URL)
      .then((response) => {
        setCreditCard(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  }, [btnId]);


  function handleBtnClick() {
    setBtnId(cardNumber)
  }

  return (
    <div >
      <Navigation />
      <h1 className="text-center"style={{color:"black"}}> Enter to the world of CreditCard</h1>
      <hr />
      <br />
      <div className="form-group form-center container">
        <center>  <h3 >Enter the CreditCard number</h3> </center>
        <input
          className="form-control "
          value={cardNumber}
          maxLength={12}
          minLength={12}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="Enter the credit card number"
          required
        />
        <center>  <button onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button></center>
      </div>
      <hr />
     <div className="container">
      <table className="table table-dark table-bordered table-hover table-stripped">


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
        <tr>
          <td>{creditCard.cardNumber}</td>
          <td>{creditCard.bankName}</td>
          <td>{creditCard.cardType}</td>
          <td>{creditCard.cardName}</td>
          <td>{creditCard.creditLimit}</td>
          <td>{creditCard.cvv}</td>
          <td>{creditCard.expiryDate}</td>
          <td>{creditCard.usedLimit}</td>
          <td>{creditCard.username}</td>
        </tr>

      </table>
      </div>
    </div>
  );
}

export default GetCreditCard;