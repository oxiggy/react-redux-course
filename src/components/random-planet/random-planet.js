import React, { Component } from 'react';

import './random-planet.css';
import SwapiService from '../../services/swapi-service'
import Spiner from '../spiner/spiner'
import ErrorIndicator from '../error-indicator'

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false,
    }

//    Убираем обращение к api из constructor в componentDidMount
//    constructor() {
//        super();
//        console.log('constructor')
//
//        this.updatePlanet();
//        /* в ООП конструктор не должен иметь сайд-эффекты,
//        например вызывает запросы к серверу.
//        unmounted компонент кже создан, но не до конца проинициализирован в дерево компонентов приложения.
//        До того, как компонент будет Mounted (и затем вызовет componentDidMount),
//        использовать setState нельзя.
//        */
//
//        //this.interval = setInterval(() => this.updatePlanet(), 1500)
//        /* используем стрелочную функцию (или бинд.this), потому что функция updatePlanet не встрелочная  */
//        //clearInterval(this.interval);
//        /* Если вкл\выкл компонент, нужно запускать setInterval с id и очищать его после перезапуска компонента,
//        чтобы не накапливать их */
//    }

    componentDidMount() {
        const { updateInterval } = this.props;
        // компонент > рендер помещает верстку в дом > componentDidMount
        // дом полностью создан, сторонние библиотеки могут начать свою инициализацию, используя дом-элементы
        console.log('RandomPlanet componentDidMount')
        this.updatePlanet();
        this.interval = setInterval(() => this.updatePlanet(), updateInterval)
    }

    componentWillUnmount() { // когда компонент удаляется
        // убираем запущенные таймауты, отмена запросов к серверу, отписка от вебсокета
        // подключенные библиотеки могут делать грязные делишки после удаления компонента из дом-дерева
        console.log('RandomPlanet componentWillUnmount')
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // выполняется после обновления пропов или стейта
        // можно запрашивать новые данные для обновленных свойств
        console.log('RandomPlanet componentDidUpdate')
    }

    onPlanetLoaded = (planet) => {
        this.setState({planet, loading: false})
    }

    onError = (err) => {
        this.setState({ error: true, loading: false})
    }

    updatePlanet() {
        //const id = 1300
        const id = Math.floor(Math.random()*25 + 3);
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
        /*  когда выполняем любую ассинхронную опперацию,
            которая теоретически может привести к ошибке,
            нужно эту ошибку обработать( catch к обработке промиса ) */
        /* с async сложнее. нужно обернуть блок await в трай и кетч  */
    /*
    Рефакторим на ивент-листенер onPlanetLoaded (?)
    Он стрелочный, т.к. передаем его в др функцию
    .then((planet) => {
                console.log(planet);
                this.setState({
                    id,
                    name: planet.name,
                    population: planet.population,
                    rotationPeriod: planet.rotation_period,
                    diameter: planet.diameter
                })
            })
     */
    }

    render() {
        console.log('RandomPlanet render')
        const { planet, loading, error} = this.state;

        const hasData = !(loading || error)

        const errorMessage = error ? <ErrorIndicator/> : null
        const spiner = loading ? <Spiner/> : null
        const content = hasData ?  <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
                {spiner}
                {content}
            </div>

        );
    }

//   static defaultProps = {
//       updateInterval: 10000
//   }
}

RandomPlanet.defaultProps = {
    updateInterval: 10000
}
RandomPlanet.propTypes = {
    updateInterval: (props, propName, componentName) => {
        const value = props[propName] // получили значение, которое нам передал пользователь

        if( typeof value === 'number' && !isNaN(value)) { return null;}
        return new TypeError(`${componentName}: ${propName} must be number`)
    }
}


const PlanetView = ({ planet }) => {
    const  { id, name, population, rotationPeriod, diameter } = planet

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span> {population} </span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span> {rotationPeriod} </span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span> {diameter} </span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
