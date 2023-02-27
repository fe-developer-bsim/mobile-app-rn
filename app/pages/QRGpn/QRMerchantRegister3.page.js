import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, change} from 'redux-form';
import QRMerchantRegister from '../../components/QRGpn/QRMerchantRegister3.component';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {getTransferPossibleShariaAccounts} from '../../utils/transformer.util';
import {validateRequiredFields, validateNumber, validatePostalCodeLength, validateNameEform, validatePhoneNumber, validateNamecashier} from '../../utils/validator.util';
import {NavigationActions} from 'react-navigation';
import sortBy from 'lodash/sortBy';
import {getDataOptions} from '../../utils/middleware.util';
import {receiveCreditCardProvince, getProvinceList, getCityList, getDistrictList, getSubDistrictList} from '../../state/thunks/ccEform.thunks';
import {getParam, availStorename} from '../../state/thunks/QRGpn.thunks';
import PropTypes from 'prop-types';

const formConfig = {
  form: 'QRMerchantRegister3',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister4'})),
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, ['storeName', 'storePhone', 'postalCode', 'merchantAddress', 'storeLocation', 'ownership'])};
    return {
      postalCode: validateNumber(values.postalCode) || validatePostalCodeLength(values.postalCode),
      storePhone: validatePhoneNumber(values.storePhone) && validateNumber(values.storePhone),
      storeName: validateNamecashier(result(values, 'storeName', '')),
      ...errors
    };
  }
};

const mapStateToProps = (state) => ({
  transRefNum: result(state, 'transRefNum', 0),
  accounts: getTransferPossibleShariaAccounts(result(state, 'accounts', []), 'bp'),
  formValues: result(state, 'form.QRMerchantRegister.values', {}),
  locationOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listLocationConfig', {})), ['label']),
  provinceList: result(state, 'provinceList', []),
  province: result(state, 'form.QRMerchantRegister3.values.province.value', {}),
  city: result(state, 'form.QRMerchantRegister3.values.city.value', {}),
  cityList: result(state, 'cityList', []),
  district: result(state, 'form.QRMerchantRegister3.values.district', {}),
  subDistrict: result(state, 'form.QRMerchantRegister3.values.subDistrict', {}),
  postalCode: result(state, 'form.QRMerchantRegister3.values.postalCode', ''),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
  storeLocationList: result(state, 'getQRparams.storeLocationList', []),
  ownershipList: result(state, 'getQRparams.ownershipList', []),
  isRent: result(state, 'form.QRMerchantRegister3.values.ownership.code', ''),
  nameStatus: result(state, 'storenameAvailability.nameStatus', ''),
});

const mapDispatchToProps = (dispatch) => ({
  setProvince: () => {
    dispatch(receiveCreditCardProvince());
  },
  setFieldCitytoClear: () => {
    dispatch(change('CCForm2', 'city', ''));
  },
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('QRMerchantRegister3', 'province'));
    dispatch(change('QRMerchantRegister3', 'city', {}));
    dispatch(change('QRMerchantRegister3', 'district', {}));
    dispatch(change('QRMerchantRegister3', 'subDistrict', {}));
    dispatch(change('QRMerchantRegister3', 'postalCode', {}));
    dispatch(change('QRMerchantRegister3', 'rt', {}));
    dispatch(change('QRMerchantRegister3', 'rw', {}));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('QRMerchantRegister3', 'city'));
    dispatch(change('QRMerchantRegister3', 'district', {}));
    dispatch(change('QRMerchantRegister3', 'subDistrict', {}));
    dispatch(change('QRMerchantRegister3', 'postalCode', {}));
    dispatch(change('QRMerchantRegister3', 'rt', {}));
    dispatch(change('QRMerchantRegister3', 'rw', {}));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('QRMerchantRegister3', 'district'));
    dispatch(change('QRMerchantRegister3', 'subDistrict', {}));
    dispatch(change('QRMerchantRegister3', 'postalCode', {}));
    dispatch(change('QRMerchantRegister3', 'rt', {}));
    dispatch(change('QRMerchantRegister3', 'rw', {}));
  },
  setPostalCode: (code) => {
    dispatch(change('QRMerchantRegister3', 'postalCode', code));
  },
  getParam: () => dispatch(getParam()),
  availStorename: () => () => {
    dispatch(availStorename());
  },
  goMechant4: (isRegisterStore, isRegisterTerminal, merchantId) => dispatch(NavigationActions.navigate({routeName: 'QRMerchantRegister4', params: {isRegisterStore, isRegisterTerminal, merchantId}})),
});

