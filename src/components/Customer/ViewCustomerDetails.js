import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import  Navigation  from '../Login/Navigation'

function ViewCustomerDetails(props) { 

    let initialCustomer={}
    let [customer,setCustomer]=useState(initialCustomer)
    let [username,setusername]=useState(sessionStorage.getItem('username'))
    let [btnId,setBtnId]=useState(0)

    useEffect(() => 
    {
        const URL=`http://localhost:9090/customer/getCustomer/${username}`;
        axios.get(URL).then((response) =>{
            setCustomer(response.data)
            console.log(response.data)
        })
        .catch((error) => console.log(error.message));
    },[btnId]);
    
    return (
        <div>
            <Navigation/>
            <br/>
                <div className="row m-2">
                    <table className="table table-bordered table-hover bg-dark text-light mt-5">
                        <thead className="table-dark mt-5">
                            <tr>
                                <th>Customer ID</th>
                                <th>Customer Name</th>
                                <th>Customer Email</th>
                                <th>Customer Mobile</th>
                                <th>Customer Dob</th>
                                <th>Customer Address</th> 
                                {/* <th>Action</th>    */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                <tr>
                                    <td>{customer.username}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.contactNo}</td>
                                    <td>{customer.dob}</td>
                                    <td>{customer.address}</td>
                                    {/* <td>
                                    <button onClick={() =>updateCustomer} className="btn btn-info">Update</button>
                                    </td> */}
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
        </div>
    );
}

export default ViewCustomerDetails;