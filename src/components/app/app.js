import React from 'react';
import './app.css';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button'
import ErrorIndicator from '../error-indicator'
import ErrorBoundry from '../error-boundry'
import ItemDetails from '../item-details'
import {Record} from '../item-details/item-details'

import SwapiService from '../../services/swapi-service'
import DummySwapiService from '../../services/dummy-swapi-service'

import { SwapiServiceProvider } from '../swapi-service-contex'

import { PersonDetails, PlanetDetails, StarshipDetails, PersonList, PlanetList, StarshipList } from '../sw-components'


export default class App extends React.Component {

    state= {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new DummySwapiService()
    }

    onServiceChange = () => {
        // зависим от предыдущего состояния = передаем функцию
        this.setState( ({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            return {
                swapiService: new Service()
            }
        })
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    componentDidCatch(error, errorInfo) {
        // компоненты, содержащие componentDidCatch, называютяс эррор-баундри
        // после ошибки всё содержимое компонента удаляется
        // так мы можем "убивать" функциональные части приложения, в не всё сразу

        // componentDidCatch работает с ошибками в методах жизненного цикла (рендер, компонентМоунт и тд)
        // ошибки из ивент-листенеров не обрабатываются (то, что передаем компоненту в онклик)
        // ошибки async колбеках не обрабатываются

        console.log('App componentDidCatch')
        this.setState({hasError: true})
    }

    render() {
        if(this.state.hasError) { return <ErrorIndicator/> }

        const { showRandomPlanet } = this.state;
        //const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService

        return (
            <>
                <ErrorBoundry>
                    <SwapiServiceProvider value={this.state.swapiService}>
                        <Header onServiceChange={this.onServiceChange} />
                        {showRandomPlanet && <RandomPlanet />}
                        <button
                            className="toggle-planet btn btn-warning btn-lg"
                            onClick={this.toggleRandomPlanet}>
                            Toggle Random Planet
                        </button>
                        <ErrorButton/>
                        <PersonDetails itemId={3}/>
                        <PlanetDetails itemId={3}/>
                        <StarshipDetails itemId={3}/>

                        <PersonList/>
                        <StarshipList/>
                        <PlanetList/>
                    </SwapiServiceProvider>
                </ErrorBoundry>










                {/* до ввода обертки для компонента + рендер функция
                            <PersonList> {({name}) => <span>{name}</span>} </PersonList>    */}

                {/*<ErrorBoundry><Row left={personDetails} right={starshipDetails}/></ErrorBoundry>*/}

                {/*
                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            //renderItem={(item) => item.name}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarships}
                            //renderItem={(item) => <span>{item.name} <button>!</button></span>}
                        />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
                */}

            </>
        )
    }
}
