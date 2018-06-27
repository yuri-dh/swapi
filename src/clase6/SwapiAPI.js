import Axios from 'axios'

class SwapiAPI {
  constructor() {
    this.Axios = Axios.create({
      baseURL: 'https://swapi.co/api/',
      params: {
        headers: {"Access-Control-Allow-Origin": "*"},
      }
    })
  }

  getPlanets = () => this.Axios.get('/planets').then(res => res.data.results)
  getResident = (url) => this.Axios.get(url).then(res => res.data)

}

export default SwapiAPI;
