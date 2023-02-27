import React, {Component} from 'react';
import PropTypes from 'prop-types';
import result from 'lodash/result';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import EasyPinConfirmForm from '../../components/OnboardingJourney/EasyPinCreationConfirm.component';
import {
  setEasyPin as setEasyPinThunk,
  setEasyPinMigrate,
  setEasyPinDeeplink,
} from '../../state/thunks/onboarding.thunks';
import {NavigationActions} from 'react-navigation';
import {validatePinCodeLength} from '../../utils/validator.util';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'easyPinCreationConfirmForm',
  destroyOnUnmount: false,
  initialValues: {
    easyPinConfirm: ''
  },
  validate: (values) => ({
    easyPinConfirm: validatePinCodeLength(values.easyPinConfirm)
  }),
  onSubmit: (
    values, dispatch, {maskedUsername, isResetEasypin, isRegistDeeplink, isMigrate, typeActivationDeeplink, firebaseEmoney}
  ) => {
    if (isMigrate) {
      dispatch(setEasyPinMigrate(values, maskedUsername));
    } else if (typeActivationDeeplink === '020') {
      dispatch(setEasyPinDeeplink(values, maskedUsername, typeActivationDeeplink));
    } else {
      const isPinCreation = true;
      dispatch(setEasyPinThunk(values, maskedUsername, isResetEasypin, isRegistDeeplink, firebaseEmoney, isPinCreation));
      if (firebaseEmoney === true) {
        // const os = Platform.OS;
        // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '8'});
      }
    }
  }
};

const DecoratedForm = reduxForm(formConfig)(EasyPinConfirmForm);

const mapStateToProps = (state) => ({
  creationFormValues: result(state, 'form.easyPinCreationForm.values', {}),
  currentLanguage: state.currentLanguage
});

const mapDispatchToProps = (dispatch) => ({
  validateBeforeSubmit: () => {
    dispatch(change('easyPinCreationForm', 'easyPin', ''));
    dispatch(NavigationActions.back());
  }
});
const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecoratedForm);

class EasyPinScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
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
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '7'});
    }
  }

  render () {
    const maskedUsername = result(this.props.navigation, 'state.params.maskedUsername', '');
    const isMigrate = result(this.props.navigation, 'state.params.isMigrate', false);
    const isResetEasypin = result(this.props.navigation, 'state.params.isResetEasypin', false);
    const isRegistDeeplink = result(this.props.navigation, 'state.params.isRegistDeeplink', false);
    const typeActivationDeeplink = result(this.props.navigation, 'state.params.typeActivationDeeplink', '');
    const firebaseEmoney = result(this.props.navigation, 'state.params.firebaseEmoney', false);
    return (
      <ConnectedForm maskedUsername={maskedUsername} typeActivationDeeplink={typeActivationDeeplink} isResetEasypin={isResetEasypin} 
        isMigrate={isMigrate} isRegistDeeplink={isRegistDeeplink} firebaseEmoney={firebaseEmoney}
      />
    );
  }
}

export default EasyPinScreen;
