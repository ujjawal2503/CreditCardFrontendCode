import axios from 'axios'

const BASE_URL = 'http://localhost:9090/api/statement';

class StatementService {
    getAllStatements() {
        return axios.get(BASE_URL + '/getAllStatements');
    }

    getOneStatement(sid) {
        return axios.get(BASE_URL + '/getStatement/' + sid);
    }

    deleteStatement(sid) {
        return axios.delete(BASE_URL + '/' + sid);
    }

    addStatement(statement) {
        return axios.post(BASE_URL, statement);
    }

    updateStatement(statement) {
        return axios.put(BASE_URL, statement);
    }

    getCustomerStatements(username) {
        return axios.get(BASE_URL + '/getStatementsByCustomerId/' + username)
    }

    billStatement(card) {
        return axios.post(BASE_URL + '/getBilledStatement', card)
    }

    unBillStatement(card) {
        return axios.post(BASE_URL + '/getUnbilledStatement', card)
    }

}

export default new StatementService();
