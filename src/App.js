import './App.css';
//import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer'
import Login from './components/Login/Login'
import CustomerHome from './components/Login/CustomerHome'
import AdminHome from './components/Login/AdminHome'
import RegisterCustomer from './components/Customer/RegisterCustomer'
import GetAllCustomers from './components/Customer/GetAllCustomers'
import GetCustomer from './components/Customer/GetCustomer'
import UpdateCustomer from './components/Customer/UpdateCustomer'
import GetAllStatements from './components/Statement/GetAllStatements'
import Addstatement from './components/Statement/AddStatement'
import UpdateStatement from './components/Statement/UpdateStatement'
import CustomerStatement from './components/Statement/CustomerStatement'
import CustomerBillStatement from './components/Statement/CustomerBillStatement'
import GetStatement from './components/Statement/GetStatement'
import GetAllAccount from './components/Account/GetAllAccount'
import AddAccount from './components/Account/AddAccount'
import UpdateAccount from './components/Account/UpdateAccount'
import GetAccount from './components/Account/GetAccount'
import AddCreditCard from './components/CreditCard/AddCreditCard'
import GetCreditCard from './components/CreditCard/GetCreditCard'
import GetCreditCardByCustomer from './components/CreditCard/GetCreditCardByCustomer'
import ListOfCreditCard from './components/CreditCard/ListOfCreditCard'
import UpdateCreditCard from './components/CreditCard/UpdateCreditCard'
import AddTransaction from './components/Transaction/AddTransaction'
import GetTransaction from './components/Transaction/GetTransaction'
import GetTransactionByCardNumber from './components/Transaction/GetTransactionByCardNumber'
import ListOfTransaction from './components/Transaction/ListOfTransaction'
import AddPayment from './components/Payment/AddPayment'
import GetAllPayments from './components/Payment/GetAllPayments'
import GetBillsCard from './components/Payment/GetBillsCard'
import GetPayment from './components/Payment/GetPayment'
import GetPaymentByCardNumber from './components/Payment/GetPaymentByCardNumber'
import GetCustomerCrediCard from './components/CreditCard/GetCustomerCreditCard'
import GetHitoryTransaction from './components/Transaction/GetHistoryTransaction'
import ViewCustomerDetails from './components/Customer/ViewCustomerDetails'
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/CustomerHome" component={CustomerHome}></Route>
          <Route path="/AdminHome" component={AdminHome}></Route>
          <Route path="/addCustomer" component={RegisterCustomer}></Route>
          <Route path="/getAllCustomers" component={GetAllCustomers}></Route>
          <Route path="/getCustomer" component={GetCustomer}></Route>
          <Route path="/updateCustomer" component={UpdateCustomer}></Route>
          <Route path="/manage-statements" component={GetAllStatements}></Route>
          <Route path="/addStatement" component={Addstatement}></Route>
          <Route path="/updateStatement" component={UpdateStatement}></Route>
          <Route path="/getCustomerStatement" component={CustomerStatement}></Route>
          <Route path="/customerBillStatement" component={CustomerBillStatement}></Route>
          <Route path="/getOneStatement" component={GetStatement}></Route>
          <Route path="/getAllAccounts" component={GetAllAccount}></Route>
          <Route path="/viewCustomerDetails" component={ViewCustomerDetails}></Route>
          <Route path="/addAccount" component={AddAccount}></Route>
          <Route path="/updateAccount" component={UpdateAccount}></Route>
          <Route path="/getAccount" component={GetAccount}></Route>
          <Route path="/addCreditCard" component={AddCreditCard}></Route>
          <Route path="/getCreditCard" component={GetCreditCard}></Route>
          <Route path="/getCreditCardByCustomer" component={GetCreditCardByCustomer}></Route>
          <Route path="/listOfCreditCard" component={ListOfCreditCard}></Route>
          <Route path="/updateCreditCard" component={UpdateCreditCard}></Route>
          <Route path="/addTransaction" component={AddTransaction}></Route>
          <Route path="/getTransaction" component={GetTransaction}></Route>
          <Route path="/getTransactionByCardNumber" component={GetTransactionByCardNumber}></Route>
          <Route path="/listOfTransaction" component={ListOfTransaction}></Route>
          <Route path="/addPayment" component={AddPayment}></Route>
          <Route path="/getAllPayments" component={GetAllPayments}></Route>
          <Route path="/getBillsCard" component={GetBillsCard}></Route>
          <Route path="/getPayment" component={GetPayment}></Route>
          <Route path="/getPaymentByCardNumber" component={GetPaymentByCardNumber}></Route>
          <Route path="/getCustomerCreditCard" component={GetCustomerCrediCard}></Route>
          <Route path="/getHistory" component={GetHitoryTransaction}></Route>

        </Switch>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
