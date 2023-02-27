import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import LuckyDipInformation, {fields} from '../../components/LuckyDraw/LuckyDipInformation.component';
import {validateRequiredString, validateNumber, validateNameEform, validatePhoneNumber} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {getDataOptions} from '../../utils/middleware.util';
import sortBy from 'lodash/sortBy';
import {getProvinceList, getCityList, getDistrictList, getSubDistrictList, getLocalDataAddress} from '../../state/thunks/luckyDip.thunks';
import {NavigationActions} from 'react-navigation';

const formConfig = {
  form: 'LuckyDipInformation',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {pathRoute, reward, transRefNum}) => {
    dispatch(NavigationActions.navigate({routeName: 'LuckyDipInformationDetailPage', params: {values, pathRoute, reward, transRefNum}}));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredString(values, [fields.FULL_NAME, fields.PHONE_NUMBER, fields.PROVINCE, fields.CITY, fields.DISTRICT, fields.SUBDISTRICT,
        fields.POSTAL_CODE, fields.STREET_ADDRESS])
    };
    return {
      postalCode: validateNumber(values.postalCode),
      phoneNumber: validatePhoneNumber(values.phoneNumber),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  locationOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listLocationConfig', {})), ['label']),
  provinceList: result(state, 'provinceList', []),
  province: result(state, 'form.LuckyDipInformation.values.province.value', {}),
  city: result(state, 'form.LuckyDipInformation.values.city.value', {}),
  cityList: result(state, 'cityList', []),
  district: result(state, 'form.LuckyDipInformation.values.district', {}),
  subDistrict: result(state, 'form.LuckyDipInformation.values.subDistrict', {}),
  rt: result(state, 'form.LuckyDipInformation.values.rt', ''),
  rw: result(state, 'form.LuckyDipInformation.values.rw', ''),
  postalCode: result(state, 'form.LuckyDipInformation.values.postal', ''),
  streetAddress: result(state, 'form.LuckyDipInformation.values.address', ''),
  listDukcapil: result(state, 'listDukcapil', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
  ccCheckpointData: result(state, 'checkpoint', {}),
  luckyDipSaveAddress: result(state, 'luckyDipSaveAddress', {})
});
const mapDispatchToProps = (dispatch) => ({
  setFieldCitytoClear: () => {
    dispatch(change('LuckyDipInformation', 'city', ''));
  },
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('LuckyDipInformation', 'province', {}));
    dispatch(change('LuckyDipInformation', 'city', {}));
    dispatch(change('LuckyDipInformation', 'subDistrict', {}));
    dispatch(change('LuckyDipInformation', 'district', {}));
    dispatch(change('LuckyDipInformation', 'postalCode', ''));
  },
  setPostalCode: (code) => {
    dispatch(change('LuckyDipInformation', 'postalCode', code));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('LuckyDipInformation', 'city', {}));
    dispatch(change('LuckyDipInformation', 'district', {}));
    dispatch(change('LuckyDipInformation', 'subDistrict', {}));
    dispatch(change('LuckyDipInformation', 'postalCode', ''));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('LuckyDipInformation', 'district', {}));
    dispatch(change('LuckyDipInformation', 'subDistrict', {}));
    dispatch(change('LuckyDipInformation', 'postalCode', ''));
  },
  getDataAddress: () => {
    dispatch(getLocalDataAddress());
  }
});

const LuckyDipInformationForm = reduxForm(formConfig)(LuckyDipInformation);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(LuckyDipInformationForm);

class LuckyDipInformationPage extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    province: PropTypes.object,
    provinceList: PropTypes.array,
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
    getDataAddress: PropTypes.func,
    changeWithExistDataAddress: PropTypes.func,
    luckyDipSaveAddress: PropTypes.object
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
    } else if ('postalCode' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('province' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('city' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('fullName' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('lastName' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('streetAddressAdditional' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('phoneNumber' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('note' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentWillMount () {
    this.props.getProvinceList();
    this.props.getDataAddress();
  }
  componentDidMount () {

  }
  render () {
    const {navigation, provinceList, cityList, setProvince, getCityList, getDistrictList, districtList, getSubDistrictList, subDistrictList, ccCheckpointData} = this.props;
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    const reward = result(navigation, 'state.params.reward', '');
    const transRefNum = result(navigation, 'state.params.transRefNum', '');
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
        setFieldInputted={this.setFieldInputted}
        checkbox={this.state.checked}
        getCityList={getCityList}
        getDistrictList={getDistrictList}
        districtList={districtList}
        getSubDistrictList={getSubDistrictList}
        subDistrictList={subDistrictList}
        setZipCode={this.setPostalCode}
        ccCheckpointData={ccCheckpointData}
        pathRoute={pathRoute}
        reward={reward}
        transRefNum={transRefNum}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(LuckyDipInformationPage);
export default ConnectedFormPage;
