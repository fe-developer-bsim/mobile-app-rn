import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import UpdateEasyPin from '../../components/Profile/UpdateEasyPin.component';
import {language} from '../../config/language';
import {changeEasyPin} from '../../state/thunks/profile.thunks';
import {result} from 'lodash';

const formConfig = {
  form: 'UpdateEasyPin',
  destroyOnUnmount: true,
  initialValues: {
    password: ''
  },
  validate: (values) => {
    const errors = {_error: ''};
    if (!values.oldEasyPin) {
      errors['oldEasyPin'] = language.PROFILE__EASYPIN_OLD_ERROR;
    } else if (values.oldEasyPin.length < 6) {
      errors['oldEasyPin'] = language.PROFILE__EASYPIN_DIGITS;
    }
    if (!values.easyPin) {
      errors['easyPin'] = language.PROFILE__EASYPIN_NEW_ERROR;
    } else if (values.easyPin.length < 6) {
      errors['easyPin'] = language.PROFILE__EASYPIN_DIGITS;
    }
    if (!values.easyPin2) {
      errors['easyPin2'] = language.PROFILE__EASYPIN_CONFIRM_ERROR;
    } else if (values.easyPin2.length < 6) {
      errors['easyPin2'] = language.PROFILE__EASYPIN_DIGITS;
    } else if (values.easyPin !== values.easyPin2) {
      errors['easyPin2'] = language.PROFILE__EASYPIN_NOT_MATCH;
    }
    return errors;
  },
  onSubmit: (values, dispatch, {isSearch}) => dispatch(changeEasyPin(values, isSearch))
};

const UpdateEasyPinForm = reduxForm(formConfig)(UpdateEasyPin);

class EasyPinUpdatePage extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  render () {
    const {navigation} = this.props;
    const isSearch = result(navigation, 'state.params.isSearch', false);
    return <UpdateEasyPinForm
      isSearch={isSearch}
    />;
  }
}
export default EasyPinUpdatePage;
