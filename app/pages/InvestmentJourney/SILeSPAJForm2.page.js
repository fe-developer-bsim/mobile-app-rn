import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SILForm, {fields} from '../../components/InvestmentJourney/SILeSPAJForm2.component';
import {validateNumber, validateNameEform, validatePhoneNumber, validateRequiredString, validateRtRw2, validateZipCode, validateRequiredFields} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {receiveCreditCardProvince} from '../../state/thunks/ccEform.thunks';
import {NavigationActions} from 'react-navigation';
import {saveSILDATA} from '../../state/thunks/dashboard.thunks';
import {formatFieldAccount} from '../../utils/transformer.util';


const formConfig = {
  form: 'SileSPAJForm2',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, silIdrUsd, checkboxArray) => {
    const isSilIdrUsd = result(silIdrUsd, 'isSilIdrUsd', '');
    if (isSilIdrUsd === 'IDR') {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisForm3IDR'}));
    
    } else {
      dispatch(NavigationActions.navigate({routeName: 'SmartInvestaLinkPolisForm3USD'}));
    }
    const dataCollected = {
      formName: 'SileSPAJForm2',
      dataBody: {
        checkboxArray: checkboxArray,
        province: values.province,
        city: values.city,
        postalCode: values.postalCode,
        rt: values.rt,
        rw: values.rw,
        streetAddress: values.streetAddress,
        phoneNumber: values.phoneNumber,
        mobileNumber: values.mobileNumber,
        mobileNumberWA: values.mobileNumberWA,
        email: values.email,
        cityObject: values.cityObject
      }
    };
    dispatch(saveSILDATA(dataCollected));
  },
  validate: (values) => {
    let errors = {
      ...validateRequiredString(values, [fields.PROVINCE, fields.CITY, fields.STREET_ADDRESS, fields.EMAIL])
    };
    let validationFormat = {
      ...validateRequiredFields(values, [fields.RT, fields.RW, fields.POSTAL_CODE, fields. MOBILE_NUMBER])
    };
    return {
      postalCode: validateZipCode(values.postalCode),
      mobileNumber: validatePhoneNumber(values.mobileNumber),
      rt: validateRtRw2(values.rt),
      rw: validateRtRw2(values.rw),
      ...errors,
      ...validationFormat
    };
  }
};

const mapStateToProps = (state) => ({
  province: result(state, 'form.SileSPAJForm2.values.province', {}),
  city: result(state, 'form.SileSPAJForm2.values.city', {}),
  district: result(state, 'form.SileSPAJForm2.values.district', {}),
  subDistrict: result(state, 'form.SileSPAJForm2.values.subDistrict', {}),
  rt: result(state, 'smartInvestasiLinkPolis.rt', ''),
  rw: result(state, 'smartInvestasiLinkPolis.rw', ''),
  postalCode: result(state, 'form.SileSPAJForm2.values.postal', ''),
  streetAddress: result(state, 'smartInvestasiLinkPolis.address', ''),
  subDistrictList: result(state, 'subDistrictList', []),
  ccCheckpointData: result(state, 'checkpoint', {}),
  cityList: result(state, 'cityList', []),
  email: result(state, 'form.SilIustrasiForm1.values.email', ''),
  cityListSIL: result(state, 'cityListSIL', []),
  isSilIdrUsd: result(state, 'silIdrUsd', ''),
  mobileNumberWA: result(state, 'smartInvestasiLinkPolis.noHp', ''),
});

const mapDispatchToProps = (dispatch) => ({
  setProvince: () => {
    dispatch(receiveCreditCardProvince());
  },
  setFieldCitytoClear: () => {
    dispatch(change('SileSPAJForm2', 'city', ''));
  },

  prefilledEmail: (email) => {
    dispatch(change('SileSPAJForm2', 'email', email));
  },
  
  prefilledProvince: (cityObj) => {
    const provinceName = result(cityObj, 'provinceName', '');
    dispatch(change('SileSPAJForm2', 'province', provinceName));
  },
  prefilledSetRt: (rt) => {
    dispatch(change('SileSPAJForm2', 'rt', formatFieldAccount(rt)));
  },
  prefilledSetRw: (rw) => {
    dispatch(change('SileSPAJForm2', 'rw', formatFieldAccount(rw)));
  },
  prefilledStreetAddress: (streetAddress) => {
    dispatch(change('SileSPAJForm2', 'streetAddress', streetAddress));
  },
  goToSearchableList: () => dispatch(NavigationActions.navigate({routeName: 'SILSearchableList'})),
});

