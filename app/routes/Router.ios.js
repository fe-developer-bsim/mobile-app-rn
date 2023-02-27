import React from 'react';
import PropTypes from 'prop-types';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';
import Routes from './index.routes';
import {isEmpty} from 'lodash';

class RouterWrapper extends React.Component {
  static propTypes = {
    nav: PropTypes.object,
    dispatch: PropTypes.func,
    goToLoginWithEasyPin: PropTypes.func,
    user: PropTypes.object,
  }

  render () {
    const {dispatch, nav, goToLoginWithEasyPin, user} = this.props;
    const isLogin = !isEmpty(user);
    return <Routes navigation={addNavigationHelpers({dispatch, state: nav, goToLoginWithEasyPin, isLogin, addListener: () => {}})} />;
  }
}

const mapStateToProps = ({nav, user}) => ({nav, user});

const mapDispatchToProps = (dispatch) => ({dispatch});

export const ConnectedRoutes = connect(mapStateToProps, mapDispatchToProps)(RouterWrapper);

export default Routes;
