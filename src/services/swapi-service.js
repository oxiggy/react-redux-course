export default class SwapiService {
    //код, который работает с сестью, изолируем в одном класс-сервисе

    _apiBase = 'https://swapi.dev/api'; // {/* _приватная часть класса, нельзя использовать и изменять снаружи*/}
    _imageBase = 'https://starwars-visualguide.com/assets/img'

    getResource = async (url) => {
        //const res = await fetch(`${this._apiBase}${url}`);
        const res = await fetch(`/api${url}`);
        if(!res.ok) {throw new Error (`Could not fetch ${url}` + `, received ${res.status}`)}
        {/* result.ok содержит true, если Result.status содержит один из ок-статусов (200 - 299)*/}
        const body = await res.json();
        return body;
    }

    // функция передается в качестве property\свойств компонента
    // нужно позаботиться о this -> делаем стрелочкую функцию
     getAllPeople = async () => {
        try {
            const res = await this.getResource(`/people/`)
            return res.results.map(this._transformPerson)
        } catch (e) {
            throw e
        }
    }
    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`)
        return this._transformPerson(person)
    }

    getAllPlanets  = async () => {
        const res =  await this.getResource(`/planets/`)
        return res.results.map(this._transformPlanet)
    }
    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`)
        return this._transformPlanet(planet)
    }

    getAllStarships = async () => {
        const res =  await this.getResource(`/starships/`)
        return res.results.map(this._transformStarship)
    }
    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`)
        return this._transformStarship(starship)
    }

    getPersonImage = ({id}) => {
        return  `${this._imageBase}/characters/${id}.jpg`
    }

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`
    }

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`
    }

    _extractionId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1]
    }

/*    отделяем модель данных api от модели данных приложения   */
    _transformPlanet = (planet) => {
        return {
            id: this._extractionId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _transformStarship = (starship) => {
        return {
            id: this._extractionId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manifacturer,
            costInCredits: starship.cost_in_credits,
            lenght: starship.lenght,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity

        }
    }

    _transformPerson = (person) => {
        return {
            id: this._extractionId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }
    }
}

// Пример
//const swapi = new SwapiService()
//swapi.getAllStarships().then((people)=> {console.log(
//            people.forEach((p)=>{ console.log(p.name)})
//)})
//swapi.getAllPeople().then((people)=> {console.log(
//            people.forEach((p)=>{ console.log(p.name)})
//)})


// через async\await
//const getResource = async ( url) => {
//    const res = await fetch(url);
//
//    {/* result.ok содержит true, если Result.status содержит один из ок-статусов (200 - 299)*/}
//    if(!res.ok) {
//        throw new Error (`Could not fetch ${url}` + `, received ${res.status}`)
//    }
//    const body = await res.json();
//    return body;
//}
//
//getResource('https://swapi.dev/api/people/1/')
//    .then( (body)=> console.log(body))
//    .catch((err) => {console.log('Could not fetch', err)})


// Самая первая, простая версия
//fetch('https://swapi.dev/api/people/1/')
//    .then((res) => {
//        return res.json();
//    })
//    .then(
//        (body) => { console.log(body)}
//    )