const eSPAJSILForm = reduxForm(formConfig)(SILForm);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(eSPAJSILForm);

class SmartInvestaLinkForm2 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    province: PropTypes.object,
    provinceList: PropTypes.array,
    receiveCreditCardProvince: PropTypes.func,
    onvalChangeProvinceAndCity: PropTypes.func,
    city: PropTypes.object,
    cityList: PropTypes.array,
    setFieldCitytoClear: PropTypes.func,
    receiveCreditCardCity: PropTypes.func,
    setProvince: PropTypes.func,
    district: PropTypes.object,
    subDistrict: PropTypes.object,
    rt: PropTypes.string,
    rw: PropTypes.string,
    postal: PropTypes.string,
    address: PropTypes.string,
    getProvinceList: PropTypes.func,
    getDistrictList: PropTypes.func,
    getSubDistrictList: PropTypes.func,
    subDistrictList: PropTypes.array,
    setPostalCode: PropTypes.func,
    ccCheckpointData: PropTypes.object,
    setUsingKtpData: PropTypes.func,
    cityListSIL: PropTypes.array,
    prefilledEmail: PropTypes.func,
    prefilledPhone: PropTypes.func,
    prefilledProvince: PropTypes.func,
    mobileNumberWA: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    prefilledStreetAddress: PropTypes.func,
    streetAddress: PropTypes.string,
    prefilledSetRt: PropTypes.func,
    prefilledSetRw: PropTypes.func,
    goToSearchableList: PropTypes.func,
  }

  state = {
    checkboxArray: []
  }

  changeCheckboxArray = (checkbox)  => {
    this.setState({checkboxArray: checkbox});
  }

  setPostalCode = () => {
    setTimeout(() => {
      const {setPostalCode, subDistrict} = this.props;
      const zipcode = result(subDistrict, 'zipCode', '');
      setPostalCode(zipcode);
    }, 1000);
  }

  setProvinceCity = () => {
    setTimeout(() => {
      const {prefilledProvince, city} = this.props;
      prefilledProvince(city);
    }, 1000);
    
  }
  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('district' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('subDistrict' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('streetAddress' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('rt' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('rw' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('postalCode' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }  else if ('mobileNumber' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentWillMount () {
    const {email, prefilledEmail} = this.props;
    prefilledEmail(email);
    const {rt, prefilledSetRt} = this.props;
    prefilledSetRt(rt);
    const {rw, prefilledSetRw} = this.props;
    prefilledSetRw(rw);
    const {streetAddress, prefilledStreetAddress} = this.props;
    prefilledStreetAddress(streetAddress);
  }

  render () {
    const {navigation, cityList, setProvince, getDistrictList, getSubDistrictList, 
      subDistrictList, ccCheckpointData, cityListSIL, mobileNumberWA, email, goToSearchableList} = this.props;
    const dataDukcapil = result(navigation, 'state.params.dataDukcapil', {});
    const existing = result(navigation, 'state.params.existing', false);
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        cityList={cityList}
        setProvince={setProvince}
        checked={this.state.checked}
        hidden={this.state.hidden}
        toogleCheckbox={this.toogleCheckbox}
        dataDukcapil={dataDukcapil}
        setFieldInputted={this.setFieldInputted}
        checkbox={this.state.checked}
        getDistrictList={getDistrictList}
        getSubDistrictList={getSubDistrictList}
        subDistrictList={subDistrictList}
        setZipCode={this.setPostalCode}
        ccCheckpointData={ccCheckpointData}
        existing={existing}
        cityListSIL={cityListSIL}
        setProvinceCity={this.setProvinceCity}
        checkboxArray={this.state.checkboxArray}
        changeCheckboxArray={this.changeCheckboxArray}
        mobileNumberWA={mobileNumberWA}
        email={email}
        goToSearchableList={goToSearchableList}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SmartInvestaLinkForm2);
export default ConnectedFormPage;
