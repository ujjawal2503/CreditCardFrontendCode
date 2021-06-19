import axios from 'axios'

const URL='http://localhost:9090/customer/getCustomer'
const URL2='http://localhost:9090/customer/updateCustomer'
const URL3='http://localhost:9090/customer/addCustomer'
const URL4='http://localhost:9090/customer/removeCustomer'

class CustomerServices{

    addCustomer(customer)
    {
        return axios.post(URL3,customer);    
    }
    deleteCustomer(username)
    {
        return axios.delete(URL4+'/'+username);
    }
    getCustomer(username)
    {
        return axios.get(URL+'/'+username);
    }
    updateCustomer(customer)
    {
        return axios.put(URL2,customer);
    }
}

export default new CustomerServices()