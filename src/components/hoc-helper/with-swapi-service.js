import React from 'react'
import { SwapiServiceConsumer } from '../swapi-service-contex'

const withSwapiService = (Wrapped, mapMethodsToProps) => {

    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        // когда получили сервис, мапим его и передаем эти новые пропс
                        const serviceProps = mapMethodsToProps(swapiService)

                        return (
                            <Wrapped
                                {...props}
                                {...serviceProps}
                                 //swapiService={swapiService}
                            />
                        )
                    }
                }
            </SwapiServiceConsumer>
        )
    }
}

export default withSwapiService;
