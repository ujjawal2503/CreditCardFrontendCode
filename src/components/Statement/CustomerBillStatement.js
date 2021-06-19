import React, { Component } from 'react'
import StatementService from '../../Services/StatementService';
import Navigation from '../Login/Navigation';
import Swal from 'sweetalert2'

const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

class CustomerBillStatement extends Component {
    constructor(props) {
        super(props)

        this.state = {
            statements: [],
            cardNumber: sessionStorage.getItem('cardNumber')
        }
    }

    handleBtnClick = (event) => {
        event.preventDefault();
        let card = {
            cardNumber: this.state.cardNumber
        };
        console.log(card)

        StatementService.unBillStatement(card)
            .then(response => {
                console.log(response);
                this.setState({ statements: response.data });
                console.log(this.state.statements);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Generated UnBilled Statement',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            });

    }

    handleBtn2Click = (event) => {
        event.preventDefault();
        let card = {
            cardNumber: this.state.cardNumber
        };
        console.log(card)

        StatementService.billStatement(card)
            .then(response => {
                console.log(response);
                this.setState({ statements: response.data });
                console.log(this.state.statements);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Generated Billed Statement',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            });

    }
    render() {
        const { statements } = this.state
        return (
            <div>
                <Navigation />
                <div className="container" style={divStyle}>
                    <h2 className="text-center text-dark">Statement</h2>
                    <form className="card-body">
                        <button className="btn btn-outline-dark mr-2" onClick={this.handleBtn2Click}>Generate Bill</button>
                        <button className="btn btn-outline-dark ml-2" onClick={this.handleBtnClick}>Generate Unbill</button>
                    </form>

                    <div className=" card-body text-center">

                        {
                            <ul class="list-group col-6 mt-5 ">
                                <li class="list-group-item active">Statement Details</li>
                                <li class="list-group-item">Statement ID  :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{statements.statementId}</li>
                                <li class="list-group-item list-group-item-secondary">Bill Amount   :{statements.billAmount}</li>
                                <li class="list-group-item ">Bill Date     :{statements.billingDate}</li>
                                <li class="list-group-item list-group-item-secondary">Due amount    :{statements.dueAmount}</li>
                                <li class="list-group-item">Due Date      :{statements.dueDate}</li>
                                <li class="list-group-item list-group-item-secondary">Customer ID   :{statements.customerId}</li>
                                <li class="list-group-item">Card Number   :{statements.cardNumber}</li>
                            </ul>
                        }

                    </div>

                </div>
            </div>
        )
    }
}

export default CustomerBillStatement
