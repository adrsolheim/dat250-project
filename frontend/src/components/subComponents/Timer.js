import React, { Component } from 'react'

export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time_left : 0
        }
    }
    componentDidMount () {
        const time_end = new Date(this.props.end_time)
        var time = (time_end* 1000 - (new Date()))
        time = Math.floor(time/1000) // Ignores milliseconds
        this.setState({time_left : time})
        
        this.doInterValChange()
    }
    doInterValChange() {
        console.log("state: ", this.state.time_left)
        
            this.myInterval = setInterval(() => {
                if (this.state.time_left > 0) {
                    this.setState(prevState => ({
                        time_left: prevState.time_left - 1
                    }))
                } else {
                    this.setState({time_left: 0})
                }
            }, 1000)

    }
    componentWillUnmount () {
        clearInterval(this.myInterval)
    }

    render() {
        function secondsToHms(duration) {
            /*
                This function was adapted from a stackoverflow solution from the user:
                Wilson Lee
                The code was last changed on stackoverflow on the: 23 May 2017 at 11:54
                Wilson Lee added the code: 8 May 2017 at 05:21

                link to the code:
                https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript

            */
            
            if (duration <= 0) {
                return "Poll has finished"
            } else {
                var day = Math.floor(duration / (3600*24));
                var hour = Math.floor((duration - day * 24 * 3600) / 3600);
                var min = Math.floor(duration % 3600 / 60);
                var sec = Math.floor(duration % 3600 % 60);
                
                var dDisplay = day > 0 ? day + (day == 1 ? " day, " : " days, ") : "";
                var hDisplay = hour > 0 ? hour + (hour == 1 ? " hour, " : " hours, ") : "";
                var mDisplay = min > 0 ? min + (min == 1 ? " minute, " : " minutes, ") : "";
                var sDisplay = sec > 0 ? sec + (sec == 1 ? " second" : " seconds") : "";
                return dDisplay + hDisplay + mDisplay + sDisplay;
            }
        }

        const {time_left} = this.state
        return (
            <div>
                <p><b>Time left: </b>{secondsToHms(time_left)}</p>
            </div>
        )
    }
}
