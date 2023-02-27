import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import EmailFormComponent from '../../components/CreateNewSavingAccount/SavingEmailForm.component';
import {validateRequiredFields, validateEmail} from '../../utils/validator.util';
import {isEmpty, result} from 'lodash';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {getInterestRateSimasTara} from '../../state/thunks/savingAccount.thunks';

const formConfig = {
  form: 'EmailForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {productCode}) => {
    if (productCode.includes('SA-T')) {
      dispatch(getInterestRateSimasTara());
    } else {
      dispatch(NavigationActions.navigate({routeName: 'SavingAccountConfirmation', params: {existing: true}}));
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

const mapStateToProps = (state) => ({
  email: result(state, 'user.profile.email', ''),
  productCode: result(state, 'productCode', '')
});

const mapDispatchToProps = (dispatch) => ({
  prefilledEmail: (email) => {
    dispatch(change('EmailForm', 'email', email));
  }
});

const SavingEmailForm = reduxForm(formConfig)(EmailFormComponent);

class EmailFormPage extends Component {

  static propTypes = {
    email: PropTypes.string,
    productCode: PropTypes.string,
    showSpinner: PropTypes.func,
    hideSpinner: PropTypes.func,
    prefilledEmail: PropTypes.func,
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
    const {productCode} = this.props;
    return (
      <SavingEmailForm validationInput={this.validationInput} productCode={productCode}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailFormPage);
