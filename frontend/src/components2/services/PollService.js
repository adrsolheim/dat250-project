import axios from "axios";

const POLL_API_URL = "http://localhost:8080/api/polls"

class PollService {

    createPoll(poll) {
        console.log(poll)
        return axios.post(POLL_API_URL, poll)
    }

    async getPolls() {
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
}

export default new PollService()