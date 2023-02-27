import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import MissingFormComp, {fields} from '../../components/CreateNewAccount/MissingForm.component';
import {validateRequiredFields, validatePostalCodeLength, validateNumber, validateEmail} from '../../utils/validator.util';
import {isEmpty, result} from 'lodash';
import {checkEmail} from '../../state/thunks/ccEform.thunks';
import {connect} from 'react-redux';

const formConfig = {
  form: 'MissingForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(checkEmail(values));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.POSTAL_CODE, fields.EMAIL])
    };
    return {
      postalCode: validatePostalCodeLength(values.postalCode) || validateNumber(values.postalCode),
      email: validateEmail(values.email),
      ...errors,
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  prefilledEmail: (email) => {
    dispatch(change('MissingForm', 'email', email));
  }
});

const mapStateToProps = (state) => ({
  email: result(state, 'user.profile.email', '')
});

const MissingForm = reduxForm(formConfig)(MissingFormComp);

class MissingFormPage extends Component {
  static propTypes = {
    postalCode: PropTypes.string,
    email: PropTypes.string,
    prefilledEmail: PropTypes.func
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('postalCode' === typeField) {
      if (isEmpty(val) || validatePostalCodeLength(val) || validateNumber(val)) {
        return true;
      } else {
        return false;
      }
    } else if ('email' === typeField) {
      if (isEmpty(val) || validateEmail(val)) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentDidMount = () => {
    const {email, prefilledEmail} = this.props;
    prefilledEmail(email);
  }

  render () {
    return (
      <MissingForm validationInput={this.validationInput}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissingFormPage);
