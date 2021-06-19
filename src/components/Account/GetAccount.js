import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Login/Navigation";

function GetAccount() {
  let initialAccount = {};
  let [account, setAccount] = useState(initialAccount);
  let [accountId, setAccountId] = useState(0);
  let [btnId,setBtnId]=useState(0)

  useEffect(() => {
    const URL = `http://localhost:9090/accounts/getAccount/${accountId}`;
    axios
      .get(URL)
      .then((response) => {
        setAccount(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error.message));
  },[btnId]);


  function handleBtnClick()
  {
      setBtnId(accountId)
  }

  return (
    <div>
      <Navigation/>
      <div className="container" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }} >
      <h4>Account details</h4>
      <hr />
      <div className="form-group">
        <label>Enter the account number</label>
        <input 
          className="form-control"
          value={accountId}
          onChange={(e) =>setAccountId(e.target.value)}
        />
        <button onClick={handleBtnClick} className='btn btn-success mt-2'>Get Details</button>
      </div>
      <hr/>
      
      <div className="row m-2" style={{backgroundColor:'white'}}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Account Name</th>
                                <th>Balance</th>
                                <th>Account Type</th>
             
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                <tr>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.accountName}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.type}</td>
                                    
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
        </div>
        </div>
  );
}

export default GetAccount;