import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <Route path='/' exact component={Join}/>
      <Route path='/Chat' component={Chat} />
    </Router>
  );
}

export default App;

