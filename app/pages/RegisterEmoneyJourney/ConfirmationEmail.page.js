import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ConfirmEmail from '../../components/RegisterEmoneyJourney/ConfirmationEmail.component';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import {result, find} from 'lodash';
import DeepLinking from 'react-native-deep-linking';
import {Linking} from 'react-native';
import {getAllOffersExcept} from '../../utils/transformer.util';
import {deeplinkCatcher} from '../../state/thunks/common.thunks';
import SplashScreen from 'react-native-splash-screen';


const mapDispatchToProps = (dispatch) => ({
  returnToLogin: () => {
    dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({routeName: 'Login'}),
      ]
    }));
  },
  deeplinkCatcher: () => dispatch(deeplinkCatcher()),
});

const mapStateToProps = (state) => {
  const allOffers = result(state, 'promos.offers', []);
  const clickedOffer = find(allOffers, {offerID: {}});
  return {
    isDeeplinkExist: state.isDeeplinkExist,
    offers: getAllOffersExcept(clickedOffer, allOffers),
  };
};
class FinalizePaydayLoan extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    returnToLogin: PropTypes.func,
    verifyEmail: PropTypes.func,
    isDeeplinkExist: PropTypes.bool,
    checkLogin: PropTypes.func,
    checkLoginCC: PropTypes.func,
    checkLoginAllsegment: PropTypes.func,
    setToMigrate: PropTypes.func,
    displayOffers: PropTypes.func,
    checkLoginSaving: PropTypes.func,
    offers: PropTypes.array,
    deeplinkCatcher: PropTypes.func
  }

  handleUrl = ({url}) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }
  componentWillUnmount () {
    // Linking.removeEventListener('url', this.handleUrl);
  }
  componentWillMount () {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }
  componentDidMount () {
    // Linking.addEventListener('url', this.handleUrl);
    // this.props.deeplinkCatcher();
  }
  render () {
    const {navigation, returnToLogin} = this.props;
    const email = result(navigation, 'state.params.email', '');
    return (
      <ConfirmEmail navigation={navigation} returnToLogin={returnToLogin} email={email}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinalizePaydayLoan);
