import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import UpgradeForm, {fields} from '../../components/EmoneyJourney/EmoneyUpgradeForm1.component';
import {validateRequiredFields, validateRequiredString, validateNumber, validateNameEform, validateIdNumber} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {getDataOptions} from '../../utils/middleware.util';
import sortBy from 'lodash/sortBy';
import {setMaritalStatus} from '../../state/thunks/common.thunks';
import {checkKtpDukcapil} from '../../state/thunks/emoney.thunks';

const formConfig = {
  form: 'UpgradeEmoneyForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(checkKtpDukcapil());
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.MARITAL_STATUS, fields.ID_CARD_NUMBER, fields.MOTHER_MAIDEN_NAME])
    };
    const validationFormat = {
      ...validateRequiredString(values, [fields.BIRTH_DATE])
    };
    return {
      fullName: validateNameEform(values.fullName),
      idCardNumber: validateIdNumber(values.idCardNumber),
      motherMaidenName: validateNameEform(values.motherMaidenName),
      ...validationFormat,
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  genderOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listGenderConfig', {})), ['label']),
  maritalStatusOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listMaritalStatusConfig', {})), ['label']),
  maritalStatusFiltered: result(state, 'maritalStatus', []),
});

const mapDispatchToProps = (dispatch) => ({
  filteredStatus: () => dispatch(setMaritalStatus())
});

const RegisterForm = reduxForm(formConfig)(UpgradeForm);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

class EmoneyUpgradeForm extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    maritalStatusOptions: PropTypes.array,
    maritalStatusFiltered: PropTypes.array,
    filteredStatus: PropTypes.func,
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('idNumber' === typeField) {
      if (isEmpty(validateNumber(val) || validateIdNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('mothersMaiden' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, maritalStatusOptions, filteredStatus} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        statusOptions={maritalStatusOptions}
        filteredStatus={filteredStatus}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeForm);
export default ConnectedFormPage;
