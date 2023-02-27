import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm} from 'redux-form';
import UpgradeForm, {fields} from '../../components/EmoneyJourney/EmoneyUpgradeForm3.component';
import {validateRequiredFields, validateNameEform} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {getListOptions} from '../../utils/middleware.util';
import {sortBy, isEmpty, result} from 'lodash';
import {showSpinner, hideSpinner} from '../../state/actions/index.actions';
import {triggerAuthNavigate, upgradeEmoneyKyc} from '../../state/thunks/common.thunks';

const formConfig = {
  form: 'UpgradeEmoneyThirdForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {upgradeKYC}) => {
    const currentAmount = '0';
    const params = {onSubmit: upgradeKYC, currentAmount, isEasypin: true, shouldSendSmsOtp: false, isOtp: false};
    dispatch(triggerAuthNavigate('UpgradeEmoney', null, false, 'AuthEmoney', params));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.WORK, fields.INCOME, fields.FUND])
    };
    return {
      fund: validateNameEform(values.fund),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  jobOptions: sortBy(getListOptions(result(state, 'configEmoney.emoneyConfig.listJobConfig', {})), ['id']),
  salaryOptions: sortBy(getListOptions(result(state, 'configEmoney.emoneyConfig.listSalaryRangeConfig', {})), ['id']),
});


const mapDispatchToProps = (dispatch) => ({
  showSpinner: () => {
    dispatch(showSpinner());
  },
  hideSpinner: () => {
    dispatch(hideSpinner());
  },
  triggerAuth: (params) => {
    dispatch(triggerAuthNavigate('UpgradeEmoney', null, false, 'AuthEmoney', params));
  },
  upgradeKYC: (dataId) => {
    dispatch(upgradeEmoneyKyc(dataId));
  }
});


const RegisterForm = reduxForm(formConfig)(UpgradeForm);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);


class EmoneyUpgradeForm3 extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    jobOptions: PropTypes.array,
    salaryOptions: PropTypes.array,
    hideSpinner: PropTypes.func,
    showSpinner: PropTypes.func,
    upgradeKYC: PropTypes.func
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('fund' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  render () {
    const {navigation, salaryOptions, jobOptions, upgradeKYC} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        salaryOptions={salaryOptions}
        jobOptions={jobOptions}
        upgradeKYC={upgradeKYC}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeForm3);
export default ConnectedFormPage;
