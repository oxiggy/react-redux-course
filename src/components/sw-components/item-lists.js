import React from 'react'
import ItemList from '../item-list'
import { withData, withSwapiService } from '../hoc-helper'

///import SwapiService from '../../services/swapi-service'
///const swapiService = new SwapiService()
///const {getAllPeople, getAllPlanets, getAllStarships} = swapiService


// компонеты высшего порядка оборачивают компоненты и могут взять на себя
// один аспект из аспектов  его работы
// сделаем такой для определения рендер-функции

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
}

const renderName = ({name}) => <span>{name}</span>
const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>

const mapPersonMethodsToProps = (swapiService) => {
    return { getData: swapiService.getAllPeople}
}
const mapPlanetMethodsToProps = (swapiService) => {
    return { getData: swapiService.getAllPlanets}
}
const mapStarshipMethodsToProps = (swapiService) => {
    return { getData: swapiService.getAllStarships}
}

//const PersonList = withSwapiService(  withData(withChildFunction(ItemList, renderName)),  mapPersonMethodsToProps)
//const PlanetList = withSwapiService(  withData(withChildFunction(ItemList, renderName)),  mapPlanetMethodsToProps)
//const StarshipList = withSwapiService(  withData(withChildFunction(ItemList, renderModelAndName)),  mapStarshipMethodsToProps)

const PersonList = withSwapiService(mapPersonMethodsToProps)(
    withData(
        withChildFunction(renderName)(
            ItemList)) )
const PlanetList = withSwapiService (mapPlanetMethodsToProps)(
    withData(
        withChildFunction(renderName)(
            ItemList
        )))
const StarshipList = withSwapiService(mapStarshipMethodsToProps)(
    withData(
        withChildFunction(renderModelAndName)(
            ItemList
        )
    )
)

export { PersonList, PlanetList, StarshipList }




/// рефакторинг. в withData больше не нужно передавать функцию в явном виде.
/// мы её получим из контекста (и таи же размапим)
//const ListWithChildren = withChildFunction(
//    ItemList,
//    // второй аргумент: рендер-функция в itemlist
//    ({name}) => <span>{name}</span>
//)
//const renderName = ({name}) => <span>{name}</span>
//const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>
//
//const PersonList = withData(
//                        ListWithChildren,
//                        getAllPeople)
//const PlanetList = withData(
//                        withChildFunction(ItemList, renderName),
//                        getAllPlanets)
//const StarshipList = withData(
//                        withChildFunction(ItemList, renderModelAndName),
//                        getAllStarships)
