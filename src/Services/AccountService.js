import axios from 'axios'
const ACCOUNT_API_BASE_URL = "http://localhost:9090/accounts"

class AccountService{

    getAllAccounts()
    {
return axios.get(ACCOUNT_API_BASE_URL+"/"+"getAllAccounts")
    }
    
    createAccount(account)
    {
        return axios.post(ACCOUNT_API_BASE_URL+"/"+"addAccount",account)
    }

    getAccountById(accountId)
    {
return axios.get(ACCOUNT_API_BASE_URL+"/"+"getAccount"+"/"+`${accountId}`)
    }
    updateAccount(accountId,account)
    {
        return axios.put(ACCOUNT_API_BASE_URL+"/"+"updateAccount"+"/"+accountId,account)
    }
    deleteAccount(accountId)
    {
return axios.delete(ACCOUNT_API_BASE_URL+"/"+"deleteAccount"+"/"+accountId)
    }
}

export default new AccountService()