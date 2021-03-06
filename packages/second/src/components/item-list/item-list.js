import React from 'react';
import PropTypes from 'prop-types'
import './item-list.css';

const ItemList = (props) => {

    const { data, onItemSelected, children: renderLabel } = props;

    const items = data.map((item) => {
        const { id } = item;
        const label = renderLabel(item);

        return (
            <li className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        );
    });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
};

ItemList.default = {
    onItemSelected: () => {}
}

ItemList.propTypes = {
    onItemSelected: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.func.isRequired
}

export default ItemList;








// до рефакторинга.
// когда подключали хок-функцию
//import React from 'react';
//import './item-list.css';
//import withData from '../hoc-helper/with-data'
//import SwapiService from '../../services/swapi-service'
//
//const ItemList = (props) => {
//    const { data, onItemSelected, children: renderLabel } = props;
//    const items = data.map( (item) => {
//        const { id } = item
//        const label = renderLabel(item)
//        return (<li className="list-group-item" key={id} onClick={() => onItemSelected(id)}>{label}</li>);
//    })
//    return (<ul className="item-list list-group"> {items}</ul> );
//}
//
//const { getAllPeople } = new SwapiService()
//export default withData(ItemList, getAllPeople);
