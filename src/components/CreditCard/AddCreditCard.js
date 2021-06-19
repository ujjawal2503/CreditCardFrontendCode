import React, { Component } from "react";
import Service from "../../Services/Service";
import Navigation from "../Login/Navigation";
import Swal from 'sweetalert2'
const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
};
var dates = new Date();
var date = dates.getDate();
date=date+10;
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

class AddCreditCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardNumber: null,
            bankName: null,
            cardName: null,
            cardType: null,
            creditLimit: null,
            cvv: null,
            expiryDate: null,
            usedLimit: null,
            customer: {
                username: null
            },
            errors:{
                cardNumber: '',
                bankName: '',
                creditLimit:'',
                cvv: '',
                
              
            }
        
      
    }

    }
    changeHandler = (event) => {
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case "cardNumber":
                errors.cardNumber =
                    value.length  < 12 ? "Cardnumber Size should be 12 " : "";
                break;
                case "bankName":
                    errors.bankName =
                        value.length  < 4 ? "Bankname should have minimum 4 characters" : "";
                    break;
                case "cvv":
                errors.cvv =
                            value.length  < 3 ? "Cvv should be of 3 digit" : "";
                        break;    
            default:
                break;
            }
            this.setState({ [event.target.name]: event.target.value })

    }

    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state)
        Service.addCard(this.state)
            .then(response => {
                console.log(response);
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .catch(error => {
                console.log(error);
            })
        this.props.history.push('/listOfCreditCard')

    }

    render() {
        const { errors } = this.state;
        const { cardNumber, cardName, bankName, cardType, creditLimit, cvv, expiryDate, usedLimit, customer: { username } } = this.state
        return (
            <div>
                <Navigation/>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }} >
                            <h3 className="text-center" style={{color:"white"}}>Add New CreditCard details</h3>
                            <div className="card-body">
                                <form className="form-group" onSubmit={this.submitHandler}>
                                    <div className="form-group">
                                        <label style={{color:"white"}}>CreditCard Number</label>
                                        <input
                                            className="form-control"
                                            
                                            maxLength="12"
                                            placeholder="Enter New Card Number"
                                            type="text"
                                            name="cardNumber"
                                            value={cardNumber}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                         {errors.cardNumber.length > 12 && (
                                            <span className="text-danger">{errors.cardNumber}</span>
                                        )}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Bank Name</label>
                                        <input
                                            className="form-control"
                                            placeholder="Enter Bank Name"
                                            type="text"
                                            name="bankName"
                                            value={bankName}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>

                                    <br />
                                    <div className="form-group">
                                        {/* <label>Card Tpye</label> */}
                                       
                                        <label style={{color:"white"}}>  Pick your type of card</label>
                                        <select  style={{height:"auto"}}className="form-control" name="cardType" value={cardType} onChange={this.changeHandler} required>
                                        <option value="" >Choose your CardType</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Platinum">Platinum</option>
                                            <option value="Diamond">Diamond</option>
                                            <option value="Silver">Silver</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className="form-group" style={{color:"white"}}>
                                      
                                        <label style={{color:"white"}}>  Pick your Card Name</label>
                                        <select style={{height:"auto"}} className="form-control" name="cardName" value={cardName} onChange={this.changeHandler} required>
                                        <option value="">Choose your Card Name</option>
                                            <option value="Rupay">Rupay</option>
                                            <option value="MasterCard">MasterCard</option>
                                            <option value="NEWCard">NEWCard</option>

                                        </select>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Credit limit</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter limit of card"
                                            name="creditLimit"
                                            value={creditLimit}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>CVV</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Cvv number"
                                            name="cvv"
                                       
                                            max="999"
                                            min="100"
                                            value={cvv}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                         {errors.cvv.length > 3 && (
                                            <span className="text-danger">{errors.cvv}</span>
                                        )}
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Expiry Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            placeholder="Select the Expiry date"
                                            name="expiryDate"
                                            value={expiryDate}
                                            min={minDate}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Used Limit</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter the user used limit"
                                            name="usedLimit"
                                            value={usedLimit}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label style={{color:"white"}}>Enter the UserName</label>
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
                                    <br />
                                    <center>
                                        <button className="btn btn-primary mr-2">Add  New Credit details</button>
                                        <a href="listOfCreditCard" className="btn btn-danger ml-2">Cancel</a>
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

export default AddCreditCard