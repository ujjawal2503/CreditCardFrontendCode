import React, { Component } from 'react'
import StatementService from '../../Services/StatementService';
import Navigation from '../Login/Navigation';

const divStyle = {
    width: '100%',
    height: "100vh",
    paddingBottom: '120px',
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat'
};

class CustomerStatement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statements: [],
            username: sessionStorage.getItem('username')
        };
    }

    componentDidMount() {

        StatementService.getCustomerStatements(this.state.username)
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
                    <h2 className="text-center text-dark mt-5">Statement List</h2>

                    <table className="table table-bordered table-hover bg-dark text-light mt-5">
                        <thead className="table-dark mt-5">
                            <tr>
                                <th>Statement ID</th>
                                <th>Bill Amount</th>
                                <th>Billing Date</th>
                                <th>Due Amount</th>
                                <th>Due Date</th>
                                <th>Customer ID</th>
                                <th>Card Number</th>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CustomerStatement
