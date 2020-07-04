import React from 'react';
import logo from './logo.svg';
import './App.css';

import MainHeader from './components/MainHeader'

const NavigationSpace = () => {
    return (<p>Navigation goes here</p>)
}
const ProblemSpace = props => {

    return (<p>Problem goes here:</p>)

}

function App() {
  return (
    <div className="App">
      <MainHeader />
      <NavigationSpace />
      <ProblemSpace />

    </div>
  )
}

export default App
