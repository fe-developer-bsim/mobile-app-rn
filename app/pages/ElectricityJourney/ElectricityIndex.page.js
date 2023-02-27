import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ElectricityIndex from '../../components/ElectricityJourney/ElectricityIndex.component';
import {reduxForm, change} from 'redux-form';
import {connect} from 'react-redux';
import {getAmountForElectricity} from '../../state/thunks/electricityBill.thunks';
import {getFilteredBillerData} from '../../utils/transformer.util';
import {validateRequiredFields} from '../../utils/validator.util';
import result from 'lodash/result';

const formConfig = {
  form: 'ElectricityForm',
  validate: (values) => {
    const error = {};
    if (values.selectedBiller.validation) {
      const regex = new RegExp(values.selectedBiller.validation);
      regex.test(values.meterNo) ? delete error.meterNo : error.meterNo = 'Invalid MeterNo';
    }

    return {...error, ...validateRequiredFields(values, ['selectedBiller', 'meterNo'])};
  },
  onSubmit: (values, dispatch) => {
    dispatch(getAmountForElectricity(values.meterNo, values.selectedBiller));
  },
  initialValues: {
    selectedBiller: {},
    meterNo: ''
  }
};

const ElectricityIndexForm = reduxForm(formConfig)(ElectricityIndex);

class ElectricityIndexPage extends Component {
  static propTypes = {
    billers: PropTypes.array,
    updateRecentTransactions: PropTypes.func,
    billerConfig: PropTypes.object,
  }
  render () {
    const {billerConfig = {}, ...extraProps} = this.props;
    const billers = getFilteredBillerData(billerConfig, 'ELECTRICITY');
    return <ElectricityIndexForm billers={billers} {...extraProps}/>;
  }
}

const mapStateToProps = (state) => {
  const {billerConfig} = state;
  const recentTransactions = result(state, 'lastElectricityPayments.recentElectricityPayments', []);

  return {
    billerConfig,
    recentTransactions
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleCardClick: ({meterNo, biller}) => () => {
    dispatch(change('ElectricityForm', 'meterNo', meterNo));
    dispatch(change('ElectricityForm', 'selectedBiller', biller));
  }
});

const ConnectedElectricityIndexPage = connect(mapStateToProps, mapDispatchToProps)(ElectricityIndexPage);
export default ConnectedElectricityIndexPage;
