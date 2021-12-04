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
       return axios.get(POLL_API_URL)
    }

    async getPollById(id) {
        return axios.get(POLL_API_URL + "/"+id)
    }

    async getPollbyId2(id) {
        const url =POLL_API_URL + "/" + id
        let response = await fetch(url);
        let data = await response.json();
        console.log(data)
        return  data
    }

    voteYes(id) {
        var link = "/" + id + "/yes"
        return axios.put(POLL_API_URL + link)
    }
    voteNo(id) {
        var link = "/" + id + "/no"
        return axios.put(POLL_API_URL + link)
    }

    async getPollsForUser(email) {
        const url =POLL_API_URL + "/user/" + email
        let response = await fetch(url);
        let data = await response.json();
        return  data
    }

    async getRunningPolls(email) {
        var polls = await this.getPollsForUser(email)
        var selectedPolls = []
        var currentTime = new Date()
        for (let i = 0; i < polls.length; i++) {
            if (polls[i].email == email && currentTime - (new Date(polls[i].duration)*1000) < 0) {
                selectedPolls.push(polls[i])
            } 
        }
        return selectedPolls
    }

    
    checkForStop(poll) {
        if(poll.duration !== 0) {
            this.getStopp(poll.id)
        }
    }

    async getStoppedPolls(email) {
        var polls = await this.getPollsForUser(email)
        var selectedPolls = []
        var currentTime = new Date()
        for (let i = 0; i < polls.length; i++) {
            if (polls[i].email == email && currentTime - (new Date(polls[i].duration)*1000) >= 0) {
                this.checkForStop(polls[i])
                selectedPolls.push(polls[i])
            } 
        }
        return selectedPolls
    }



    async getStopp(id) {
        const link = "/finish/"+id
        await axios.put(POLL_API_URL + link)
    }
}

export default new PollService()