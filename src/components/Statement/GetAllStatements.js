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


class GetAllStatements extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statements: []
        };

        this.handleDeleteStatement = this.handleDeleteStatement.bind(this);

    }

    handleDeleteStatement = (sid) => {
        StatementService.deleteStatement(sid)
            .then(response => {
                // alert("1 Row Deleted");
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Data has been deleted.'
                })
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            })

    }

    UpdateCustomer = (statementId) => {
        console.log(statementId)
        sessionStorage.setItem('statementId', statementId)
        this.props.history.push(`/updateStatement`)
    }


    componentDidMount() {

        StatementService.getAllStatements()
            .then(response => {
                console.log(response);
                this.setState({ statements: response.data });
                console.log(this.state.statements);
            });

    }

    render() {
        const { statements } = this.state
        return (
            <div>
                <Navigation />
                <div className="container" style={divStyle}>
                    <a href="/addstatement"><button className="btn btn-outline-light">Add Statement</button></a>
                    <h2 className="text-center text-dark">Statement List</h2>

                    <table className="table table-bordered table-hover bg-dark text-light">
                        <thead className="table-dark">
                            <tr>
                                <th>Statement ID</th>
                                <th>Bill Amount</th>
                                <th>Billing Date</th>
                                <th>Due Amount</th>
                                <th>Due Date</th>
                                <th>Customer ID</th>
                                <th>Card Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statements.map((statement) => (
                                <tr key={statement.statementId}>
                                    <td>{statement.statementId}</td>
                                    <td>{statement.billAmount}</td>
                                    <td>{statement.billingDate}</td>
                                    <td>{statement.dueAmount}</td>
                                    <td>{statement.dueDate}</td>
                                    <td>{statement.customerId}</td>
                                    <td>{statement.cardNumber}</td>
                                    <td >
                                        <button onClick={() => this.UpdateCustomer(statement.statementId)} className="btn btn-outline-info mr-2">Update</button>
                                        <button onClick={() => this.handleDeleteStatement(statement.statementId)} className="btn btn-outline-danger ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default GetAllStatements
