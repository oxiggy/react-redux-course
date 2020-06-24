import React from 'react'
import './people-page.css'
import ItemList from '../item-list'
import PersonDetails from '../person-details'
import ErrorButton from '../error-button'
import SwapiService from '../../services/swapi-service'
import ErrorBoundry from '../error-boundry'
import Row from '../row'

export default class PeoplePage extends React.Component {

    swapiService= new SwapiService();

    state= {
        selectedPerson: 1,
    }

    onPersonSelected = (id) => {
        this.setState( {selectedPerson: id})
    }

    render() {

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                //renderItem={(item) => `${item.name} (${item.gender}, ${item.birthYear})`}
                ///renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}
            >
                {(item) => `${item.name} (${item.birthYear})`}
            </ItemList>
        )

        const details = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson}/>
                <ErrorButton className="error-button-person"/>
            </ErrorBoundry>
        )

        return (
            <Row left={itemList} right={details}/>
        )
    }
}
