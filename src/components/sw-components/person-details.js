import React from 'react'
import ItemDetails, { Record } from '../item-details'

//import { SwapiServiceConsumer } from '../swapi-service-contex'
import { withSwapiService } from '../hoc-helper'

/// const PersonDetails = ({itemId, getData, getImageUrl }) => {
const PersonDetails = (props) => {
    ///const { getPerson, getPersonImage } = swapiService

    return (
        <ItemDetails
            {...props}
            ///itemId={itemId}
            ///getData={getData}
            ///getImageUrl={getImageUrl}
        >
            <Record field='gender' label="Gender"/>
            <Record field='eyeColor' label="Eye Color"/>
            <Record field='birthYear' label='Birth Year'/>
        </ItemDetails>
    )
}


//const PersonDetailsOld = ({itemId}) => {
//    return (
//                <SwapiServiceConsumer>
//            {
//                ({getPerson, getPersonImage}) => {
//                    return (
//                        <ItemDetails
//                            itemId={itemId}
//                            getData={getPerson}
//                            getImageUrl={getPersonImage}
//                        >
//                            <Record field='gender' label="Gender"/>
//                            <Record field='eyeColor' label="Eye Color"/>
//                            <Record field='birthYear' label='Birth Year'/>
//                        </ItemDetails>
//                    )
//                }
//            }
//        </SwapiServiceConsumer>
//
//            );
//}

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
}
/// функция, которая берет сервис и назначает его методы свойством компонена
/// мы можем передать эту функцию в hoc withD... и тогда мы будем получать нужные нам свойства.
/// деструктуризация не нужна.

export default withSwapiService(PersonDetails, mapMethodsToProps)
