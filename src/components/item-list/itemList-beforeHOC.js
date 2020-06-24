import React, { Component } from 'react';

import './item-list.css';
import Spiner from '../spiner'
import SwapiService from '../../services/swapi-service'

class ItemListOld extends Component {
    // swapiService = new SwapiService();
///     state = { itemList: null }
///     componentDidMount() {
///         const { getData } = this.props;
///         getData().then( (itemList) => this.setState({itemList}))
///         //this.swapiService.getAllPeople().then( (peopleList)=>{ this.setState({peopleList})} )
///     }
/// перенесли в обертку

    renderItems(arr) {
        return arr.map( (item) => {
            const { id } = item

            ///const label = this.props.renderItem(item) ///уходим
            const label = this.props.children(item)
            return (
                <li
                    className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            );
        })
    }

    render() {
///        const { itemList } = this.state;
///        if(!itemList) { return <Spiner/> }

        const { data } = this.props;
        const items = this.renderItems(data)
        //const items = this.renderItems(itemList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

const ItemList = (props) => {
    const { data, onItemSelected, children: renderLabel } = props;

    const items = data.map( (item) => {
        const { id } = item
        const label = renderLabel(item)
        return (
            <li className="list-group-item" key={id} onClick={() => onItemSelected(id)}>
                {label}
            </li>
        );
    })

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

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

/// Разделили компонент на две части: отрисовка ItemList и компонент для работы с сетью withData
/// Функция-обертка для того, чтобы мы могли кастомизировать,
//    выбирать, какой именно компонент занимается отображением данных.
// т.к. ItemList не содержит состояния\стейт, сделаем из него компонент-функцию
// ещё  getData передадим явно
const { getAllPeople } = new SwapiService()

export default withData(ItemList, getAllPeople);
// создаем hoc-helpers и выносим обертку туда :с
