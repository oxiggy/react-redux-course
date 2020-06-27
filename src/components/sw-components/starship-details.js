import React from 'react'
import ItemDetails, { Record } from '../item-details'

import { SwapiServiceConsumer } from '../swapi-service-contex'
// использование SwapiServiceConsumer выглядит громоздко. можно использовать hoc


const StarshipDetails = ({itemId}) => {
    return (
        <SwapiServiceConsumer>
            {
                ({getStarship, getStarshipImage}) => {
                    return (
                        <ItemDetails
                            itemId={itemId}
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

export default StarshipDetails
