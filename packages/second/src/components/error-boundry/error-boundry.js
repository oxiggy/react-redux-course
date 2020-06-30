import React from 'react'
import ErrorIndicator from '../error-indicator'

export default class ErrorBoundry extends React.Component {
    state = {
        hasError: false
    }
    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true})
    }

    render() {
        if(this.state.hasError) { return <ErrorIndicator/> }

        // получает элементы и рендерит их
        return this.props.children;
    }
}
