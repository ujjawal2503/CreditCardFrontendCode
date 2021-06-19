import React, { Component } from "react";
import axios from "axios";
import Service from "../../Services/Service";
import Navigation from "../Login/Navigation";
import Swal from 'sweetalert2';
const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

class ListOfTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transaction: []
        }
        this.addTransaction = this.addTransaction.bind(this);
        this.editTransaction = this.editTransaction.bind(this);
        this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
    }
    addTransaction() {
        this.props.history.push('/addTransaction')
    }
    editTransaction() {
        this.props.history.push(`/updateTransaction`)
    }
    handleDeleteTransaction = (transactionId) => {
        Service.DeleteTransaction(transactionId)
            .then(response => {
               // alert("1 Row Deleted");
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your details has been deleted',
                    showConfirmButton: false,
                    timer: 5000
                  })
                window.location.reload();
            });

    }


    componentDidMount() {
        this.getAllTransaction()
    }

    getAllTransaction() {
        const uri = 'http://localhost:9090/transaction/getAllTransaction'
        axios.get(uri).then(response => { this.setState({ transaction: response.data }) })   //.catch(error=>console.log(error))

    }

    render() {


        return (
            <div  style={divStyle}>
                <Navigation />
                <h1 className="text-center container" style={{color:"black"}}>Transaction detail</h1>

                <div className="row" >
                    <div className="container" style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }} >
                    <table className="table table-dark table-stripped table-bordered table-hover">
                        <thead>

                            <tr>
                                <th>TransactionId</th>
                                <th>TransactionStatus</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>CreditCardNumber</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.transaction.map(
                                    transaction =>
                                        <tr key={transaction.transactionId} className="color red">
                                            <td>{transaction.transactionId}</td>
                                            <td>{transaction.status}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.transactionDate}</td>
                                            <td>{transaction.transactionTime}</td>
                                            <td>{transaction.creditCardNumber}</td>
                                            <td>

                                                <button onClick={() => this.handleDeleteTransaction(transaction.transactionId)} className="btn btn-danger">Delete</button>
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
export default ListOfTransaction;