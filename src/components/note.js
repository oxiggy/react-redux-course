import React from 'react'
import ItemList from './item-list'

const f = (a) => {
    return (b) => {
        console.log(a+b)
    }
}

f(1)(2)

///

const f = () => {
    //return NameClass;
    // вернем класс без имени
    return class extends React.Component {

        //componentDidMount() {
        //    console.log(this.props) // перекидываем все свойства на наш класс
        //}

// выносим в него всю логикуЖ хагрузка данных,  логика, ошибки,индикатор загрузки

        render() {
            return <ItemList {...this.props} />
            //return <p>Hi</p>
        }
    };
}
//export default f();
