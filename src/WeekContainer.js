import React from 'react';
import DayCard from './DayCard';
import apiConfig from './apiKeys';
import DegreeToggle from './DegreeToggle'

class WeekContainer extends React.Component {



    state = {
        fullData: [],
        dailyData: [],
        degreeType: "fahrenheit"
    }
    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
    }
    updateForecastDegree = event => {
        this.setState({
            degreeType: event.target.value
        }, () => console.log(this.state))
    }


    componentDidMount = () => {
        const weatherURL =
            `http://api.openweathermap.org/data/2.5/forecast?zip=60563&units=imperial&APPID=${apiConfig.owmKey}`


        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                this.setState({
                    fullData: data.list,
                    dailyData: dailyData
                }, () => console.log(this.state))
            })
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-1 jumbotron">Five Day Forecast☼</h1>
                <DegreeToggle degreeType={this.state.degreeType} updateForecastDegree={this.updateForecastDegree} />
                <h5 className="display-5 text-muted">Texas, US</h5>
                <div className="row justify-content-center">

                    {this.formatDayCards()}
                </div>


            </div>
        )
    }
}

export default WeekContainer;