import React, { Component } from 'react';
import './App.css'

import Movies from "./components/Movies";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header className="header mt-md-4">
          <div className="container bg-white p-5 text-center">
            <h1 className="text-center text-black">Liste des films</h1>
          </div>
        </header>

        <div className="container bg-white">
          <div className="col-12">
            <div className="row mb-4">
              <Movies />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App