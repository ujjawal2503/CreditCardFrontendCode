import React, { Component } from 'react'
import LoginService from "../../Services/LoginService"

import { Link } from "react-router-dom";

import Swal from 'sweetalert2'
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginres: "",
            username: "",
            password: "",
            role: "",
            rememberMe: false,
            errors: {
                username: "",
                password: "",
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case "username":
                errors.username = value.length < 3 ? "invalid username" : "";
                break;

            case "password":
                errors.password = value.length < 4 ? "password must be greater than 4 characters" : "";
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }
    handleCheckBoxChange = (event) => {
        const input = event.target;
        const value = input.type === "checkbox" ? input.checked : input.value;
        this.setState({ [input.name]: value });
    };

    componentDidMount() {
        const rememberMe = localStorage.getItem("rememberMe") === "true";
        const username = rememberMe ? localStorage.getItem("username") : "";
        this.setState({ username, rememberMe });
    }

    loginUser = (e) => {
        e.preventDefault();

        if (validateForm(this.state.errors)) {
            sessionStorage.setItem("username", this.state.username);
            sessionStorage.setItem("role", this.state.role);

            localStorage.setItem("rememberMe", this.state.rememberMe);
            localStorage.setItem("username", this.state.rememberMe ? this.state.username : "");


            if (this.state.role === "customer") {
                let loginrequest = {
                    username: this.state.username,
                    password: this.state.password,
                    role: "customer"
                };
                console.log(loginrequest)
                LoginService.loginUser(loginrequest).then(
                    (res) => {
                        this.setState({ loginres: res.data });
                        if (this.state.loginres === "Login successfull") {
                           
                           
                    // alert("Customer temporary login successfull")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login Successfull!'
                      })
                              this.props.history.push(`/CustomerHome/${this.state.username}`);
                        } else {
                            alert(this.state.loginres);
                            window.location.reload(false);
                        }
                    }
                );
            }
            else if (this.state.role === "admin") {
                let loginrequest = {
                    username: this.state.username,
                    password: this.state.password,
                    role: "admin"
                }
                console.log(loginrequest)
                LoginService.loginUser(loginrequest).then(
                    (res) => {
                        this.setState({ loginres: res.data });
                        if (this.state.loginres === "Login successfull") {
                            // alert("Admin temporary login successfull")
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Login Successfull!'
                              })
                            this.props.history.push(`/AdminHome/${this.state.username}`);
                        } else {
                            alert(this.state.loginres);
                            window.location.reload(false);
                        }
                        console.log(this.state.loginres);
                    }
                )
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                alert("please enter correct credentials")
            }

        };

    }
    changeUserNameHandler = (event) => {
        this.setState({ username: event.target.value });
    };

    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    };
    changeRoleHandler = (event) => {
        this.setState({ role: event.target.value });
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <h2 style={{fontSize:'300%',marginTop:'50px' ,textAlign: 'center',color:'black', fontFamily: 'Arial'+ 'Helvetica'+ 'sans-serif', fontWeight: 'bolder'}}>Credit Card Payment System</h2>
                <br />
                <br />
                <div className="spinner-grow text-primary" style={{marginLeft: '200px' }}></div>
                <div className="spinner-grow text-success" style={{marginLeft: '200px' }}></div>
                <div className="spinner-grow text-info"style={{marginLeft: '200px' }}></div>
                <div className="spinner-grow text-warning" style={{marginLeft: '200px' }}></div>
                <div className="spinner-grow text-danger" style={{marginLeft: '200px' }}></div>  
                <div className="spinner-grow text-dark" style={{marginLeft: '200px'}}></div>
    <br />
    <br />

                <div className="container" >
                <div className="w4-padding w3-xsmall w3-text-white"></div>
                    <div className="row">
                        <div className="card col-md-4 offset-md-4 offset-md-3"style={{backgroundColor:'black'}}>
                            <h3 className="text-center" style={{color:'white',fontSize:'20px'}}>Login</h3>
                            <br/>
                            <div className="card-body">
                                <form name="form" onSubmit={this.loginUser}  noValidate autoComplete="off">
                                    <div className="form-group">
                                    <i className="glyphicon glyphicon-user mr-2"></i>
                                        <label style={{color:'white',fontSize:'15px',paddingRight:"220px"}}>User Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                        {errors.username.length > 0 && (<span className="text-danger">{errors.username}</span>)}
                                    </div>
                                    <div className="form-group">
                                    <i className="fas fa-key mr-2"></i> 
                                        <label style={{color:'white',fontSize:'15px',paddingRight:"230px"}}>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                        {errors.password.length > 0 && (
                                            <span style={{ color: '#ff0000' }} className="text-danger">{errors.password}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                    <i className="glyphicon glyphicon-lock mr-2"></i>
                                        <label style={{color:'white',fontSize:'15px',paddingRight:"260px"}}>Role</label>
                                        <select style={{height:'40px'}} 
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            value={this.state.role}
                                            onChange={this.changeRoleHandler}
                                        >
                                            <option value="">--Select Role--</option>
                                            <option value="admin">Admin</option>
                                            <option value="customer">Customer</option>
                                        </select>
                                    </div>
                                    <br />
                                    {/* <input name="rememberMe" checked={this.state.rememberMe} onChange={this.handleCheckBoxChange} type="checkbox" style={{color:'white',fontSize:'15px'}}/>{''}Remember me */}
                                    <div>
                                        <button className="btn btn-primary btn btn-lg btn-block" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}



export default Login