import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import SwapiAPI from './SwapiAPI';

class Starwars extends Component {
  constructor() {
    super()
    this.api = new SwapiAPI()
    this.state = {
      loading: true,
      planets: [],
      residents: [],
      planet: '',
    }
  }

  componentDidMount(){
    this.api.getPlanets().then( res => {
      this.setState({
        loading: false,
        planets: res
      })
      }
    )
  }

  handleOnClick = planet => () => {
    const {name, residents} = planet
    this.setState({
      loading: true,
      residents: [],
      planet: name,
    });
    if (residents.length === 0){
      this.setState({
        loading: false,
        residents: [],
      })
    }else{
      residents.forEach( resident => {
        this.api.getResident(resident).then( res =>
          this.setState({
            loading: false,
            residents: [...this.state.residents, res],
          })
        );
      });
    }
  }

  render(){
    const {planets, residents, loading, planet} = this.state;
    const residentsName = residents.map((resident, i) => (
       <li key={i} className="list-group-item"> {resident.name} </li>
    ));
    const planetsName = planets.map((planet, i) => (
        <a className="nav-item nav-link pointer" onClick={this.handleOnClick(planet)}>
          {planet.name}
        </a>
    ));

    const residentsList = residents.length != 0 ? (
      <div>
        <br/>
        <h2> En el planeta <span style={{color:'red'}}>{ planet }</span> viven: </h2>
        <ul className="list-group list-group-flush"> {residentsName} </ul>
      </div>
    ): (
      <div>
        <br/>
        <h2> En el planeta <span style={{color:'red'}}>{ planet }</span>: </h2>
        <ul className="list-group list-group-flush"> No hay residentes </ul>
      </div>
    );

    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">Planetas</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <div className="navbar-nav">
                { planetsName }
              </div>
            </div>
          </div>
        </nav>

        <div className="container">
          { loading ? <div><br/><br/>Loading...</div> : !!planet ? residentsList : '' }
        </div>
      </div>
    );
  }
}

export default Starwars
