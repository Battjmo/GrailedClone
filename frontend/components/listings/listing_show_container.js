import { connect } from 'react-redux';
import ListingShow from './listing_show';
import { fetchListing } from '../../actions/listing_actions';

const mapStateToProps = (state, ownProps) => ({
  listing: state.entities.Listings[ownProps.match.params.id],
  currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
  fetchListing: id => dispatch(fetchListing(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingShow);
