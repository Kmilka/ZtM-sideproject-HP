import React, { Component } from 'react';
import './App.css';



class App extends Component {
  
  constructor() {
    super();
    this.state = {
      characters: [],
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
  }

  render() {
    const {characters} = this.state;
    return (
      <div>
        <header>
          <h1>
            Students and teachers of Hogwarts School of Witchcraft and Wizardry <br/><span>and their friends and enemies</span>
          </h1>
        </header>
        <div className="search">
          <textarea type="text" placeholder="  Type name" value={this.state.search} onChange={(event) => this.handleChange(event)}></textarea>
          <button onClick={() => this.handleClick}>Search</button> */}
          <div>{characters.length ? characters : "Loading"}</div>
        </div>
      </div>
    )
  }

}


// class Card extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//      _id: "5a0fa4daae5bc100213c232e"
// name: "Hannah Abbott"
// role: "student"
// house: "Hufflepuff"
// school: "Hogwarts School of Witchcraft and Wizardry"
// __v: 0
// ministryOfMagic: false
// orderOfThePhoenix: false
// dumbledoresArmy: true
// deathEater: false
// bloodStatus: "half-blood"
// species: "human"

//     }
//   }
// }


export default App;