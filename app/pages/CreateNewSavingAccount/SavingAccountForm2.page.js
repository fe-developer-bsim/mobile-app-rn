import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import SavingAccount, {fields} from '../../components/CreateNewSavingAccount/SavingAccountForm2.component';
import {validateRequiredFields, validateNumber, validateNameEform} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {getDataOptions} from '../../utils/middleware.util';
import sortBy from 'lodash/sortBy';
import {receiveCreditCardProvince, getProvinceList, getCityList, getDistrictList, getSubDistrictList, prefilledFromDukcapil} from '../../state/thunks/savingAccount.thunks';
import {saveCheckpoint} from '../../state/actions/index.actions';

const formConfig = {
  form: 'SavingForm2',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation, checkbox, ccCheckpointData}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    dispatch(change('SavingForm2', 'usingKtpData', checkbox));
    const newData = {...ccCheckpointData, statusAddress: checkbox ? 'CHECKED' : 'UNCHECKED'};
    checkpoint && dispatch(saveCheckpoint(newData));
    dispatch(prefilledFromDukcapil(navigation));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.PROVINCE, fields.CITY, fields.DISTRICT, fields.SUBDISTRICT,
        fields.POSTAL_CODE, fields.RT, fields.RW, fields.STREET_ADDRESS])
    };
    return {
      postalCode: validateNumber(values.postalCode),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  locationOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listLocationConfig', {})), ['label']),
  provinceList: result(state, 'provinceList', []),
  province: result(state, 'form.SavingForm2.values.province.value', {}),
  city: result(state, 'form.SavingForm2.values.city.value', {}),
  cityList: result(state, 'cityList', []),
  district: result(state, 'form.SavingForm2.values.district', {}),
  subDistrict: result(state, 'form.SavingForm2.values.subDistrict', {}),
  rt: result(state, 'form.SavingForm2.values.rt', ''),
  rw: result(state, 'form.SavingForm2.values.rw', ''),
  postalCode: result(state, 'form.SavingForm2.values.postal', ''),
  streetAddress: result(state, 'form.SavingForm2.values.address', ''),
  listDukcapil: result(state, 'listDukcapil', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
  ccCheckpointData: result(state, 'checkpoint', {}),
});

const mapDispatchToProps = (dispatch) => ({
  setProvince: () => {
    dispatch(receiveCreditCardProvince());
  },
  setFieldCitytoClear: () => {
    dispatch(change('SavingForm2', 'city', ''));
  },
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('SavingForm2', 'province'));
    dispatch(change('SavingForm2', 'city', {}));
    dispatch(change('SavingForm2', 'district', {}));
    dispatch(change('SavingForm2', 'subDistrict', {}));
    dispatch(change('SavingForm2', 'postalCode', {}));
    dispatch(change('SavingForm2', 'rt', {}));
    dispatch(change('SavingForm2', 'rw', {}));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('SavingForm2', 'city'));
    dispatch(change('SavingForm2', 'district', {}));
    dispatch(change('SavingForm2', 'subDistrict', {}));
    dispatch(change('SavingForm2', 'postalCode', {}));
    dispatch(change('SavingForm2', 'rt', {}));
    dispatch(change('SavingForm2', 'rw', {}));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('SavingForm2', 'district'));
    dispatch(change('SavingForm2', 'subDistrict', {}));
    dispatch(change('SavingForm2', 'postalCode', {}));
    dispatch(change('SavingForm2', 'rt', {}));
    dispatch(change('SavingForm2', 'rw', {}));
  },
  setPostalCode: (code) => {
    dispatch(change('SavingForm2', 'postalCode', code));
  },
  setUsingKtpData: (checked) => {
    dispatch(change('SavingForm2', 'usingKtpData', checked));
  },
  setCountry: () => {
    dispatch(change('SavingForm2', 'country', 'Indonesia'));
  }
});

const SavingAccountForm = reduxForm(formConfig)(SavingAccount);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm);

class SavingAccountForm2 extends Component {

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
    listDukcapil: PropTypes.array,
    checkbox: PropTypes.bool,
    getProvinceList: PropTypes.func,
    getCityList: PropTypes.func,
    getDistrictList: PropTypes.func,
    districtList: PropTypes.array,
    getSubDistrictList: PropTypes.func,
    subDistrictList: PropTypes.array,
    setPostalCode: PropTypes.func,
    ccCheckpointData: PropTypes.object,
    setUsingKtpData: PropTypes.func,
    setCountry: PropTypes.func
  }

  state = {
    checked: true,
    hidden: true,
  }

  toogleCheckbox = (checked) => {
    this.setState({checked, hidden: checked});
  }

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
    const {ccCheckpointData, setUsingKtpData, navigation} = this.props;
    const existing = result(navigation, 'state.params.existing', false);
    const usingKtpData = result(ccCheckpointData, 'statusAddress', 'CHECKED');
    const checked = existing ? false : usingKtpData === 'CHECKED';
    setUsingKtpData(checked);
    this.setState({checked, hidden: checked});
    this.props.setProvince();
    this.props.getProvinceList();
    this.props.setCountry();
  }

  render () {
    const {navigation, provinceList, cityList, setProvince, getCityList, getDistrictList, districtList, getSubDistrictList, subDistrictList, ccCheckpointData} = this.props;
    const dataDukcapil = result(navigation, 'state.params.dataDukcapil', {});
    const existing = result(navigation, 'state.params.existing', false);
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        provinceList={provinceList}
        cityList={cityList}
        setProvince={setProvince}
        checked={this.state.checked}
        hidden={this.state.hidden}
        toogleCheckbox={this.toogleCheckbox}
        dataDukcapil={dataDukcapil}
        setFieldInputted={this.setFieldInputted}
        checkbox={this.state.checked}
        getCityList={getCityList}
        getDistrictList={getDistrictList}
        districtList={districtList}
        getSubDistrictList={getSubDistrictList}
        subDistrictList={subDistrictList}
        setZipCode={this.setPostalCode}
        ccCheckpointData={ccCheckpointData}
        existing={existing}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(SavingAccountForm2);
export default ConnectedFormPage;
