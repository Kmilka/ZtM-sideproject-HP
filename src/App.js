import React, { Component } from 'react';
import './App.css';
import cat from './icons/halloween-black-cat.svg';
import spellPicture from './icons/spell.svg';
import skull from './icons/skull.svg';
import magic from './icons/halloween.svg';
import star from './icons/star.svg';
import student from './icons/student.svg';
import brain from './icons/brain.svg';
import magicwand from './icons/magic-wand.svg';


class App extends Component {
  
  constructor() {
    super();
    this.input = React.createRef();
    this.state = {
      characters: [],
      searchField: "",
      spells: [],
      flagCastASpell: false,
      flagSpellInAction: false,
      randonSpellNumber: null,
    };

  }

  focusInput() {
    this.input.current.focus();
  }

  handleChange(event) {
    this.setState({
      searchField: event.target.value,
      })
    this.focusInput();
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
      <div onLoad={() => this.focusInput()}>
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
          <input type="text" placeholder="  Type name" ref={this.input}
            onChange={(event) => this.handleChange(event)}
            onClick={() => this.focusInput()}></input>
            <div className="flex-column center">
              <span className={animateSpell}>{flagCastASpell ? spell.spell : ""}</span>
              <p>{flagCastASpell ? spell.effect : ""}</p>
            <div className="flex-row center">
              <button className={spellBtnImg.join(" ")} disabled={this.state.flagSpellInAction ? true : false} onClick={() => this.handleClick()}></button>             
              <button className={CastASpellClass} disabled={this.state.flagSpellInAction ? true : false} onClick={() => this.castSpell()}>Cast this spell</button>
            </div>
        </div>
        <img src={magicwand} alt="magic happens" className={this.state.flagSpellInAction ? "magic" : "invisible"} />
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