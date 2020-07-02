import React,  {useContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/// старый пример:
// создаем контекст React.createContext(),
// оборачиваем Provider все компоненты, которым пригодится контекст
// используем Consumer, чтобы прочитать значение
const MyContext = React.createContext();
const App = () => {
    return (
        <MyContext.Provider value="Hello">
            <ChildOld/>
            <Child/>
        </MyContext.Provider>
    )
}
const ChildOld = () => {
    return (
        <MyContext.Consumer>
            {(value) => {
                return (
                    <p> {value}</p>
                )
            }}
        </MyContext.Consumer>
    )
}

// создание контекста и провайдер не изменяются
// получаем выбранный объект-контекст в переменную
const Child = () => {
    const value = useContext(MyContext)
    return (
        <p> {value} </p>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
