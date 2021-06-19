import React, { useState, useEffect } from 'react'
import StatementService from '../../Services/StatementService';
import Navigation from '../Login/Navigation';
import Swal from 'sweetalert2'

const formStyle = {
    padding: "35px"
};

function GetStatement() {
    let initialStatement = {}
    let [statement, setStatement] = useState(initialStatement)
    let [sid, setSid] = useState('')
    let [btnId, setBtnId] = useState('')

    function handleBtnClick(event) {
        event.preventDefault()
        setBtnId(sid)
    }

    useEffect(() => {
        StatementService.getOneStatement(btnId)
            .then(res => {
                console.log(res)
                setStatement(res.data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Data has been retreived',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }, [btnId])

    return (
        <div>
            <br />
            <Navigation />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                        <h3 className="text-center">Get Statement</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Statement Id</label>
                                    <input className="form-control" placeholder="Enter Statement Id" name="sid"
                                        value={sid} onChange={(e) => setSid(e.target.value)} />
                                </div>
                                <br />
                                <button onClick={handleBtnClick} className="btn btn-outline-primary container col">Get Details</button>
                            </form>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="row m-2" style={formStyle}>
                <table className="table table-bordered border-dark table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Statement ID</th>
                            <th>Bill Amount</th>
                            <th>Billing Date</th>
                            <th>Due Amount</th>
                            <th>Due Date</th>
                            <th>Customer ID</th>
                            <th>Card Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{statement.statementId}</td>
                                <td>{statement.billAmount}</td>
                                <td>{statement.billingDate}</td>
                                <td>{statement.dueAmount}</td>
                                <td>{statement.dueDate}</td>
                                <td>{statement.customerId}</td>
                                <td>{statement.cardNumber}</td>

                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GetStatement
