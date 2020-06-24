import React from 'react'
import ItemDetails, { Record } from '../item-details'

import { SwapiServiceConsumer } from '../swapi-service-contex'
import { withSwapiService } from '../hoc-helper'


const PersonDetails = ({itemId, swapiService}) => {
    const { getPerson, getPersonImage } = swapiService

    return (
        <ItemDetails
            itemId={itemId}
            getData={getPerson}
            getImageUrl={getPersonImage}
        >
            <Record field='gender' label="Gender"/>
            <Record field='eyeColor' label="Eye Color"/>
            <Record field='birthYear' label='Birth Year'/>
        </ItemDetails>
    )
}


const PersonDetailsOld = ({itemId}) => {
    return (
        <SwapiServiceConsumer>
            {
                ({getPerson, getPersonImage}) => {
                    return (
                        <ItemDetails
                            itemId={itemId}
                            getData={getPerson}
                            getImageUrl={getPersonImage}
                        >
                            <Record field='gender' label="Gender"/>
                            <Record field='eyeColor' label="Eye Color"/>
                            <Record field='birthYear' label='Birth Year'/>
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>

    );
}


export default withSwapiService(PersonDetails)
