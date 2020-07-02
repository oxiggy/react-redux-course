import React,  {useState} from 'react';
// отличия от стейта в компоненте: можем разбить стейт на независимые компоненты
// сеттер полностью заменяет стейт-объект

const HookSwitcher = () => {
    const [color, setColor] = useState('white')
    const [ fontSize, setFontSize] = useState(14)

    return <div style={{ padding: 10, backgroundColor: color, fontSize: `${fontSize}px`}}>
        Yello
        <button onClick={() => setColor('grey')}>Dark</button>
        <button onClick={() => setColor('white')}>Light</button>

        <button
            // onClick={ () => setFontSize(fontSize + 2)}
            // нельзя ._.
            onClick={ () => setFontSize((s) => s +2)}
        >
            +
        </button>
    </div>
}

const Person = () => {
    const [ person, setPerson] = useState({firstName: 'Bob', lastName: 'Smith' })

    setPerson({ firstName: 'Mike'})
    // полностью перезапишет объект

    // как вариант сделать setFirstName setLastName

    // самостоятельно сохраняем старые ззначения
    setPerson( () => {
        //return {
        //    firstName: 'Mile',
        //    lastName: person.lastName
        //}
        // так симпатичнее =>
        return { ...person,  firstName: 'Mile'}
    })
}
