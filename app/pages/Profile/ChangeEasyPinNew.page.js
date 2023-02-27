import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import EasyPinFormView from '../../components/Profile/ChangeEasyPinNew.component';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'easyPinUpdateForm',
  destroyOnUnmount: false,
  initialValues: {
    easyPin: '',
  },
  validate: (values) => {
    const errors = {_error: ''};
    if (!values.easyPinConfirm) {
      errors.easyPinConfirm = 'Required';
    }
    if (values.easyPinConfirm && values.easyPinConfirm.length < 6) {
      errors.easyPinConfirm = 'Should be 6 digits';
    }
    if (!values.easyPin && values.easyPinConfirm && values.easyPin !== values.easyPinConfirm) {
      errors['_error'] = 'Fields doesn\'t match';
    }
    return errors;
  },
  onSubmit: (values, dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'ChangeEasyPinConfirm'}));
  }
};

const EasyPinForm = reduxForm(formConfig)(EasyPinFormView);

class EasyPinScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  render () {
    return (
      <EasyPinForm/>
    );
  }
}

export default EasyPinScreen;
