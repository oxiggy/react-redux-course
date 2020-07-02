import React,  {Component, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// useEffect похож на методы жизненного цикла,
// реализует свою собственную механику, работая с "пообчными" эффектами
// эф - таймауты, запросы на сервер

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>
                    +
                </button>
                <button onClick={() => setVisible(false)}>
                    hide
                </button>
                <ClassCounter value={value}/>
                <HookCounter value={value}/>
            </div>
        )
    } else {
        return (
            <button onClick={() => setVisible(true)}>
                show
            </button>
        )
    }
}

const HookCounter= ({value}) => {

    // useEffect может проверять, какие  пропы изменились, как componentDidUpdate
    // для этого вторым аргументом передаем их [a, b]
    // если передать [], сработает один раз как componentDidMount
    useEffect(() => {
        console.log('HookCounter useEffect')

        // часто в useEffect будем запускать таймеры, запускать запросы к серверу - нужно очистить
        // для очистки нужно вернуть функцию, к. будет вызвана, когда эф нужно будет очистить
        return () => console.log('clear useEffect')
        // работает примерно как componentWillUnmount, но срабатывает и тогда,
        // когда нужно запустить след.эффект
    }, [value])
    /// итог: useEffect отличается от методов жизненного цикла.
    /// заставляет думать о том, как реагировать на изменение пропов


    return <p> {value} </p>
}

class ClassCounter extends Component {
    componentDidMount() {
        // updateItem()
        console.log('class: mount')
    }
    componentDidUpdate() {
        // ранее обновляли компонент,
        // когда изменялись определенные свойства
        // props.itemId != prevProps.itemId updateItem()
        console.log('class: update')
    }
    componentWillUnmount() {
        console.log('class: unmount')
    }
    render () {
        return <p>{this.props.value}</p>
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

