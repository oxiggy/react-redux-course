import React, {Component} from 'react'

import './item-details.css'

const Record = ({item, field, label}) => {
    console.log('SHOW RECORD', field)
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Record}

export default class ItemDetails extends Component {


    state = {
        item: null,
        image: null,
    }

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        // если мы в DidUpdate запускаем действия, которые приведут к setState,
        // нужно обернуть код в условие, чтобы не уйти в вечный цикл обновления
        if (this.props.itemId != prevProps.itemId) {
            this.updateItem()
        }
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props
        if (!itemId) {
            return
        }

        getData(itemId)
            .then((item) => {
                this.setState({item, image: getImageUrl(item)})
            })
    }


    render() {
        const {item, image} = this.state

        console.log('ITEM', this.props.itemId, item)
        if (!item) {
            return <span>Select a item from a list</span>
        }

        return (
            <div className="person-details card">
                <img className="person-image"
                     src={image}/>

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {/*this.props.children*/}
                        {React.Children.map(this.props.children, (child) => {
                            //return child; //вернули тот же child

                            // нужно передать копию item в каждый компонент Record
                            //children.item=item для этого есть функция:
                            return React.cloneElement(child, {item})
                            // второй параметр - дополнительные свойства для child
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
