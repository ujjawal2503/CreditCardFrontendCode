
import React, { Component } from "react";
import axios from "axios";
import Navigation from "../Login/Navigation";
import Service from "../../Services/Service";
import Swal from 'sweetalert2'


class ListOfCreditCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creditCard: []
        }
     
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    edit(cardNumber) {


        console.log(cardNumber)
        sessionStorage.setItem('cardNumber', cardNumber)
        this.props.history.push(`/updateCreditCard/${cardNumber}`)


    }
    handleDelete = (cardNumber) => {
        Service.DeleteCard(cardNumber)
            .then(response => {
              
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    
                  )
                window.location.reload();
            });

    }


    componentDidMount() {
        this.getAllTransaction()
    }

    getAllTransaction() {
        const uri = 'http://localhost:9090/creditCard/getAllCreditCards'
        axios.get(uri).then(response => { this.setState({ creditCard: response.data }) }).catch(error => console.log(error))

    }

    render() {


        return (

            <div>
                <Navigation />
                    
                <h1 className="text-center" style={{color:"MenuText"}}>CREDITCARD DETAILS</h1>

                <div className="row">
                    <div className="container">
                    <table className="table table-dark table-stripped table-bordered table-hover ">
                        <thead>
                            {/* card_number  | bank_name | card_name | card_type | credit_limit | cvv | expiry_date | used_limit | username */}
                            <tr>
                                <th>Card_number</th>
                                <th>Bank_name</th>
                                <th>Card_type</th>
                                <th>Card_name</th>
                                <th>Credit_limit</th>
                                <th>CVV</th>
                                <th>Expiry_date</th>
                                <th>Used_limit</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.creditCard.map(
                                    creditCard =>
                                        <tr key={creditCard.cardNumber} className="color red">
                                            <td>{creditCard.cardNumber}</td>
                                            <td>{creditCard.bankName}</td>
                                            <td>{creditCard.cardType}</td>
                                            <td>{creditCard.cardName}</td>
                                            <td>{creditCard.creditLimit}</td>
                                            <td>{creditCard.cvv}</td>
                                            <td>{creditCard.expiryDate}</td>
                                            <td>{creditCard.usedLimit}</td>
                                            <td>{creditCard.username}</td>
                                            <td>
                                                <button onClick={() => this.edit(creditCard.cardNumber)} className="btn btn-primary">Update</button>
                                                <button onClick={() => this.handleDelete(creditCard.cardNumber)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>)
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>)
    }

}
export default ListOfCreditCard