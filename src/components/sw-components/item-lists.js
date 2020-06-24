import React from 'react'
import ItemList from '../item-list'
import withData from '../hoc-helper/with-data'
import SwapiService from '../../services/swapi-service'

const swapiService = new SwapiService()
const {
    getAllPeople,
    getAllPlanets,
    getAllStarships
} = swapiService


// компонеты высшего порядка оборачивают компоненты и могут взять на себя
// один аспект из аспектов  его работы
// сделаем такой для определения рендер-функции

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
}

const ListWithChildren = withChildFunction(
    ItemList,
    // второй аргумент: рендер-функция в itemlist
    ({name}) => <span>{name}</span>
)
const renderName = ({name}) => <span>{name}</span>
const renderModelAndName = ({model, name}) => <span>{name} ({model})</span>

const PersonList = withData(
                        ListWithChildren,
                        getAllPeople)
const PlanetList = withData(
                        withChildFunction(ItemList, renderName),
                        getAllPlanets)
const StarshipList = withData(
                        withChildFunction(ItemList, renderModelAndName),
                        getAllStarships)

export { PersonList, PlanetList, StarshipList }
