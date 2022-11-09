import React from 'react';
import { Link } from 'react-router-dom';

const RecipiesCard = ({food}) => {

    const {_id,foodName,photoURL,description,price} = food;


    return (
        <div className="card card-compact w-auto bg-base-100 shadow-xl">
        <figure>
          <img src={photoURL} alt="food-recipies" className="w-full h-72"/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{foodName}</h2>
          <p>{description.slice(0,100)+'...'}</p>
          <div className="card-actions justify-end">
             <Link to={`/recipe/description/${_id}`}><button className="btn btn-primary btn-xs">Read More</button></Link>
          </div>
        </div>
      </div>
    );
};

export default RecipiesCard;