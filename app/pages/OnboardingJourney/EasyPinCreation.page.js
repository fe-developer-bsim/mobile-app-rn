import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import result from 'lodash/result';
import EasyPinFormView from '../../components/OnboardingJourney/EasyPinCreation.component';
import {NavigationActions} from 'react-navigation';
import {validateFieldsMatch} from '../../utils/validator.util';

// import {Platform} from 'react-native';

const formConfig = {
  form: 'easyPinCreationForm',
  destroyOnUnmount: false,
  initialValues: {
    easyPin: ''
  },
  validate: (values, props) => {
    const confirmValue = result(props, 'confirmFormValues.easyPinConfirm', '');
    return {
      _error:
        !values.easyPin &&
        confirmValue &&
        validateFieldsMatch(values.easyPin, confirmValue)
    };
  },
  onSubmit: (
    values,
    dispatch,
    {
      maskedUsername,
      isResetEasypin,
      isMigrate,
      encryptedToken,
      isRegistDeeplink,
      typeActivationDeeplink,
      firebaseEmoney,
    }
  ) => {
    dispatch(change('easyPinCreationConfirmForm', 'easyPinConfirm', ''));
    dispatch(
      NavigationActions.navigate({
        routeName: 'EasyPinConfirm',
        params: {
          maskedUsername,
          isResetEasypin,
          isRegistDeeplink,
          isMigrate,
          encryptedToken,
          typeActivationDeeplink,
          firebaseEmoney,
        },
      })
    );
    if (firebaseEmoney === true) {
      // const os = Platform.OS;
      // Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '7'});
    }
  }
};

const DecoratedForm = reduxForm(formConfig)(EasyPinFormView);
const mapStateToProps = (state) => ({
  confirmFormValues: result(
    state,
    'form.easyPinCreationConfirmForm.values',
    {}
  ),
  currentLanguage: state.currentLanguage
});
const ConnectedForm = connect(
  mapStateToProps,
  null
)(DecoratedForm);

class EasyPinScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  componentDidMount () {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(
    //   navigation,
    //   'state.params.firebaseEmoney',
    //   false
    // );
    // if (firebaseEmoney === true) {
    //   const os = Platform.OS;
    //   Analytics.logEvent('REGIST_EMONEY', {device: os, step_route: '6'});
    // }
  }

  render () {
    const {navigation} = this.props;
    const maskedUsername = result(
      this.props.navigation,
      'state.params.maskedUsername',
      ''
    );
    const isMigrate = result(
      this.props.navigation,
      'state.params.isMigrate',
      false
    );
    const isResetEasypin = result(
      this.props.navigation,
      'state.params.isResetEasypin',
      false
    );
    const isRegistDeeplink = result(
      this.props.navigation,
      'state.params.isRegistDeeplink',
      false
    );
    const typeActivationDeeplink = result(
      this.props.navigation,
      'state.params.typeActivationDeeplink',
      ''
    );
    const firebaseEmoney = result(
      navigation,
      'state.params.firebaseEmoney',
      false
    );
    return (
      <ConnectedForm
        maskedUsername={maskedUsername}
        typeActivationDeeplink={typeActivationDeeplink}
        isResetEasypin={isResetEasypin}
        isMigrate={isMigrate}
        isRegistDeeplink={isRegistDeeplink}
        firebaseEmoney={firebaseEmoney}
      />
    );
  }
}

export default EasyPinScreen;
