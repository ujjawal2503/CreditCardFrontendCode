import React, { Component } from 'react';
import CustomerServices from '../../Services/CustomerServices';
import Navigation from '../Login/Navigation';
import Swal from 'sweetalert2';

const phoneRegex = RegExp(/^\d{10}$/);
const emailRegex = RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};

class UpdateCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: sessionStorage.getItem('username'),
            password: null,
            name: null,
            email: null,
            contactNo: null,
            dob: '',
            address: null,
            errors: {
                username: '',
                password: '',
                name: '',
                email: '',
                contactNo: '',
                address: '',
            }

        }
    }
    cancel() {
        this.props.history.push('/updateCustomer')
    }

    changeHandler = (event) => {

        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "username":
                errors.username =
                    value.length < 4 ? "Username must be greater than 4 characters" : "";
                break;
            case "name":
                errors.name =
                    value.length < 4 ? "Name must be greater than 4 characters" : "";
                break;
            case "password":
                errors.password =
                    value.length < 4 ? "Password must be greater than 4 characters" : "";
                break;

            case "contactNo":
                errors.contactNo = phoneRegex.test(value)
                    ? ""
                    : "Phone number is not valid";
                break;

            case "email":
                errors.email = emailRegex.test(value)
                    ? ""
                    : "Email is not valid";
                break;
            case "address":
                errors.address =
                    value.length < 5 ? "Address must be greater than 5 characters" : "";

            default:
                break;
        }

        this.setState({ errors, [name]: value })
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state)
        if (validateForm(this.state.errors)) {
            let customer = {
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                contactNo: this.state.contactNo,
                dob: this.state.dob,
                address: this.state.address,
                password: this.state.password
            };
            CustomerServices.updateCustomer(this.state)
                .then(response => {
                    console.log(response);
                    // alert("Details Updated Successfully")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your details has been updated',
                        showConfirmButton: false,
                        timer: 3000
                      })
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    componentDidMount() {
        CustomerServices.getCustomer(this.state.username).then((response) => {
            let customers = response.data;
            this.setState({
                username: customers.username,
                name: customers.name,
                email: customers.email,
                contactNo: customers.contactNo,
                dob: customers.dob,
                address: customers.address,
                password: customers.password
            })
        }
        )
    }

    render() {
        const { errors } = this.state;
        const { username, name, email, contactNo, dob, address, password } = this.state
        return (
            <div>
                <Navigation/>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                            <h3 className="text-center w4-padding w3-xlarge w3-text-white">Update Customer</h3>
                            <div className="card-body">
                                <form onSubmit={this.submitHandler} noValidate autoComplete="off">
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Customer Id</label>
                                        <input className="form-control mt-2"
                                            type="text"
                                            name="username"
                                            value={username}
                                            onChange={this.changeHandler}
                                            placeholder="Enter Username"
                                            disabled
                                        ></input>
                                        {errors.username.length > 0 && (
                                            <span className="text-danger">{errors.username}</span>
                                        )}
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Name</label>
                                        <input className="form-control"
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={this.changeHandler}
                                            placeholder="Enter Full Name"
                                            required
                                        ></input>
                                        {errors.name.length > 0 && (
                                            <span className="text-danger">{errors.name}</span>
                                        )}
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Email</label>
                                        <input className="form-control mt-2"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={this.changeHandler}
                                            placeholder="Enter Your Email"
                                            required
                                        ></input>
                                        {errors.email.length > 0 && (
                                            <span className="text-danger">{errors.email}</span>
                                        )}
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Mobile Number</label>
                                        <input className="form-control"
                                            type="text"
                                            name="contactNo"
                                            value={contactNo}
                                            onChange={this.changeHandler}
                                            placeholder="Ex : 6309429908"
                                            required
                                        ></input>
                                        {errors.contactNo.length > 0 && (
                                            <span className="text-danger">{errors.contactNo}</span>
                                        )}
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Date of Birth</label>
                                        <input className="form-control"
                                            type="date"
                                            name="dob"
                                            value={dob}
                                            onChange={this.changeHandler}
                                            required
                                        ></input>
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Address</label>
                                        <input className="form-control mt-2"
                                            type="text"
                                            name="address"
                                            value={address}
                                            onChange={this.changeHandler}
                                            placeholder="Enter Your Pick Up Address"
                                            required
                                        ></input>
                                        {errors.address.length > 0 && (
                                            <span className="text-danger">{errors.address}</span>
                                        )}
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label className="w4-padding w2-xlarge w3-text-white">Password</label>
                                        <input className="form-control mt-2"
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={this.changeHandler}
                                            placeholder="Enter Password"
                                            required
                                        ></input>
                                        {errors.password.length > 0 && (
                                            <span className="text-danger">{errors.password}</span>
                                        )}
                                    </div>
                                    <button style={{ marginBottom: "70px" }} className="btn btn-success mr-1" type="submit">Update</button>
                                    <a style={{ marginBottom: "70px" }} className="btn btn-danger" href="getAllCustomers">Cancel</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateCustomer;
