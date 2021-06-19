import React, { Component } from 'react'
import Navigation from '../Login/Navigation';
import AccountService from '../../Services/AccountService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};


class UpdateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountNumber: sessionStorage.getItem('accountId'),
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
        this.cancel = this.cancel.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }

    cancel() {
        this.props.history.push('/getAllAccounts')
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
                    value.length > 0 ? "" : "Enter correct Balance";
                break;
            case "type":
                errors.type =
                    value != "null" ? "" : "Select Account Type";
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value })
    }


    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state)
        if (validateForm(this.state.errors)) {

            let account = {
                accountNumber: this.state.accountNumber,
                accountName: this.state.accountName,
                balance: this.state.balance,
                type: this.state.type
            }

            AccountService.updateAccount(this.state.accountNumber, account).then(res => {
                toast('Account Updated Sucessfully',{position:'top-center'})
            }).catch(error => {
                console.log(error);
            })
        }
    }

    componentDidMount() {
        AccountService.getAccountById(this.state.accountNumber).then((res) => {
            let account = res.data
            this.setState(
                {
                    accountNumber: account.accountNumber,
                    accountName: account.accountName,
                    balance: account.balance,
                    type: account.type
                }
            )
        });
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
                            <h3 className="text-center w4-padding w3-xlarge w3-text-black">Update Account</h3>
                            <div className="card-body">
                                <form onSubmit={this.submitHandler} noValidate autocomplete="off">
                                    <div className="form-group">
                                        <label  style={{marginRight:'350px'}}>Account Number</label>
                                        <input required className="form-control mt-2"
                                            type="text"
                                            name="accountNumber"
                                            value={accountNumber}
                                            onChange={this.changeHandler}
                                            placeholder="Enter AccountNumber"
                                            disabled
                                        ></input>
                                        {errors.accountNumber.length > 0 && (
                                            <span className="text-danger">{errors.accountNumber}</span>
                                        )}
                                    </div>
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label  style={{marginRight:'360px'}}>Account Name</label>
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
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label  style={{marginRight:'390px'}}>Balance</label>
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
                                    {/* <br/> */}
                                    <div className="form-group">
                                        <label style={{marginRight:'390px'}}> Type: </label>
                                        <select name="type" className="form-control" style={{height:"auto"}}
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


                                    <button style={{ marginBottom: "50px" }} className="btn btn-success" type="submit">Update</button>
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

export default UpdateAccount
