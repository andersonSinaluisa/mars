import React from 'react';
import './card.css';
class Card extends React.Component{

    constructor(props){
        super(props)
    }

    
    render() {
        return (
<div className="hero-section">
  <div className="card-grid">
    <a className="card" href="#">

      <div className="card__background" style={this.props.img1}></div>
      <div className="card__content">
        <p className="card__category">Galeria de Marte</p>
        <h4 className="card__heading">Fecha de lanzamiento</h4>
        <h3 className="card__heading">{this.props.launch_date}</h3>
      </div>
    </a>
    
    
  </div>
</div>
        );
    }
}

export default Card;