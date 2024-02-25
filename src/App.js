
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar' ;

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

export default class App extends Component {

  state = {
    progress :0 
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (

      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='red'
        progress={this.state.progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress}   key="general" pageSize={6} country="in" category="general" />} />
          <Route path="/business" element={<News setProgress={this.setProgress}   key="business" pageSize={6} country="in" category="business" />} />
          <Route path="/sports" element={<News setProgress={this.setProgress}   key="sports" pageSize={6} country="in" category="sports" />} />
          <Route path="/science" element={<News setProgress={this.setProgress}   key="science" pageSize={6} country="in" category="science" />} />
          <Route path="/entertainment" element={<News setProgress={this.setProgress}   key="entertainment" pageSize={6} country="in" category="entertainment" />} />
          <Route path="/technology" element={<News setProgress={this.setProgress}   key="technology" pageSize={6} country="in" category="technology" />} />
          <Route path="/health" element={<News setProgress={this.setProgress}   key="health" pageSize={6} country="in" category="health" />} />
        </Routes>
  </Router>
      </div> 
    )
  }
} 

