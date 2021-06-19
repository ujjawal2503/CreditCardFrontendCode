import React, { Component } from 'react'
//import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            role: sessionStorage.getItem('role')
        }
    }

    // logout = (event) => {
    //     sessionStorage.clear();
    //     localStorage.clear();
    //     this.props.history.push("/login");
    // };
    logout = (event) => {
        sessionStorage.clear();
        localStorage.clear();
        console.log("logged out")
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign Out Successfull!'
        })
    };

    componentDidMount() {
        if (sessionStorage.getItem('role') == null) {
            // alert("Please login")
            Swal.fire({
                icon: 'error',
                title: 'Login Error',
                text: 'Please login!'
            })
             this.props.history.push("/login")
        }
    }


    render() {
        return (
            (sessionStorage.getItem('role') === 'admin') ?

                (
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand text" href="#" style={{ fontSize: '25px', color: 'greenyellow', fontWeight: 'bolder' }}>Logged in as Admin</a>

                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ paddingRight: "15px" }}>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        {/* <a className="nav-a active" aria-current="page" to="/AdminHome" style={{ fontSize: '15px' }}>Home</a> */}
                                        <Link  className="mr-5" style={{ fontSize: '18px', color: 'white' }} to="/AdminHome" >AdminHome </Link>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '18px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Customer
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/addCustomer" >Register Customer </Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getAllCustomers" >Manage Customers</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getCustomer">View Customer</Link></li>

                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '18px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Statement
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/addStatement" >Add Statement</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/manage-statements">Manage Statements</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getOneStatement" >View Statement</Link></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '18px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Payment
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/addPayment" >Add Payment</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getAllPayments" >Get All Payments</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getPayment" >Get Payment</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getBillsCard" >Get Bill Card</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getPaymentByCardNumber" >Get Payments By CardNumber</Link></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '18px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Account
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/addAccount" >Add Account</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getAllAccounts">Get All Account</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getAccount">Get Account</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '18px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Credit Card
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/addCreditCard">Add Credit Card</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getCreditCard">Get Credit Card </Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/listOfCreditCard" >Get All Credit Card</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getCreditCardByCustomer" >Get Credit Card Of Customer</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '18px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Transaction
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/addTransaction" >Add Transaction</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/listOfTransaction" >Get All Transaction</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getTransaction" >Get Transaction</Link></li>
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getTransactionByCardNumber" >Get Transaction By CardNumber</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                <a href="/login"><button className="btn btn-danger btn-lg" onClick={this.logout.bind(this)} role="button" style={{ marginRight: '6px', paddingLeft: '6px', paddingRight: '6px', textAlign: 'center', fontSize: '15px', placeContent: 'end' }}>Sign Out</button></a>
                                {/* <a class="btn btn-danger btn-lg" href="/login" role="button" style={{ marginRight: '6px', paddingLeft: '6px', paddingRight: '6px', textAlign: 'center', fontSize: '15px', placeContent: 'end' }}>Sign Out</a> */}
                                {/* <a className="navbar-brand text-uppercase" href='/login' style={{ fontWeight:'bolder',fontSize:'20px',color:'red',paddingLeft: "400px" }}>Sign Out</a> */}
                            </div>
                        </div>
                    </nav>
                ) :
                (
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand text-uppercase" href="#" style={{ fontSize: '20px', color: 'yellowgreen', fontWeight: 'bolder' }}>Logged in as Customer</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-a active" aria-current="page" to="" style={{ paddingRight: "10px", fontSize: '15px' }}>Home</a>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '15px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Customer
                </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/viewCustomerDetails">View Details</Link></li>
                                        </ul>
                                    </li>


                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '15px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                            Statement
                </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/customerBillStatement" >Customer Billed Statement</Link></li>
                                            <li><Link className="dropdown-item " style={{ fontSize: '15px' }} to="/getCustomerStatement">Customer Statements</Link></li>
                                        </ul>
                                    </li>

                                    {/* <li className="nav-item dropdown">
                                        <a style={{ fontSize: '15px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Payment
                </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            <li><a className="dropdown-item" style={{ fontSize: '15px' }}>Add Payment</a></li>
                                            <li><a className="dropdown-item" style={{ fontSize: '15px' }} >Get All Payments</a></li>
                                            <li><a className="dropdown-item" style={{ fontSize: '15px' }} >Get Payment</a></li>
                                        </ul>
                                    </li> */}

                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '15px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Transaction
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                        <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getHistory">Transaction History</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a style={{ fontSize: '15px', color: 'white', paddingRight: '20px' }} className="nav-a dropdown-toggle" href="#" id="navbarDropdownMenua" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Credit Card
                  </a>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenua">
                                            {/* <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getCreditCardByCustomer" >Get Credit Card By Customer</Link></li> */}
                                            <li><Link className="dropdown-item" style={{ fontSize: '15px' }} to="/getCustomerCreditCard" >Get Credit Card Details</Link></li>   
                                        </ul>
                                    </li>
                                </ul>
                                <a href="/login"><button className="btn btn-danger btn-lg" onClick={this.logout.bind(this)} role="button" style={{ marginRight: '6px', paddingLeft: '6px', paddingRight: '6px', textAlign: 'center', fontSize: '15px', placeContent: 'end' }}>Sign Out</button></a>
                                {/* <a class="btn btn-danger btn-lg" href="/login" role="button" style={{ marginRight: '6px', paddingLeft: '6px', paddingRight: '6px', textAlign: 'center', fontSize: '15px', placeContent: 'end' }}>Sign Out</a> */}
                            </div>
                        </div>
                    </nav>

                )

        )
    }
}


export default Navigation