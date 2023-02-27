import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import EmailFormComponent from '../../components/CreateNewAccount/EmailForm.component';
import {validateRequiredFields, validateEmail} from '../../utils/validator.util';
import {isEmpty, result} from 'lodash';
import {connect} from 'react-redux';
import {showSpinner} from '../../state/actions/index.actions';
import {createCreditCardForm, checkEmailOramiETB} from '../../state/thunks/ccEform.thunks';
import {receiveCreditCardProvince, getProvinceList} from '../../state/thunks/ccEform.thunks';

const formConfig = {
  form: 'EmailForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {ccFormCode}) => {
    if (ccFormCode === 'CCO-SIMOBI-002') {
      dispatch(showSpinner());
      dispatch(checkEmailOramiETB());
    } else {
      const pageName = 'CreditCardForm2';
      const statusForm = 'NEXT';
      dispatch(createCreditCardForm(statusForm, pageName, false, true));
    }
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['email'])
    };
    return {
      email: validateEmail(values.email),
      ...errors,
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  setNpwpReasontoNull: (referralCodeOrami) => {
    dispatch(change('EmailForm', 'referralCode', referralCodeOrami));
  },
  setProvince: () => {
    dispatch(receiveCreditCardProvince());
  },
  setFieldCitytoClear: () => {
    dispatch(change('CCForm2', 'city', ''));
  },
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
});

const mapStateToProps = (state) => ({
  ccCode: result(state, 'ccCode', '')
});

const EmailForm = reduxForm(formConfig)(EmailFormComponent);

class EmailFormPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    email: PropTypes.string,
    ccCode: PropTypes.string,
    showSpinner: PropTypes.func,
    setNpwpReasontoNull: PropTypes.func
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

  componentDidMount = () => {
    const {navigation, setNpwpReasontoNull} = this.props;
    const referralCodeOrami = result(navigation, 'state.params.refferalCodeOrami', '');
    setNpwpReasontoNull(referralCodeOrami);
  }

  render () {
    const {ccCode} = this.props;
    return (
      <EmailForm validationInput={this.validationInput} ccFormCode={ccCode}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormPage);
