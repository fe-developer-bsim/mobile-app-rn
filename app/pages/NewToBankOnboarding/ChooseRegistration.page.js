import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ChooseRegistrationComp from '../../components/NewToBankOnboarding/ChooseRegistration.component';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import result from 'lodash/result';

// import {Platform} from 'react-native';

const mapDispatchToProps = (dispatch) => ({
  registerSimobi: () =>
    dispatch(NavigationActions.navigate({routeName: 'RegisterAtm'})),
  registerEmoney: () => {
    const firebaseEmoney = true;
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProductsListOnboarding',
        params: {firebaseEmoney},
      })
    );
  },
});

class ChooseRegistration extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    registerEmoney: PropTypes.func,
    registerSimobi: PropTypes.func,
    signInSimobi: PropTypes.func
  };

  componentDidMount () {
    const {navigation} = this.props;
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    if (firebaseEmoney === true) {
      // const os = Platform.OS;
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '2'});
    }
  }

  render () {
    const {registerSimobi, registerEmoney, signInSimobi} = this.props;

    return (
      <ChooseRegistrationComp
        registerEmoney={registerEmoney}
        registerSimobi={registerSimobi}
        signInSimobi={signInSimobi}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ChooseRegistration);
