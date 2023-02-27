import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TravelInsuranceFormConfirm from '../../components/Insurance/TravelInsuranceFormConfirm.component';
import {connect} from 'react-redux';
import result from 'lodash/result';
import {reduxForm} from 'redux-form';
import {TravelResult, OTPtoResult} from '../../state/thunks/Insurance.thunks';
import {language} from '../../config/language';

const formConfig = {
  form: 'TravelConfirm',
  destroyOnUnmount: false,
  onSubmit: (_, dispatch, {triggerAuth, confirmData}) => {
    triggerAuth(confirmData);
  },
};

const TravelConfirm = reduxForm(formConfig)(TravelInsuranceFormConfirm);

const mapDispatchToProps = (dispatch) => ({
  triggerAuth: (onSubmit) => {
    dispatch(OTPtoResult(onSubmit));
  },
  confirmData: () => dispatch(TravelResult()),
});

const mapStateToProps = (state) => ({
  dataDisplay: result(state, 'insuranceDataTravel.DATATRAVEL.dataDisplay', {}),
  party: result(state, 'insuranceAddParty', {}),
});

class TravelAssuranceConfirm extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    confirmPA: PropTypes.func,
    confirmData: PropTypes.func,
    triggerAuth: PropTypes.func,
    planPage: PropTypes.func,
    detailPage: PropTypes.func,
    planHeader: PropTypes.object,
    travelHeader: PropTypes.object,
    party: PropTypes.object,
    dataDisplay: PropTypes.object,
    resetToHome: PropTypes.func,
  }

  render () {
    const {navigation = {}, planPage, detailPage, confirmPA,  party, dataDisplay} = this.props;
    const navParams = result(navigation, 'state.params', {});
    const planDisplay = {header: language.TRAVEL_INSURANCE__INSURANCE_HEADER, subHeader: language.TRAVEL_INSURANCE__INSURANCE_TYPE};
    const travelDisplay = {header: language.TRAVEL_INSURANCE__TRAVEL_PLAN, subHeader: language.TRAVEL_INSURANCE__TRAVEL_DATE};
    const beneficiaryDisplay = {BeneficiaryRelationship: language.TRAVEL_INSURANCE__BENEFICIARY_RELATIONSHIP, BeneficiaryPercentage: language.TRAVEL_INSURANCE__BENEFICIARY_PERCENTAGE, BeneficiaryName: language.TRAVEL_INSURANCE__BENEFICIARY_NAME};
    const customerDisplay = {HandPhone: language.FORM__HANDPHONE, CustName: language.GENERIC__NAME, InsuredIdNo: language.TRAVEL_INSURANCE__ID_NO, Gender: language.FORM__GENDER, DateOfBirth: language.FORM__DATE_OF_BIRTH, Status: language.FORM__STATUS, PhoneNo: language.FORM__HOME_PHONE, Email: language.FORM__EMAIL, CustAddress: language.FORM__ADDRESS, City: language.FORM__CITY, ZipCode: language.FORM__ZIP_CODE};
    const headerDisplay = {planDisplay, travelDisplay, beneficiaryDisplay, customerDisplay};
    return <TravelConfirm {...this.props} confirmPA={confirmPA} navParams={navParams} planPage={planPage} detailPage={detailPage} party={party} dataDisplay={dataDisplay} headerDisplay={headerDisplay}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TravelAssuranceConfirm);
