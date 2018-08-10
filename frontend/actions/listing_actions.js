import * as listingUtil from '../util/listing_api_util';

export const RECEIVE_LISTING = "RECEIVE_LISTING";
export const RECEIVE_LISTINGS = "RECEIVE_LISTINGS";
export const RECEIVE_LISTING_ERRORS = "RECEIVE_LISTING_ERRORS";
export const REMOVE_LISTING = "REMOVE_LISTING";

export const receiveListing = listing => ({
  type: RECEIVE_LISTING,
  listing
});

export const receiveListings = listings => ({
  type: RECEIVE_LISTINGS,
  listings
});

export const receiveListingErrors = errors => ({
  type: RECEIVE_LISTING_ERRORS,
  errors
});

export const removeListing = listingId => ({
  type: REMOVE_LISTING,
  listingId
});

export const fetchListing = listingId => dispatch => (
    listingUtil.fetchListing(listingId).then(listing => (
      dispatch(receiveListing(listing))
    ), err => (
      dispatch(receiveListingErrors(err.responseJSON))
    ))
);

export const fetchListings = () => dispatch => (
  listingUtil.fetchListings().then(listings => (
    dispatch(receiveListings(listings))
  ), err => (
    dispatch(receiveListingErrors(err.responseJSON))
  ))
);

export const createListing = listing => dispatch => (
  listingUtil.createListing(listing).then(listing => (
    dispatch(receiveListing(listing))
  ), err => (
    dispatch(receiveListingErrors(err.responseJSON))
  ))
);

export const updateListing = listing => dispatch => (
  listingUtil.updateListing(listing).then(listing => (
    dispatch(receiveListing(listing))
  ), err => (
    dispatch(receiveListingErrors(err.responseJSON))
  ))
);

export const deleteListing = listingId => dispatch => (
  listingUtil.deleteListing(listingId).then(delPostId => (
    dispatch(removeListing(listingId))
  ))
);
