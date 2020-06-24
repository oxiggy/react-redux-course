import React from 'react'
import ItemDetails, { Record } from '../item-details'


import { SwapiServiceConsumer } from '../swapi-service-contex'
// использование SwapiServiceConsumer выглядит громоздко. можно использовать hoc



const PlanetDetails = () => {
    return (
        <SwapiServiceConsumer>
            {
                ({getPlanet, getPlanetImage}) => {
                    return (
                        <ItemDetails
                            itemId={itemId}
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


export default PlanetDetails
