import React, { Component } from "react";
import { Router } from "react-router";
import Service from "../../Services/Service";
import Navigation from "../Login/Navigation";
import swal from 'sweetalert';
import Swal from 'sweetalert2'

const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
var dates = new Date();
var date = dates.getDate();
date=date;
if (date < 10) {
    date = '0' + date;
}
var month = dates.getMonth() + 1;
if (month < 10) {
    month = '0' + month;
}

var year = dates.getFullYear();
var minDate = year + "-" + month + "-" + date;
var maxDate = year + "-" + month + "-" + date;

class AddTransaction extends Component {
    constructor(props) {
        super(props)

        this.state = {

            amount: null,
            status: null,
            transactionDate: null,
            transactionId: null,
            transactionTime: null,
            creditCard: {
                cardNumber: null
            },

            errors:
            {
                amount: '',
                status: '',
                transactionDate: '',
                transactionId: '',
                transactionTime: '',
                creditCard: {
                    cardNumber: ''
                }
            }



        }
    }

    changeHandler = (event) => {
       
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "transactionId":
                errors.transactionId =
                    value < 0 ? "Transaction id must be greater than 0" : "";
                break;
            case "amount":
                errors.amount =
                    value < 0 ? "amount should be higher than 0" : "";
                break;
            case "status":
                errors.status =
                    value.length < 4 ? "status must be greater than 4 characters" : "";
                break;
            case "cardNumber":
                errors.creditCard.cardNumber =
                    value.length < 12 ? "card must be 12 in size" : "";
                break;

            default:
                break;
        }

        this.setState({ [event.target.name]: event.target.value })
     
    };

    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state)

        if (validateForm(this.state.errors)) {
            let transaction = {
                transactionId: this.state.transactionId,
                status: this.state.status,
                amount: this.state.amount,
                creditCard: { cardNumber: this.state.cardNumber }


            }
        };
        Service.addTransaction(this.state)
            .then(response => {
                console.log(response);
               
           Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your details has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          
   
          this.props.history.push('/listOfTransaction')
            })
            .catch(error => {
                console.log(error);
            })


    }

    render() {
        const { errors } = this.state;
        const { amount, status, transactionDate, transactionId, transactionTime, creditCard: { cardNumber } } = this.state
        return (
            <>
            
                <Navigation />
                <div className="container" style={divStyle}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }} >
                            <h3 className="text-center" style={{color:"white"}}>Add Transaction</h3>
                            <div className="card-body">
                                <form className="form-group" onSubmit={this.submitHandler} noValidate>
                                    <div className="form-group">
                                        <label  style={{color:"white"}} >Transaction Id</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Transaction Id"
                                            type="text"
                                            name="transactionId"
                                            value={transactionId}
                                            onChange={this.changeHandler}
                                            required 
                                        />
                                        {errors.transactionId.length > 0 && (
                                            <span className="text-danger">{errors.transactionId}</span>
                                        )}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Amount</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Transaction Amount"
                                            type="text"
                                            name="amount"
                                            value={amount}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                       
                                        {errors.amount.length > 0 && (
                                            <span className="text-danger">{errors.amount}</span>
                                        )}
                                    </div>

                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Status</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Transaction status"
                                            type="text"
                                            name="status"
                                            value={status}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                        {errors.status.length > 0 && (
                                            <span className="text-danger">{errors.status}</span>
                                        )}
                                    </div>
                                    <br />
                                    <div className="form-group" style={{color:"white"}}>
                                        <label>Transaction Date</label>
                                        <input
                                            type="Date"
                                            className="form-control"
                                            placeholder="Enter Transaction Date"
                                            name="transactionDate"
                                            value={transactionDate}
                                            max={maxDate}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group" >
                                        <label style={{color:"white"}}>Transaction Time</label>
                                        <input
                                            type="Time"
                                            className="form-control"
                                            placeholder="Enter Time"
                                            name="transactionTime"
                                            value={transactionTime}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Card Number"
                                            name="cardNumber"
                                            maxLength="12"
                                            value={cardNumber}
                                            onChange={e => this.setState({ creditCard: { cardNumber: e.target.value } })}
                                            required
                                        />
                                        {errors.creditCard.cardNumber.length > 0 && (
                                            <span className="text-danger">{errors.creditCard.cardNumber}</span>
                                        )}
                                    </div>
                                    <br />
                                    <center>
                                        <button className="btn btn-primary mr-2">Add  New Transaction</button>
                                        <a href="listOfTransaction" className="btn btn-danger ml-2">Cancel</a>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           </>
        )
    }
}

export default AddTransaction