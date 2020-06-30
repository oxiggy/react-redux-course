import React from 'react'
import {PersonDetails, PersonList} from '../sw-components'
import Row from '../row'

export default class PeoplePage  extends React.PureComponent {

    state = {
        selectedItem: null
    }

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem })
    }

    render() {
        return (
            <Row
                left={ <PersonList onItemSelected={this.onItemSelected}/>}
                right={<PersonDetails itemId={this.state.selectedItem}/>}
            />
        )
    }
    
}
