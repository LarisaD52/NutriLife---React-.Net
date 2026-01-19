import React, { Component } from 'react';
import Navbar from './Navbar'; 

export class Layout extends Component {
  render () {
    return (
      <div>
        <Navbar />
        {/* Folosim div-uri standard cu clase Bootstrap în loc de <Container> */}
        <div className="container mt-4">
          {this.props.children}
        </div>
      </div>
    );
  }
}