import React from 'react'
import Row from '../row'
import {StarshipDetails, StarshipList} from '../sw-components'


export default class StarshipPage extends React.PureComponent {
    state = {
        selectedItem: null
    }

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem})
    }

    render() {
        return (
            <Row
                left={<StarshipList onItemSelected={this.onItemSelected}/>}
                right={<StarshipDetails itemId={this.state.selectedItem}/>}
            />
        )
    }
}
