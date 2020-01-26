import React, { Component } from 'react';
import './App.css';
import cat from './halloween-black-cat.svg';
import spell from './spell.svg';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      characters: [],
      spells: [],
    };

  }

  handleChange(event) {
    console.log(this.state.characters);
  }

  handleClick() {

  }

  componentDidMount() {
    fetch("https://www.potterapi.com/v1/characters?key=$2a$10$zaAYmnF8pkJKPm1CyyrYluWrAaLBdiiNKDA241lTtzwqe.LoyzFrG")
    .then(res => res.json())
    .then((result) => {
      this.setState({
        characters: result,
      });   
    });
    fetch("https://www.potterapi.com/v1/spells?key=$2a$10$zaAYmnF8pkJKPm1CyyrYluWrAaLBdiiNKDA241lTtzwqe.LoyzFrG")
    .then(res => res.json())
    .then((result) => {
      this.setState({
        spells: result,
      });   
    });
  }

  render() {
    const {characters} = this.state;
    return (
      !characters.length ?
      <h1>Loading</h1> :
      <div>
        <header>
          <h1>
            Search for a certain person from <span>Harry Potter</span>
            <img src={cat} alt="cat" /> universe and
            <br/>
            <img src={spell} alt="spell" />
            &nbsp; cast a spell on him or her
          </h1>
          <div className="search">
            <input type="text" placeholder="  Type name" onChange={(event) => this.handleChange(event)}></input>
            <button onClick={() => this.handleClick}></button>
          </div>
        </header>
        <CardList props={this.state.characters} />
      </div>
    )
  }

}

function CardList ( listOfCharacters ) {
  return (
    <div className="card-list">
      {listOfCharacters.props.map(
        (value, index) => 
        <Card 
          key={index}
          character={value} 
        />)
      }
    </div>
  )
}


function Card (props) {
  const { name, role, house, ministryOfMagic, orderOfThePhoenix, dumbledoresArmy, deathEater, bloodStatus, species } = props.character;
  const teamPlayer = [];
  deathEater ? teamPlayer.push("DeathEater") : teamPlayer.push("");
  ministryOfMagic ? teamPlayer.push("Worked in the Ministry of Magic") : teamPlayer.push("");
  dumbledoresArmy ? teamPlayer.push("Joined the Dumbldore's Army") : teamPlayer.push("");
  orderOfThePhoenix ? teamPlayer.push("One of the Order of the Phoenix") : teamPlayer.push("");

  const listItems = teamPlayer.map((value, index) => {
      if (value !== "") {
        return <li>{value}</li>        
      } else return null;
  });

  return (
    <div className="card">
      <h1>{name}</h1>
      <h2>{role}</h2>
      <hr>
      </hr>
      <ul>
        <li>Species: {species}</li>
        <li>Bloodstatus: {bloodStatus}</li>
        <li className={ !house ? "invisible" : ""} >Hogwarts house: {house}</li>
      </ul>
        <ul>
          {listItems}
        </ul>
    </div>
  )
  }


export default App;