import React, { Component } from "react";
import "./App.css";

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: ''
        };
        this.playerRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.setState(state => ({
            player: this.playerRef.current
        }));
    }

    playerPlay() {
        this.state.player.play();
    }

    playerPause() {
        this.state.player.pause();
    }

    playerVolumeUp() {
        if (this.state.player.volume < 0.9) {
            this.state.player.volume += 0.1;
        }
    };

    playerVolumeDown() {
        if (this.state.player.volume > 0.1)
            this.state.player.volume -= 0.1;
    }

    Next() {
        this.state.player.currentTime += 10;
    }

    Prev() {
        this.state.player.currentTime -= 10;
    }
    handleChange(event) {
        this.state.player.src = event.target.value;
    }

    render() {
        return (
            <div>
                <div className="player">
                    {/*autoPlay={"autoplay"}*/}
                    <audio ref={this.playerRef}
                        src={"https://html5book.ru/examples/media/track.mp3"} controls />

                </div>
                <div className={"buttons"}>
                    <button onClick={this.playerPlay.bind(this)}>Воспроизведение</button>
                    <button onClick={this.playerPause.bind(this)}>Пауза</button>
                    <button onClick={this.playerVolumeUp.bind(this)}>Громкость +</button>
                    <button onClick={this.playerVolumeDown.bind(this)}>Громкость -</button>
                    <div>
                        <button onClick={this.Next.bind(this)}>Вперед</button>
                        <button onClick={this.Prev.bind(this)}>Назад</button>
                    </div>
                </div>
                <div className={"wrapper"}>
                <div className={"container"}>
                    <select value={this.state.value} onChange={this.handleChange} >
                        <option value="http://audiomod.ru/track/Линда%20-%20Сделай%20так.wav">Сделай так</option>
                        <option value="http://audiomod.ru/track/Flёur%20-%20Тёплые%20коты.wav">Теплые коты</option>
                        <option value="http://audiomod.ru/track/Flёur%20-%20Два%20облака.wav">Два облака</option>
                    </select>                    
                </div>
                <div class="select-icon">
                        <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" class="icon">
                            <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
                        </svg>
                </div>
                </div>
                
            </div>


        );
    }
}
class Timer extends Component {
    constructor() {
        super();
        this.state = {
            elapsed: 0
        };
        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            elapsed: 0
        }));
    }

    tick() {
        this.setState((state, props) => {
            return ({ elapsed: new Date() - props.start });
        })
    }

    componentDidMount() {
        this.setState({ start: Date.now() });
        this.timer = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        let elapsed = Math.round(this.state.elapsed / 1000);
        return (<p>This tab was opened <b>{elapsed} seconds</b> ago.</p>);
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            activePlace: 0
        };
    }

    render() {
        let datenow = Date.now();
        return (
            <div className="App">
                <Audio />
                {
                    <div className={"timer"}>
                        <Timer start={datenow} />
                    </div>
                }
            </div>

        );
    }
}


export default App;