const QRMerchantRegisterForm = reduxForm(formConfig)(QRMerchantRegister);

class QRMerchantRegisterPage3 extends React.Component {

  static propTypes = {
    navigation: PropTypes.object,
    QRMerchantUserPage: PropTypes.func,
    accounts: PropTypes.array,
    formValues: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    setProvince: PropTypes.func,
    setFieldCitytoClear: PropTypes.func,
    getProvinceList: PropTypes.func,
    getCityList: PropTypes.func,
    getDistrictList: PropTypes.func,
    getSubDistrictList: PropTypes.func,
    setPostalCode: PropTypes.func,
    province: PropTypes.object,
    provinceList: PropTypes.array,
    receiveCreditCardProvince: PropTypes.func,
    onvalChangeProvinceAndCity: PropTypes.func,
    city: PropTypes.object,
    cityList: PropTypes.array,
    receiveCreditCardCity: PropTypes.func,
    district: PropTypes.object,
    subDistrict: PropTypes.object,
    rt: PropTypes.string,
    rw: PropTypes.string,
    postal: PropTypes.string,
    address: PropTypes.string,
    listDukcapil: PropTypes.array,
    checkbox: PropTypes.bool,
    districtList: PropTypes.array,
    subDistrictList: PropTypes.array,
    ccCheckpointData: PropTypes.object,
    setUsingKtpData: PropTypes.func,
    storeLocationList: PropTypes.array,
    ownershipList: PropTypes.array,
    getParam: PropTypes.func,
    goMechant4: PropTypes.func,
    isRent: PropTypes.bool,
    availStorename: PropTypes.func,
    nameStatus: PropTypes.bool,
  };

  setPostalCode = () => {
    setTimeout(() => {
      const {setPostalCode, subDistrict} = this.props;
      const zipcode = result(subDistrict, 'zipCode', '');
      setPostalCode(zipcode);
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
    }
  }

  componentWillMount () {
    this.props.setProvince();
    this.props.getProvinceList();
  }
  componentDidMount () {
    this.props.getParam();
  }
  render () {
    const {accounts, formValues, navigation = {}, QRMerchantUserPage, provinceList, cityList, setProvince, getCityList, getDistrictList, districtList, getSubDistrictList, subDistrictList, ccCheckpointData, storeLocationList, ownershipList, getParam, goMechant4, isRent, availStorename, nameStatus} = this.props;
    return <QRMerchantRegisterForm navigation={navigation} QRMerchantUserPage={QRMerchantUserPage} accounts={accounts} formValues={formValues}         validationInput={this.validationInput()}
      provinceList={provinceList}
      cityList={cityList}
      setProvince={setProvince}
      toogleCheckbox={this.toogleCheckbox}
      setFieldInputted={this.setFieldInputted}
      getCityList={getCityList}
      getDistrictList={getDistrictList}
      districtList={districtList}
      getSubDistrictList={getSubDistrictList}
      subDistrictList={subDistrictList}
      setZipCode={this.setPostalCode}
      ccCheckpointData={ccCheckpointData}
      storeLocationList={storeLocationList}
      ownershipList={ownershipList}
      getParam={getParam}
      goMechant4={goMechant4}
      isRent={isRent}
      availStorename={availStorename}
      nameStatus={nameStatus}/>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRMerchantRegisterPage3);
