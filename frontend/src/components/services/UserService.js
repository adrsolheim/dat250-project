import axios from "axios";

const USER_API_URL = "http://localhost:8080/api/users"

class UserService {

    createPoll(poll) {
        console.log(poll)
        return axios.post(USER_API_URL, poll)
    }

    async getPolls() {
       return axios.get(USER_API_URL)
    }

    voteYes(id) {
        var link = "/" + id + "/yes"
        return axios.put(USER_API_URL + link)
    }
    voteNo(id) {
        var link = "/" + id + "/no"
        return axios.put(USER_API_URL + link)
    }
    
    async getUserFromMail(mail) {
        var users = await axios.get(USER_API_URL)
        console.log(users)
        for (let i = 0; i < users.data.length; i++) {
           if (mail == users.data[i].email) {
               console.log(users.data[i])
               return users.data[i]
           }

          }
    }

}

export default new UserService()