import axios from 'axios'

 const uri='http://localhost:9090/transaction/removeTransaction'
 const uri1='http://localhost:9090/transaction/addTransaction'
 const uri2='http://localhost:9090/creditCard/addCreditCard'
 const uri3='http://localhost:9090/creditCard/deleteCreditCard'
 const uri4='http://localhost:9090/creditCard/updateCreditCard'
 const uri5='http://localhost:9090/creditCard/getCreditCard'
class Service
{   

    DeleteTransaction(transactionId){
        return axios.delete(uri+'/'+transactionId);
    }
    addTransaction(transaction)
    {
        return axios.post(uri1,transaction);
    }
    addCard(creditCard)
    {
        return axios.post(uri2,creditCard);
    }
    DeleteCard(cardNumber)
    {
        return axios.delete(uri3+'/'+cardNumber);

    }
    getCard(cardNumber)
    {
        return axios.get(uri5+'/'+cardNumber);
    }
    updateCard(creditCard)
    {
        return axios.put(uri4,creditCard);
    }
}




export default new Service()