import React, { Component } from 'react'
import axios from 'axios'
import Navigation from '../Login/Navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class GetAllPayments extends Component {
    constructor(props) {
        super(props)
        this.state = { payments: [] };
        this.addPayment = this.addPayment.bind(this);
    }

    addPayment() {
        this.props.history.push('/addPayment');
    }


    componentDidMount() {
        this.getAllPayments()
    }

    getAllPayments() {
        const URL = 'http://localhost:9090/payment/getAllPayments';
        axios.get(URL).then(response => { this.setState({ payments: response.data }) })
    }
    handleDeletePayment = (paymentId) => {
        const DEL_URL = `http://localhost:9090/payment/removePayment/${paymentId}`;
        axios.delete(DEL_URL).then(response => {
          
           toast.error('Deleted 1 row Sucessfully',{position:"top-center"})
            window.location.reload(false);
          
            console.log(response);
        });


    }


    render() {
        return (
            <div>
                <Navigation />
                <h1 className='text-center' style={{ color: 'black' }}>Payment List</h1>
                <hr style={{ color: 'black' }} />
                <div className="container" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                <div className="row m-2" style={{ backgroundColor: 'white' }}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Payment Id</th>
                                <th>Payment Amount</th>
                                <th>Payment Date</th>
                                <th>Payment Time</th>
                                <th>Payment Method</th>
                                <th>Card Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.payments.map(
                                    payment =>
                                        <tr key={payment.paymentId}>
                                            <td>{payment.paymentId}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.paidDate}</td>
                                            <td>{payment.paidTime}</td>
                                            <td>{payment.paymentMethod}</td>
                                            <td>{payment.card}</td>
                                            <td> <button onClick={() => this.handleDeletePayment(payment.paymentId)} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>
                </div>
                <br />
                <ToastContainer/>
            </div>
        )
    }
}

export default GetAllPayments
