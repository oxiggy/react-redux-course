import React from 'react'
import Spiner from '../spiner'
import ErrorIndicator from '../error-indicator'

const withData = (View, getData) => {
    return class extends React.Component {
        state = {
            data: null
        }
        componentDidMount() {
            getData().then( (data) => this.setState({data}))
        }
        render() {
            const { data } = this.state;
            if(!data) { return <Spiner/> }

            return <View {...this.props} data={data}/>
        }
    }
}

export default withData;

// Функция, которая возращает компонент, который оборачивает компонент с версткой
// внешний берет обязанности, о которых не нужно заботиться внутреннему
// сейчас: брать данные, крутить спинер и показывать ошибку
