import React, { Component } from 'react'
import AccountService from '../../Services/AccountService'
import Navigation from '../Login/Navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};


class AddAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountNumber: null,
            accountName: null,
            balance: null,
            type: null,
            errors: {
                accountNumber: '',
                accountName: '',
                balance: '',
                type: '',

            }
        }
        this.submitHandler = this.submitHandler.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    cancel() {
        this.props.history.push('/getAllAccounts');
    }

    changeHandler = (event) => {

        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "accountNumber":
                errors.accountNumber =
                    value.length == 8 ? "" : "Account Number Must have 8 digits";
                break;
            case "accountName":
                errors.accountName =
                    (value.length > 1 && value.length < 30) ? "" : "Your name must contain atleast 2 characters upto 30 chracters";
                break;
                case "balance":
                    errors.balance =
                        value > 0 ? "" : "Enter correct Balance";
                    break;
            case "type":
                errors.type =
                    value != "null" ? "" : "Select Account Type";
                break;
            default:
                break;
        }

        this.setState({ [event.target.name]: event.target.value })
    }


    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state)


        if (validateForm(this.state.errors)) {

            let account = {
                accountNumber: parseInt(this.state.accountNumber),
                accountName: this.state.accountName,
                balance: this.state.balance,
                type: this.state.type
            }

            AccountService.createAccount(account).then(res => {
                toast.success('Account sucesfully added!', {
                    position: "top-center"
                    })
            }).catch(error => {
                console.log(error);
                toast.error('Enter correct Details',{position:"top-center"})
            })
        }
    }

    render() {
        const { errors } = this.state;
        const { accountNumber, accountName, balance, type } = this.state
        return (
            <div>
                <Navigation />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                            <h3 >Add Account</h3>
                            <div className="card-body">
                                <form onSubmit={this.submitHandler} noValidate autocomplete="off">
                                    <div className="form-group">
                                        <label  style={{ marginRight:'350px' }}>Account Number</label>
                                        <input required className="form-control mt-2"
                                            type="text"
                                            name="accountNumber"
                                            value={accountNumber}
    
                                            onChange={this.changeHandler}
                                            placeholder="Enter AccountNumber"
                                        ></input>
                                        {errors.accountNumber.length > 0 && (
                                            <span className="text-danger">{errors.accountNumber}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label style={{ marginRight:'370px' }}>Account Name</label>
                                        <input className="form-control"
                                            type="text"
                                            name="accountName"
                                            value={accountName}
                                            onChange={this.changeHandler}
                                            placeholder="Enter Full Name"
                                            required
                                        ></input>
                                        {errors.accountName.length > 0 && (
                                            <span className="text-danger">{errors.accountName}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label  style={{ marginRight:'400px' }}>Balance</label>
                                        <input className="form-control mt-2"
                                            type="text"
                                            name="balance"
                                            value={balance}
                                            onChange={this.changeHandler}
                                            placeholder="Enter balance"
                                            required
                                        ></input>
                                        {errors.balance.length > 0 && (
                                            <span className="text-danger">{errors.balance}</span>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label style={{ marginRight:'410px'}}   > Type: </label>
                                        <select name="type" className="form-control"  style={{height:"auto"}}
                                            value={type} onChange={this.changeHandler} required>
                                            <option value="null">Choose your Account Type</option>
                                            <option value="Saving Account">Saving Account</option>
                                            <option value="Current Account">Current Account</option>
                                            <option value="Salary Account">Salary Account</option>
                                        </select>
                                        {errors.type.length > 0 && (
                                            <span className="text-danger">{errors.type}</span>
                                        )}

                                    </div>

                                    <button style={{ marginBottom: "50px" }} className="btn btn-success" type="submit">Save</button>
                                    <button style={{ marginLeft: "10px", marginBottom: "50px" }} className="btn btn-danger" onClick={this.cancel} >Cancel</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}          

export default AddAccount;