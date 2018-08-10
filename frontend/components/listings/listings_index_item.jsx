import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const ListingsIndexItem = (props) => {
  return (
    <li id={props.listing.id}>
      <Link to={`/listings/${props.listing.id}`}>{props.listing.title}</Link>
      <Link to="#">{props.listing.brand}</Link>
      <Link to="#">{props.listing.price}</Link>
      <Link to="#">{props.listing.size}</Link>
      <img src={props.photo}/>
    </li>
  );
};

export default withRouter(ListingsIndexItem);
