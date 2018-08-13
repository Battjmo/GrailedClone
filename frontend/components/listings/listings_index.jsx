import  React  from 'react';
import ListingsIndexItem from './listings_index_item';

class ListingsIndex extends React.Component {

componentDidMount() {
  this.props.fetchListings();
}

render() {
  let listingsList = this.props.Listings;
  listingsList = listingsList.map(listing => (
    <ListingsIndexItem
      id={listing.id}
      listing={listing}
      photo={listing.photoUrl}
       />
  ));

  return (
  <div className="index-wrapper">
  <h1 className="feed-title">Browse The Feed</h1>
  <ul className="index">
    { listingsList }
  </ul>
  </div>
  );
}

}

export default ListingsIndex;