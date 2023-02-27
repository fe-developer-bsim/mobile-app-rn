import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import Touchable from './../../components/Touchable.component';
import styles from './NavHeader.styles';
import {NavigationActions} from 'react-navigation';
import {prepareCompletedOnboarding, prepareGoDashboard} from '../../state/thunks/onboarding.thunks';
import {resetToLandingAndNavigate} from '../../state/thunks/navigation.thunks';
import {setSkipFaceRegistered} from '../../state/thunks/common.thunks';
import {destroy} from 'redux-form';
import * as actionCreators from '../../state/actions/index.actions.js';

export default class LoginSwitch extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    isBrandColor: PropTypes.bool,
    resetToLanding: PropTypes.bool,
    navigateTo: PropTypes.string,
    dispatch: PropTypes.func,
    isBrandText: PropTypes.bool,
    completedOnboarding: PropTypes.bool,
    goDashboard: PropTypes.bool,
    params: PropTypes.object,
    skipRegisterFace: PropTypes.func,
    loginLanding: PropTypes.string,
  }

  onPress = () => {
    const {dispatch, navigateTo, resetToLanding = false,
      completedOnboarding = false, skipRegisterFace = false,
      goDashboard = false, params = {}, loginLanding} = this.props;
    if (resetToLanding) {
      skipRegisterFace && dispatch(actionCreators.isFaceRegisteredUpdate({skipped: true}));
      skipRegisterFace && dispatch(setSkipFaceRegistered());
      dispatch(resetToLandingAndNavigate(navigateTo, params));
    } else if (completedOnboarding) {
      dispatch(setSkipFaceRegistered());
      dispatch(prepareCompletedOnboarding(params.maskedUsername, params.isResetEasypin));
      dispatch(destroy('easyPinCreationForm'));
      dispatch(destroy('easyPinCreationConfirmForm'));
    } else if (goDashboard) {
      dispatch(setSkipFaceRegistered());
      dispatch(prepareGoDashboard());
    } else {
      dispatch(NavigationActions.navigate({routeName: navigateTo, params: {resetHeader: true, isOBM: true, isOBMPassword: true, loginLanding}}));
    }
  }

  render () {
    const {text, isBrandText = false} = this.props;
    return (
      <Touchable style={styles.navContainer} onPress={this.onPress} >
        <Text style={isBrandText ? styles.primaryColor : styles.contrastColor}>
          {text}
        </Text>
      </Touchable>
    );
  }
}
