import React from 'react'
import Spiner from '../spiner'
import ErrorIndicator from '../error-indicator'

const withData = (View) => {
    return class extends React.Component {
        state = {
            data: null,
            loading: true,
            error: false
        }
        componentDidUpdate(prevProps) {
            if (this.props.getData != prevProps.getData) {
                this.update()
            }
        }

        componentDidMount() {
            this.update()
        }

        update () {
            this.setState({
                loading: true,
                error: false
            })
            this.props.getData()
                .then( (data) => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
                .catch( () => {
                    this.setState({
                        error: true,
                        loading: false
                    })
                })
        }

        render() {
            const { data, error, loading } = this.state;
            if (loading) { return <Spiner/> }
            if (error) {return <ErrorIndicator/>}

            return <View {...this.props} data={data}/>
        }
    }
}

export default withData;

// Функция, которая возращает компонент, который оборачивает компонент с версткой
// внешний берет обязанности, о которых не нужно заботиться внутреннему
// сейчас: брать данные, крутить спинер и показывать ошибку
