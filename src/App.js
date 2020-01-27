import React, { Component } from 'react';
import './App.css';
import cat from './halloween-black-cat.svg';
import spellPicture from './spell.svg';
import skull from './skull.svg';
import magic from './halloween.svg';
import star from './star.svg';
import student from './student.svg';
import brain from './brain.svg';


class App extends Component {
  
  constructor() {
    super();
    this.state = {
      characters: [],
      searchField: "",
      spells: [],
      flagCastASpell: false,
      flagSpellInAction: false,
      randonSpellNumber: null,
    };

  }

  handleChange(event) {
    this.setState({
      searchField: event.target.value,
      })
  }

  handleClick() {
    this.setState({
      flagCastASpell: true,
      randomSpellNumber: Math.round(Math.random() * 150, 0),
    })
  }

  castSpell() {
    this.setState({
      flagSpellInAction: true,
    })
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
    const {characters, spells, flagCastASpell, flagSpellInAction, randomSpellNumber} = this.state;
    const filteredCharacters = this.state.characters.filter(value =>
      value.name.toLocaleLowerCase().includes(this.state.searchField.toLocaleLowerCase()));
    const spell = spells[randomSpellNumber];
    const CastASpellClass = flagCastASpell ? "cast-spell" : "invisible";
    let spellBtnImg = ["pick-spell"];
    spellBtnImg.push(!flagCastASpell ? "before-click" : "after-click");
    const animateSpell = flagSpellInAction ? "animate-spell" : "";
    return (
      (!characters.length || !spells.length)?
      <h1>Loading</h1> :
      <div>
        <header>
          <h1>
            Search for a certain person from <span>Harry Potter</span>
            <img src={cat} alt="cat" /> universe and
            <br/>
            <img src={spellPicture} alt="spell" />
            &nbsp; cast a spell on him or her
          </h1>
        </header>
        <div className="flex-column center">
          <input type="text" placeholder="  Type name" onChange={(event) => this.handleChange(event)}></input>
            <div className="flex-column center">
              <span className={animateSpell}>{flagCastASpell ? spell.spell : ""}</span>
              <p>{flagCastASpell ? spell.effect : ""}</p>
            <div className="flex-row center">
              <button className={spellBtnImg.join(" ")} onClick={() => this.handleClick()}></button>             
              <button className={CastASpellClass} onClick={() => this.castSpell()}>Cast this spell</button>
            </div>
        </div>
      </div>

        <CardList props= {filteredCharacters} />

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
  deathEater && role === "" ? teamPlayer.push("DeathEater") : teamPlayer.push("");
  ministryOfMagic ? teamPlayer.push("Worked in the Ministry of Magic") : teamPlayer.push("");
  dumbledoresArmy ? teamPlayer.push("Joined the Dumbldore's Army") : teamPlayer.push("");
  orderOfThePhoenix ? teamPlayer.push("One of the Order of the Phoenix") : teamPlayer.push("");

  const listItems = teamPlayer.map((value, index) => {
      if (value !== "") {
        return <li key={index}>{value}</li>        
      } else return null;
  });

  return (
    <div className="card">
      <div className="card-heading">
        <h1>{name}</h1>
        <h2>{role ? role : (deathEater ? "DeathEater" : "Other")}{ house ? ", " + house : ""}</h2>
      </div>
      <img src={ role === 'student' ? student : (deathEater ? skull : (bloodStatus === 'muggle' ? brain : (species === 'human' ? magic : star)))} alt="role description" />
      <ul>
        <li>Species: {species}</li>
        <li>Bloodstatus: {bloodStatus}</li>
      </ul>
        <ul>
          {listItems}
        </ul>
    </div>
  )
  }


export default App;