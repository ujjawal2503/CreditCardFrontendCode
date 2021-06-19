import React, { Component } from 'react';
import axios from 'axios';
import CustomerServices from '../../Services/CustomerServices';
import Navigation from '../Login/Navigation';



class GetAllCustomers
    extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: []
        }
        this.addCustomer = this.addCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
    }

    addCustomer() {
        this.props.history.push('/addCustomer');
    }

    updateCustomer = (username) => {
        // this.props.history.push(`/updateCustomer/${username}`);
        console.log(username)
        sessionStorage.setItem('username', username)
        this.props.history.push('updateCustomer')
    }

    handleDeleteCustomer = (username) => {
        CustomerServices.deleteCustomer(username)
            .then(response => {
                // alert("1 Row Deleted");
                window.location.reload();
            })
    }

    componentDidMount() {
        this.getAllCustomers();
    }

    getAllCustomers() {
        const URL = 'http://localhost:9090/customer/getAllCustomers';
        axios.get(URL).then(response => { this.setState({ customers: response.data }) })
    }

    render() {
        return (
            <div>
                <Navigation/>
                <h1 className='text-center' style={{ color: 'black' }}>Customers List</h1>
                <hr style={{ color: 'black' }} />
                <div className="row m-2">
                    <table className="table table-bordered table-hover bg-dark text-light mt-5">
                        <thead className="table-dark mt-5">
                            <tr>
                                <th>Customer Username</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Mobile</th>
                                <th>Customer Dob</th>
                                <th>Customer Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customer =>
                                        <tr key={customer.username}>
                                            <td>{customer.username}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.contactNo}</td>
                                            <td>{customer.dob}</td>
                                            <td>{customer.address}</td>
                                            <td>
                                                <button onClick={() => this.updateCustomer(customer.username)} className="btn btn-info">Update</button>
                                                <button onClick={() => this.handleDeleteCustomer(customer.username)} className="btn btn-danger m-1">Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <br />
                <div>
                    <button style={{ marginBottom: '100px', backgroundColor: '', height: '50px', width: '200px' }} className="btn btn-primary" onClick={this.addCustomer}>Add Customer</button>
                </div>
            </div>
        )
    }

}

export default GetAllCustomers;
