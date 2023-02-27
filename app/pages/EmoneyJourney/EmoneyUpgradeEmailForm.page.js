import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import EmoneyUpgradeEmailFormComp, {fields} from '../../components/EmoneyJourney/EmoneyUpgradeEmailForm.component';
import {validateRequiredFields, validateEmail} from '../../utils/validator.util';
import {isEmpty, result} from 'lodash';
import {connect} from 'react-redux';
import {requestEmailToken} from '../../state/thunks/emoney.thunks';
// import firebase from 'react-native-firebase';
// import {Platform} from 'react-native';
// let Analytics = firebase.analytics();

const formConfig = {
  form: 'UpgradeEmoneyEmailForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(requestEmailToken());
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.EMAIL])
    };
    return {
      email: validateEmail(values.email),
      ...errors,
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  prefilledEmail: (email) => {
    dispatch(change('UpgradeEmoneyEmailForm', 'email', email));
  }
});

const mapStateToProps = (state) => ({
  email: result(state, 'user.profile.email', '')
});

const EmailForm = reduxForm(formConfig)(EmoneyUpgradeEmailFormComp);

class EmoneyUpgradeEmailFormPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    email: PropTypes.string,
    prefilledEmail: PropTypes.func
  }

  componentDidMount () {
    // const {navigation} = this.props;
    // const firebaseEmoney = result(navigation, 'state.params.firebaseEmoney', false);

    // if (firebaseEmoney === true) {
    //   const os = Platform.OS;
    //   Analytics.logEvent('UPGRADE_EMONEY', {device: os, step_route: '7'});
    // }
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('email' === typeField) {
      if (isEmpty(val) || validateEmail(val)) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentWillMount () {
    const {email, prefilledEmail} = this.props;
    prefilledEmail(email);
  }

  render () {
    return (
      <EmailForm validationInput={this.validationInput}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeEmailFormPage);
