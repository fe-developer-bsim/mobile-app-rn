import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelInsuranceFormCustomers from '../../components/Insurance/TravelInsuranceFormCustomers.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {validateRequiredFields, validateEmail, validateName, validateRequiredString, validatePhoneNumber, validateZipCode, validateNumber} from '../../utils/validator.util';
import {reduxForm, change} from 'redux-form';
import {TravelDetail, addParty, TravelInsuranceEmptyFields} from '../../state/thunks/Insurance.thunks';

const formConfig = {
  form: 'travelCustomer',
  destroyOnUnmount: false,
  validate: (values) => {
    let errors = {
      ...validateRequiredFields(values, ['IdType', 'Status', 'InsuredIdNo', 'Gender', 'CustAddress', 'City']),
      ...validateRequiredString(values, ['DateOfBirth'])
    };
    return {
      ...errors,
      Email: validateEmail(result(values, 'Email', '')),
      CustName: validateName(result(values, 'CustName', '')),
      HandPhone: validatePhoneNumber(result(values, 'HandPhone', '')),
      PhoneNo: validateNumber(result(values, 'PhoneNo', '')),
      ZipCode: validateZipCode(result(values, 'ZipCode', '')),
    };
    
  },
  onSubmit: (values, _, {navParams, addParty}) => {
    const index = result(navParams, 'index', '');
    const data = {index, values};
    addParty(data);
  }
};

const DecorateCustomer = reduxForm(formConfig)(TravelInsuranceFormCustomers);

class TravelAssuranceFormCustomers extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    planPage: PropTypes.func,
    detailPage: PropTypes.func,
    addParty: PropTypes.func,
    getPartyData: PropTypes.func,
    filterInsured: PropTypes.func,
    dispatchField: PropTypes.func,
    loadForm: PropTypes.func,
    isEmptyField: PropTypes.func,
    party: PropTypes.object,
    filterIdInsured: PropTypes.func,
    formValues: PropTypes.object,
    formData: PropTypes.object,
    dataDisplay: PropTypes.object,
  }

  getPartyData = (party, index) => result(party, index, {})

  render () {
    const {navigation = {}, planPage, detailPage, addParty, isEmptyField, party, formValues, dispatchField, dataDisplay} = this.props;
    const navParams = result(navigation, 'state.params', {});
    return <DecorateCustomer  navParams={navParams} planPage={planPage} detailPage={detailPage} addParty={addParty} isEmptyField={isEmptyField} party={party} filterIdInsured={this.filterIdInsured} filterInsured={this.filterInsured} formValues={formValues}
      getPartyData={this.getPartyData} dispatchField={dispatchField} dataDisplay={dataDisplay}
    />;
  }
}

const mapStateToProps = (state) => ({
  payeeDisabled: result(state, 'form.travelCustomer.values.payeeNameDisabled', false),
  party: result(state, 'insuranceAddParty', {}),
  formValues: result(state, 'form.travelCustomer.values', {}),
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
});

const mapDispatchToProps = (dispatch) => ({
  detailPage: () => dispatch(TravelDetail()),
  addParty: (data) => dispatch(addParty(data)),
  getPartyData: (party, index) => result(party, index, {}),
  dispatchField: (fieldKey, value) => dispatch(change('travelCustomer', fieldKey, value)),
  isEmptyField: () => dispatch(TravelInsuranceEmptyFields()),
});

const ConnectedTravelDetail = connect(mapStateToProps, mapDispatchToProps)(TravelAssuranceFormCustomers);

export default ConnectedTravelDetail;
