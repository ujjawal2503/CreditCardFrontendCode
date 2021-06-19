import React, { Component } from 'react'
import StatementService from '../../Services/StatementService';
import Navigation from '../Login/Navigation';
import Swal from 'sweetalert2'

const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

const amountRegex = RegExp(/^-?\d*(\.\d+)?$/);
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
var dates = new Date();
var date = dates.getDate();
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

class AddStatement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            statementId: 0,
            dueAmount: null,
            billAmount: null,
            billingDate: null,
            dueDate: null,
            customer: {
                username: null
            },
            creditCard: {
                cardNumber: null
            },
            errors: {
                dueAmount: '',
                billAmount: ''
            }
        }
    }

    changeHandler = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors

        switch (name) {
            case "dueAmount":
                errors.dueAmount = amountRegex.test(value) ? "" : "Due Amount is not valid";
                break;
            case "billAmount":
                errors.billAmount = amountRegex.test(value) ? "" : "Bill Amount is not valid";
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value })
    }

    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
        if (validateForm(this.state.errors)) {
            let statement = {
                statementId: this.state.statementId,
                dueAmount: this.state.dueAmount,
                billAmount: this.state.billAmount,
                billingDate: this.state.billingDate,
                dueDate: this.state.dueDate,
                customer: {
                    userId: this.state.userId
                },
                creditCard: {
                    cardNumber: this.state.cardNumber
                }
            }
        }
        StatementService.addStatement(this.state)
            .then(response => {
                console.log(response);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your data has been saved'
                })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            })

    }

    render() {
        const { errors } = this.state
        const { statementId, dueAmount, billAmount, billingDate, dueDate, customer: { username }, creditCard: { cardNumber } } = this.state
        return (
            <div>
                <Navigation />
                <br />
                <div className="container" >
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                            <h3 className="text-center">Add Statement</h3>
                            <div className="card-body">
                                <form className="form-group" onSubmit={this.submitHandler}>
                                    {/* <div className="form-group">
                                        <label className="font-weight-bold">Statement ID</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Statement Id"
                                            type="text"
                                            name="statementId"
                                            value={statementId}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br /> */}
                                    <div className="form-group">
                                        <label className="font-weight-bold">Due Amount</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Due Amount"
                                            type="text"
                                            name="dueAmount"
                                            value={dueAmount}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                        {errors.dueAmount.length > 0 && (<span className="text-danger">{errors.dueAmount}</span>)}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label className="font-weight-bold">Bill Amount</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Bill Amount"
                                            type="text"
                                            name="billAmount"
                                            value={billAmount}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                        {errors.billAmount.length > 0 && (<span className="text-danger">{errors.billAmount}</span>)}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label className="font-weight-bold">Billing Date</label>
                                        <input
                                            type="Date"
                                            className="form-control"
                                            placeholder="Enter Billing Date"
                                            name="billingDate"
                                            value={billingDate}
                                            max={maxDate}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label className="font-weight-bold">Due Date</label>
                                        <input
                                            type="Date"
                                            className="form-control"
                                            placeholder="Enter Due Date"
                                            name="dueDate"
                                            value={dueDate}
                                            min={minDate}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label className="font-weight-bold">User Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter User Name"
                                            name="username"
                                            value={username}
                                            onChange={e => this.setState({ customer: { username: e.target.value } })}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label className="font-weight-bold">Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Card Number"
                                            name="cardNumber"
                                            value={cardNumber}
                                            onChange={e => this.setState({ creditCard: { cardNumber: e.target.value } })}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <center>
                                        <button className="btn btn-outline-primary col-2 mr-2">Add</button>
                                        <a href="manage-statements" className="btn btn-outline-danger col-2 ml-2">Cancel</a>
                                    </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddStatement
