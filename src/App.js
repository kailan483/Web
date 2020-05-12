import React, {Component} from "react";
import "./App.css";
import darkbg from "./imgs/dark.jpg";

var cities = [
    {name: "Hurzuf"},
    {name: "Novinki"},
    {name: "State of Haryāna"},
    {name: "Holubynka"},
    {name: "Republic of India"},
    {name: "Kathmandu"},
    {name: "Laspi"},
    {name: "Mera"},
    {name: "Vinogradovo"},
    {name: "Cherkizovo"},
    {name: "Alupka"},
    {name: "Lichtenrade"},
    {name: "Zavety Ilicha"},
    {name: "Azriqam"},
    {name: "GhUra"},
    {name: "Tyuzler"},
    {name: "Zaponorye"},
];

// class Audio extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             player: ''
//         };
//         this.playerRef = React.createRef();
//         this.playerVolumeUp = this.playerVolumeUp.bind(this);
//     }
//
//     componentDidMount() {
//         this.setState(state => ({
//             player: this.playerRef.current
//         }));
//     }
//
//     playerPlay() {
//         this.state.player.play();
//     }
//
//     playerPause() {
//         this.state.player.pause();
//     }
//
//     playerVolumeUp() {
//         if (this.state.player.volume < 0.9) {
//             this.state.player.volume += 0.1;
//         }
//     };
//
//     playerVolumeDown() {
//         if (this.state.player.volume > 0.1)
//             this.state.player.volume -= 0.1;
//     }
//
//     Next() {
//         this.state.player.currentTime += 10;
//     }
//
//     Prev() {
//         this.state.player.currentTime -= 10;
//     }
//
//
//     render() {
//         return (
//             <div className="player">
//                 <audio ref={this.playerRef} src={"http://www.nihilus.net/soundtracks/Static%20Memories.mp3"}/>
//                 <button onClick={this.playerPlay.bind(this)}>Воспроизведение</button>
//                 <button onClick={this.playerPause.bind(this)}>Пауза</button>
//                 <button onClick={this.playerVolumeUp.bind(this)}>Громкость +</button>
//                 <button onClick={this.playerVolumeDown.bind(this)}>Громкость -</button>
//                 <div>
//                     <button onClick={this.Next.bind(this)}>Вперед</button>
//                     <button onClick={this.Prev.bind(this)}>Назад</button>
//                 </div>
//             </div>
//
//         );
//     }
// }

class CitySrch extends Component {
    constructor(props) {
        super(props);
        this.state = {city: '', clicked: false, length: -1};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({city: event.target.value, clicked: false, length: event.target.value.length});
    }

    handleClick() {
        this.setState({clicked: true});
    }

    componentDidMount() {
        this.setState({clicked: false});
    }

    render() {
        var tmp = this.props.city,
            tmp = this.state.city.trim().toLowerCase();
        var errStyle={borderColor:'red'};
        var errStyle={borderColor:'initial'};
        if (this.state.clicked && this.state.length > 0) {
            return (<div className={"citySearch"}>
                <input className={"srchInpt"} type="text" value={this.state.city}
                       onChange={this.handleChange}
                       placeholder="Введите город"/>
                <button className={"srchBtn"} onClick={this.handleClick}>Поиск</button>
                <WeatherDisplay name={this.state.city}/>
            </div>);
        } else if (this.state.length == -1) {
            return (<div className={"citySearch"}>
                <input className={"srchInpt"} type="text" value={this.state.city}
                       onChange={this.handleChange}
                       placeholder="Введите город"/>
                <button className={"srchBtn"} onClick={this.handleClick}>Поиск</button>
            </div>);
        } else {
            return (<div className={"citySearch"}>
                <input className={"srchInpt"} type="text" value={this.state.city}
                       onChange={this.handleChange}
                       placeholder="Введите город"/>
                <button className={"srchBtn"} onClick={this.handleClick}>Поиск</button>
            </div>);
        }
    }
}

class Butt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            clicked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            clicked: true
        }));
    }


    render() {
        var i = 0;
        var CityName = this.props.name;
        if (this.state.clicked)
            return (<WeatherDisplay name={CityName}/>);
        else
            return (<button onClick={this.handleClick}>{CityName}</button>);

    }
}

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {searchString: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({searchString: event.target.value});
    }

    render() {
        var cities = this.props.items,
            searchString = this.state.searchString.trim().toLowerCase();
        if (searchString.length > 0) {
            cities = cities.filter(function (l) {
                return l.name.toLowerCase().match(searchString);
            });
        }
        return (<div>
            <input type="text" value={this.state.searchString} onChange={this.handleChange}
                   placeholder="Введите город"/>
            <ul>
                {cities.map(function (l) {
                    return <li><Butt name={l.name}/></li>
                })}
            </ul>

        </div>);
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
            "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({weatherData: json});
        });
    }

    render() {
        let weather = '';
        const weatherData = this.state.weatherData;
        if (!weatherData) return <div>Loading...</div>;

        if (weatherData.cod == "404") {
            return (<
                div>< p
                className={"err"}> Что-то
                пошло
                не
                так
                ...</p></div>);
        } else {
            weather = weatherData.weather[0];
            const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
            return (
                <div>
                    <h1>
                        {weather.main} in {weatherData.name}
                        <img src={iconUrl} alt={weatherData.description}/>
                    </h1>
                    <p>Current: {weatherData.main.temp}С°</p>
                    <p>Highest: {weatherData.main.temp_max}С°</p>
                    <p>Lowest: {weatherData.main.temp_min}С°</p>
                    <p>Wind Speed: {weatherData.wind.speed} м/с</p>
                </div>
            );
        }
    }
}

// class Timer extends Component {
//     constructor() {
//         super();
//         this.state = {
//             elapsed: 0
//         };
//         this.tick = this.tick.bind(this);
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick() {
//         this.setState(state => ({
//             elapsed: 0
//         }));
//     }
//
//     tick() {
//         this.setState((state, props) => {
//             return ({elapsed: new Date() - props.start});
//         })
//     }
//
//     componentDidMount() {
//         this.setState({start: Date.now()});
//         this.timer = setInterval(this.tick, 1000);
//     }
//
//     componentWillUnmount() {
//         clearInterval(this.timer);
//     }
//
//     render() {
//         let elapsed = Math.round(this.state.elapsed / 1000);
//         return (<p>This tab was opened <b>{elapsed} seconds</b> ago.</p>);
//     }
// }

class App extends Component {
    constructor() {
        super();
    }

    render() {
        var styles = {
            backgroundSize: '100%',
            backgroundImage: 'url(' + darkbg + ')'
        };
        return (
            <div className="App" style={styles}>
                <CitySrch/>
                {/*<Sort items={cities}/>*/}
            </div>

        );
    }
}

export default App;