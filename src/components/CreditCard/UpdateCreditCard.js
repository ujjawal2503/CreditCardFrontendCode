import React, { Component } from "react";
import Service from "../../Services/Service";
import Navigation from "../Login/Navigation";
import Swal from 'sweetalert2'
const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

class UpdateCreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: sessionStorage.getItem('cardNumber'),
            bankName: '',
            cardName: '',
            cardType: '',
            creditLimit: '',
            cvv: '',
            expiryDate: '',
            usedLimit: '',
            customer: {
                username: ''
            }
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }


    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });

    };

    submitHandler = (e) => {
        e.preventDefault();

        let creditCard = {
            cardNumber: this.state.cardNumber,
            bankName: this.state.bankName,
            cardName: this.state.cardName,
            cardType: this.state.cardType,
            creditLimit: this.state.creditLimit,
            cvv: this.state.cvv,
            expiryDate: this.state.expiryDate,
            usedLimit: this.state.usedLimit,
            customer: {
                username: this.state.customer.username
            }
        }
        console.log('Creditcard=>' + JSON.stringify(creditCard));
        Service.updateCard(this.state).then(response => {
            console.log(response);
       
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your details has been updated successfully',
                showConfirmButton: false,
                timer: 1500
              })
            this.props.history.push("/listOfCreditCard");
        }).catch(error => {
            console.log(error);
        })

    };


    componentDidMount() {
        Service.getCard(this.state.cardNumber).then((response) => {
            let card = response.data;
            console.log(card)
            this.setState({
                cardNumber: card.cardNumber,
                bankName: card.bankName,
                cardName: card.cardName,
                cardType: card.cardType,
                creditLimit: card.creditLimit,
                cvv: card.cvv,
                expiryDate: card.expiryDate,
                usedLimit: card.usedLimit,
                customer: {
                    username: card.username
                }
            })
        }
        )
    }

    cancel() {
        this.props.history.push("/listOfCreditCard");
    }





    render() {
        const { cardNumber, cardName, bankName, cardType, creditLimit, cvv, expiryDate, usedLimit, customer: { username } } = this.state
        return (
            <div style={divStyle}>
                <Navigation />
                <div className="container pt-5">
                    <div className="row">
                        <div style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }} className="card col-md-6 mx-auto">
                            <h3 className="text-center">Update Card details</h3>
                            <div className="card-body">
                                <form onSubmit={this.submitHandler}>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Card Number </label>
                                        <input
                                            placeholder="Card Number"
                                            name="cardNumber"
                                            className="form-control"
                                            title="Must have 16 digit card number"
                                            value={cardNumber}
                                            onChange={this.changeHandler}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Bank_name </label>
                                        <input
                                            placeholder="Bank_name"
                                            name="bankName"
                                            className="form-control"
                                           
                                            value={bankName}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Card_Name </label>

                                        <select style={{height:"auto"}}className="form-control" name="cardName" value={cardName} onChange={this.changeHandler} required>
                                        <option value="" >Choose your CardName</option>
                                            <option value="Rupay">Rupay</option>
                                            <option value="MasterCard">MasterCard</option>
                                            <option value="NEWCard">NEWCard</option>

                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Card_type </label>
                                        <select style={{height:"auto"}} className="form-control" name="cardType" value={cardType} onChange={this.changeHandler} required>
                                        <option value="" >Choose your CardType</option>
                                            <option value="Gold">Gold</option>
                                            <option value="Platinum">Platinum</option>
                                            <option value="Diamond">Diamond</option>
                                            <option value="Silver">Silver</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="font-weight-bold"> Credit_limit </label>
                                        <input
                                            placeholder="credit_limit"
                                            name="creditLimit"
                                            type='number'
                                            className="form-control"
                                            
                                            value={creditLimit}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Used_limit </label>
                                        <input
                                            placeholder="used limit"
                                            name="usedLimit"
                                            type='number'
                                            className="form-control"
                                            
                                            value={usedLimit}
                                            onChange={this.changeHandler}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Expiry date </label>
                                        <input
                                            placeholder="Bank_name"
                                            name="expiryDate"
                                            className="form-control"
                                            type='date'
                                            value={expiryDate}
                                            onChange={this.changeHandler}
                                            disabled
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> CVV </label>
                                        <input
                                            placeholder="cvv"
                                            name="cvv"
                                            className="form-control"
                                            title="Must have 3 digit "
                                            value={cvv}
                                            onChange={this.changeHandler}
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-weight-bold"> Customer Username </label>
                                        <input
                                            placeholder="username"
                                            name="username"
                                            className="form-control"
                                            type='text'
                                            title="Must have  digit card number"
                                            value={username}
                                            onChange={e => this.setState({ customer: { username: e.target.value } })}
                                            disabled
                                        />
                                    </div>

                                    <button className="btn btn-outline-success" type="submit">
                                        Update
                  </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: "10px" }}
                                    >
                                        Cancel
                  </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateCreditCard;