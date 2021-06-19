import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api/login';

class LoginService{
    loginUser(loginrequest) {
        return axios.post(BASE_URL,loginrequest);
      }
}

export default new LoginService();