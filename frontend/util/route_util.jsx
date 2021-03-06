import React from 'react';
import { openModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Redirect } from 'react-router';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )}/>
);

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.id)};
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
