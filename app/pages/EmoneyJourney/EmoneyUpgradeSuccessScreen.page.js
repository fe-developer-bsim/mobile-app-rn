import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmoneyUpgradeSuccessScreenComp from '../../components/EmoneyJourney/EmoneyUpgradeSuccessScreen.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {isEmpty, result} from 'lodash';
import {prepareGoDashboard} from '../../state/thunks/onboarding.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const mapStateToProps = (state) => ({
  isLogin: !isEmpty(result(state, 'user', {}))
});

const mapDispatchToProps = (dispatch) => ({
  onButtonPress: (rootName) => dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: rootName})]
  })),
  backToHome: () => dispatch(prepareGoDashboard()),
});

class EmoneyUpgradeSuccessScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    config: PropTypes.object,
    isLogin: PropTypes.object,
    onButtonPress: PropTypes.func
  }

  componentDidMount () {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);

    // if (firebaseEmoney === true) {
    //   const os = Platform.OS;
    //   Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '10'});
    // }
  }

  backToHome = () => {
    const {isLogin, onButtonPress} = this.props;
    onButtonPress(isLogin ? 'Landing' : 'Login');
  }

  render () {
    return (
      <EmoneyUpgradeSuccessScreenComp
        backToHome={this.backToHome}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeSuccessScreen);
