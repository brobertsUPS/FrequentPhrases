import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FrequentWordsFileZone from './components/FrequentWordsFileZone';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
              Welcome to the phrase frequency counter! Upload a .txt file in order to find the top 10 phrases in the text.
              There are some example files in this GitHub repo to try: <a href="https://github.com/brobertsUPS/FrequentPhrases/tree/master/src/ExampleTexts">GitHub</a>
          </h2>
        </div>
        <FrequentWordsFileZone />
      </div>
    );
  }
}

export default App;
