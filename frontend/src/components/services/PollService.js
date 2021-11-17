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
        const polls = await axios.get(POLL_API_URL)
        const selectedPolls = await this.getPollsHelper(mail, polls)
        return selectedPolls
    }

    async getPollsHelper(mail, polls) {
        var selectedPolls = []
        for (let i = 0; i < polls.data.length; i++) {
            if (polls.data[i].email == mail) {
                selectedPolls.push(polls.data[i])
            } 
        }
        return selectedPolls
    }

     

}

export default new PollService()