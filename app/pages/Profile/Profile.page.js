import React from 'react';
import PropTypes from 'prop-types';
import Profile from '../../components/Profile/Profile.component';
import {connect} from 'react-redux';
import {setCurrentLanguage, populateOffersPrivate} from '../../state/thunks/common.thunks';
import result from 'lodash/result';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => ({
  user: result(state, 'user.profile'),
  currentLanguage: result(state, 'currentLanguage'),
  isFaceRegistered: result(state, 'isFaceRegistered.isFaceRegistered', false)
});
const mapDispatchToProps = (dispatch) => ({
  setLanguage (languageId) {
    dispatch(setCurrentLanguage(languageId));
  },
  navigateToOffers () {
    dispatch(populateOffersPrivate());
  },
  navigateToSimasPoin () {
    dispatch(NavigationActions.navigate({routeName: 'SimasPoinWebView'}));
  }
});
class ProfilePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    currentLanguage: PropTypes.object,
    getLanguage: PropTypes.func,
    setLanguage: PropTypes.func,
    navigateToSimasPoin: PropTypes.func
  }

  navigateTo = (routeName, params) => () => {
    this.props.navigation.navigate(routeName, params);
  }

  changeLanguage = (value) => {
    this.props.setLanguage(value);
  }

  render () {
    return <Profile {...this.props} navigateTo={this.navigateTo} changeLanguage={this.changeLanguage}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
