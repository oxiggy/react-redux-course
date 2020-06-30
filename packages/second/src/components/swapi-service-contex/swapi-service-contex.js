import React from 'react'

//React.createContext();
// может принимать опциональный аргумент - значение по умолчанию
// если консюмер не сможет найти значение ни у какого провайдера, будет использовать знач. по умол.

const {
    Provider: SwapiServiceProvider,
    Consumer: SwapiServiceConsumer
} =  React.createContext();

export {
    SwapiServiceProvider,
    SwapiServiceConsumer
}
