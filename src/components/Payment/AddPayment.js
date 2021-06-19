import React, { Component } from 'react'
import axios from 'axios'
import Navigation from '../Login/Navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export class AddPayment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: '',
            paidDate: '',
            paidTime: '',
            paymentId: '',
            paymentMethod: '',
            card: {
                cardNumber: ''
            }
        }
        this.cancel = this.cancel.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:9090/payment/addPayment', this.state).then(response => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Added Successfully!'
              })
            console.log(response);
           
        })
            .catch(error => {
                console.log(error);
            })


    }

    cancel() {
        this.props.history.push("/getAllPayment");
    }

    render() {
        const { amount, paidDate, paidTime, paymentMethod, card: { cardNumber } } = this.state
        return (
            <div>
                <Navigation />
                <br />
                <div className="container">
                    <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }} >
                            <h3 className="text-center">Add Payment</h3>
                            <div className="card-body">
                                <form className="form-group" onSubmit={this.submitHandler} >
                                    <br />

                                    <div className="form-group">
                                        <label style={{ marginRight:'390px' }}>Amount</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            type="text"
                                            name="amount"
                                            value={amount}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>

                                    <br />


                                    <div className="form-group">
                                        <label style={{ marginRight:'380px' }}>PaymentDate</label>
                                        <input
                                            type="Date"
                                            className="form-control"
                                            placeholder="Enter Billing Date"
                                            name="paidDate"
                                            value={paidDate}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label style={{ marginRight:'390px' }}>PaidTime</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Bill Amount"
                                            type="time"
                                            name="paidTime"
                                            value={paidTime}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />

                                    <div className="form-group">
                                        <label style={{ marginRight:'360px' }}> Payment Type </label>
                                        <select name="paymentMethod" className="form-control"
                                            value={paymentMethod} onChange={this.changeHandler} style={{height:"auto"}} required>
                                            <option value="null">Choose your payment mode</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Net Banking">Net Banking</option>
                                            <option value="Card Payment">Card Payment</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label style={{ marginRight:'370px' }}>CardNumber</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter your Card Number"
                                            type="text"
                                            name="cardNumber"
                                            value={cardNumber}
                                            onChange={e => this.setState({ card: { cardNumber: e.target.value } })}
                                            required
                                        />
                                    </div>


                                    <center>
                                        <button className="btn btn-primary mr-2" >Add Payment</button>
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


export default AddPayment
