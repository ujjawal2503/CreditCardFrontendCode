import React, { Component } from 'react'
import Navigation from '../Login/Navigation'
import AccountService from '../../Services/AccountService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class GetAllAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accounts: []
        }
        this.addAccount = this.addAccount.bind(this)
        this.updateAccount = this.updateAccount.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
       
    }

    addAccount() {
        this.props.history.push('/addAccount');
    }

    updateAccount(id) {
        console.log(id)
        sessionStorage.setItem('accountId', id)
        this.props.history.push(`/updateAccount`)
    }

    deleteAccount(id) {

        
        AccountService.deleteAccount(id).then(res => {
            this.setState({
                accounts: this.state.accounts.filter(account => account.accountNumber !== id)
            })

        })
        toast.error('Account Delete Sucessfully',{position:'top-center'})
    }



    componentDidMount() {
        AccountService.getAllAccounts().then((res) => {
            this.setState({ accounts: res.data })
        })
    }


    render() {
        return (
            <div>
                <Navigation />
                <div  className="card col-md-6 offset-md-3 offset-md-3 " style={{ opacity: 0.7, fontWeight: "bold", fontSize: 18, backgroundColor: 'black', color: 'white' }}>
                    <h1 className='text-center' >Account List</h1>
            


                    <br></br>

                    <div className="row m-2" style={{ backgroundColor: 'white' }}>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Account Number</th>
                                    <th> Account Name</th>
                                    <th> Balance </th>
                                    <th>Account Type</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.accounts.map(
                                        account =>
                                            <tr key={account.accountNumber}>
                                                <td>{account.accountNumber}</td>
                                                <td> {account.accountName} </td>
                                                <td> {account.balance}</td>
                                                <td> {account.type}</td>
                                                <td>
                                               
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.deleteAccount(account.accountNumber)} className="btn btn-danger">Delete </button>
                                                    <button style={{ marginLeft: "10px" }} onClick={() => this.updateAccount(account.accountNumber)} className="btn btn-warning">Update </button>
                                                
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                  <center>  <button className="btn btn-primary mr-10" style={{ marginLeft: '90px', marginBottom: '100px', backgroundColor: '', height: '40px', width: '150px' }} onClick={this.addAccount}> Add Account</button> </center>
                </div>
                <ToastContainer/>
            </div>
        )
    }
}

export default GetAllAccount
