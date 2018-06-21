import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import Post from './Post'
import Tag from './Tag'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen(){
    this.setState({
      navOpen: true
    });
  }
  handleClose(){
    this.setState({
      navOpen: false
    });
  }
  render () {
    return (
      <Router>
        <div id="parent">
          <Header navOpen={this.state.navOpen} handleClose={this.handleClose}/>
          <main id="main">
            <div className="mobile-header">
              <button type="button" name="button" onClick={this.handleOpen}><i className="fas fa-bars"></i>
              </button>
              <div className="logo">
                <a href="/">MARY<span>VENTURES</span></a>
              </div>
            </div>
            <Route exact path='/' component={Home} />
            <Route path='/post/:slug' component={Post} />
            <Route path='/tag/:slug' component={Tag} />
          </main>
        </div>
      </Router>
    )

  }
}
export default App
