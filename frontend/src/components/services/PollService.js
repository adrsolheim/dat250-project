import axios from "axios";

const POLL_API_URL = "http://localhost:8080/api/polls"
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};

class PollService {

    createPoll(poll) {
        
        return axios.post(POLL_API_URL, poll, axiosConfig)
    }

    async getPolls() {
       console.log(POLL_API_URL)
       return axios.get(POLL_API_URL)
    }

    voteYes(id) {
        var link = "/" + id + "/yes"
        return axios.put(POLL_API_URL + link)
    }
    voteNo(id) {
        var link = "/" + id + "/no"
        return axios.put(POLL_API_URL + link)
    }

    async getPollsForUser(mail) {
        var link =  POLL_API_URL + "/user/" + mail
        return axios.get(POLL_API_URL + link)
    }

     

}

export default new PollService()