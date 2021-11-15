import axios from "axios";

const POLL_API_URL = "http://localhost:8080/api/polls"

class PollService {

    async getPolls() {
        const response = await fetch(POLL_API_URL);
        const body = await response.json();
        this.setState({polls: body});
    }

    createPoll(poll) {
        console.log(poll)
        return axios.post(POLL_API_URL, poll)
    }
}

export default new PollService()