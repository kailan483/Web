import React, { Component } from "react";
import "./App.css";
import darkbg from "./imgs/logo.jpg";
class CitySrch extends Component {
    constructor(props) {
        super(props);
        this.state = { city: '', clicked: false, length: -1 };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);  
        this.prevCity = '';      
    }

    handleChange(event) {
        this.setState({ city: event.target.value, clicked: false, length: event.target.value.length });
    }

    handleClick() {
        this.setState({ clicked: true });
    }

    componentDidMount() {
        this.setState({ clicked: false });
    }

    render() {        
        if (this.state.clicked && this.state.length > 0) {
            this.prevCity = this.state.city;
            return (<div className={"citySearch"}>
                <input className={"srchInput"} type="text" value={this.state.city}
                    onChange={this.handleChange}
                    placeholder="Введите город" />
                <button className={"srchBtn"} onClick={this.handleClick}>Поиск</button>
                <WeatherDisplay name={this.state.city} key={this.state.city} />
            </div>);
        } else if (!this.state.clicked && this.prevCity.length > 0){
            return (<div className={"citySearch"}>
                <input className={"srchInput"} type="text" value={this.state.city}
                    onChange={this.handleChange}
                    placeholder="Введите город" />
                <button className={"srchBtn"} onClick={this.handleClick}>Поиск</button>
                <WeatherDisplay name={this.prevCity} key={this.prevCity} />
            </div>);
        }
        else {
            return (<div className={"citySearch"}>
                <input className={"srchInput"} type="text" value={this.state.city}
                    onChange={this.handleChange}
                    placeholder="Введите город" />
                <button className={"srchBtn"} onClick={this.handleClick}>Поиск</button>
                </div>)
        }
    }
}
class WeatherDisplay extends Component {
    constructor() {
        super();
        this.state = {
            weatherData: null
        };
    }

    componentDidMount() {
        const name = this.props.name;
        const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
            name +
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric&lang=ru";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
        });
    }

    render() {
        let weather = '';
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div className={"loadingDiv"}>Loading...</div>;

        if (weatherData.cod == "404") {
            return (<
                div>
                <p className={"err"}> Возникла ошибка при соединении</p>
            </div>);
        } else {                    
            weather = weatherData.weather[0];
            const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
            return (
                <div className={'container'}>
                    <h1>
                        {weatherData.name}, {weather.description}
                        <img src={iconUrl} alt={weatherData.description} />
                    </h1>                    
                    <p>Температура: {weatherData.main.temp}С°</p>
                    <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
                    <p>Давление: {weatherData.main.pressure} мм.рт.ст</p>
                    <p>Влажность: {weatherData.main.humidity}%</p>
                </div>
            );
        }
    }
}
class App extends Component {
    constructor() {
        super();
    }

    render() {
        var styles = {
            background: 'url(' + darkbg + ') ',
        };
        return (
            <div className="App" style={styles}>
                <CitySrch />                
            </div>

        );
    }
}

export default App;