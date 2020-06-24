import React from 'react'
import ItemDetails, { Record } from '../item-details'


//import SwapiService from '../../services/swapi-service'
//const swapiService = new SwapiService()
// создаем собственный инстанс свапи-сервиса
// подход работает, но это не похволяет заменить нам сервис на другую реализацию (мокап для тестов)

// другая причина: передавать зависимости лучше, чем компоненты создают свои копии сервисов.
// ООП: dependence injection ( D в SOLID)
// контекст решает проблему
// const {getPerson, getPlanet, getStarship, getPersonImage, getStarshipImage, getPlanetImage} =  swapiService

import { SwapiServiceConsumer } from '../swapi-service-contex'



const PersonDetails = ({itemId}) => {
    return (
        <SwapiServiceConsumer>
            {
                //(swapiService) => {
                ({getPerson, getPersonImage}) => {
                    return (
                        <ItemDetails
                            itemId={11}
                            getData={getPerson}
                            getImageUrl={getPersonImage}
                            //fields={ [
                            //    { field: 'gender', label: 'Gender'}
                            //]}
                            // работает, но не в духе Реакта
                        >
                            <Record field='gender' label="Gender"/>
                            <Record field='eyeColor' label="Eye Color"/>
                            <Record field='birthYear' label='Birth Year'/>
                            {/* Record не может получить item тут, потому что он появляется после монтирования ItemDetails */}
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>

    );
}
const PlanetDetails = () => {
    return (
        <SwapiServiceConsumer>
            {
                ({getPlanet, getPlanetImage}) => {
                    return (
                        <ItemDetails
                            itemId={5}
                            getData={getPlanet}
                            getImageUrl={getPlanetImage}
                        >
                            <Record field='population' label="Population"/>
                            <Record field='rotationPeriod' label="Rotation Period"/>
                            <Record field='diameter' label="Diameter"/>
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>
    );
}
const StarshipDetails = () => {
    return (
        <SwapiServiceConsumer>
            {
                ({getStarship, getStarshipImage}) => {
                    return (
                        <ItemDetails
                            itemId={5}
                            getData={getStarship}
                            getImageUrl={getStarshipImage}
                        >
                            <Record field='model' label="model"/>
                            <Record field='manufacturer' label="Manufacturer"/>
                            <Record field='costInCredits' label="Cost In Credits"/>
                            <Record field='lenght' label="Lenght"/>
                            <Record field='crew' label="Crew"/>
                            <Record field='passengers' label="Passengers"/>
                            <Record field='cargoCapacity' label="Cargo Capacity"/>
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>

    );
}

export { PersonDetails, PlanetDetails, StarshipDetails }
