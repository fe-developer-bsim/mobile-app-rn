import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import FormFillAlfaAddress, {fields} from '../../components/OnboardingJourney/FormFillAlfaAddress.component';
import {validateRequiredString, validateNumber, validateNameEform, validatePhoneNumber, validateEmail} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import lowerCase from 'lodash/lowerCase';
import result from 'lodash/result';
import {getDataOptions} from '../../utils/middleware.util';
import sortBy from 'lodash/sortBy';
import {goToAddAddressALfacart, listaddressAlfa, getProvinceList, getCityList, getDistrictList, getSubDistrictList} from '../../state/thunks/digitalStore.thunks';

const formConfig = {
  form: 'FormFillAlfaAddress',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {checked, isEdit, isNew}) => {
    if (isEmpty(isEdit)) {
      dispatch(goToAddAddressALfacart(values, checked, false, isNew));
    } else {
      dispatch(goToAddAddressALfacart(values, checked, true));
    }
  },

  validate: (values) => {
    const errors = {
      ...validateRequiredString(values, [fields.FULL_NAME, fields.PHONE_NUMBER, fields.PROVINCE, fields.CITY, fields.DISTRICT, fields.SUBDISTRICT,
        fields.POSTAL_CODE, fields.STREET_ADDRESS, fields.SET_AS, fields.EMAIL])
    };
    return {
      postalCode: validateNumber(values.postalCode),
      phoneNumber: validatePhoneNumber(values.phoneNumber),
      email: validateEmail(values.email),

      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  locationOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listLocationConfig', {})), ['label']),
  provinceList: result(state, 'provinceList', []),
  province: result(state, 'form.FormFillAlfaAddress.values.province.value', {}),
  city: result(state, 'form.FormFillAlfaAddress.values.city.value', {}),
  cityList: result(state, 'cityList', []),
  district: result(state, 'form.FormFillAlfaAddress.values.district', {}),
  subDistrict: result(state, 'form.FormFillAlfaAddress.values.subDistrict', {}),
  rt: result(state, 'form.FormFillAlfaAddress.values.rt', ''),
  rw: result(state, 'form.FormFillAlfaAddress.values.rw', ''),
  postalCode: result(state, 'form.FormFillAlfaAddress.values.postal', ''),
  streetAddress: result(state, 'form.FormFillAlfaAddress.values.address', ''),
  listDukcapil: result(state, 'listDukcapil', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
  ccCheckpointData: result(state, 'checkpoint', {}),
  luckyDipSaveAddress: result(state, 'luckyDipSaveAddress', {})
});
const mapDispatchToProps = (dispatch) => ({
  setFieldCitytoClear: () => {
    dispatch(change('FormFillAlfaAddress', 'city', ''));
  },
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('FormFillAlfaAddress', 'province', {}));
    dispatch(change('FormFillAlfaAddress', 'city', {}));
    dispatch(change('FormFillAlfaAddress', 'subDistrict', {}));
    dispatch(change('FormFillAlfaAddress', 'district', {}));
    dispatch(change('FormFillAlfaAddress', 'postalCode', ''));
  },
  setPostalCode: (code) => {
    dispatch(change('FormFillAlfaAddress', 'postalCode', code));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('FormFillAlfaAddress', 'city', {}));
    dispatch(change('FormFillAlfaAddress', 'district', {}));
    dispatch(change('FormFillAlfaAddress', 'subDistrict', {}));
    dispatch(change('FormFillAlfaAddress', 'postalCode', ''));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('FormFillAlfaAddress', 'district', {}));
    dispatch(change('FormFillAlfaAddress', 'subDistrict', {}));
    dispatch(change('FormFillAlfaAddress', 'postalCode', ''));
  },
  goToShipping: () => {
    dispatch(listaddressAlfa());
  },
});

const FillAlfaAddress = reduxForm(formConfig)(FormFillAlfaAddress);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(FillAlfaAddress);

class FormFillAlfaAddressPage extends Component {

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
    } else if ('email' === typeField) {
      if (isEmpty(validateEmail(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  componentWillMount () {
    const {navigation} = this.props;
    const isEdit = result(navigation, 'state.params.isEdit', '');
    if (lowerCase(isEdit) === 'yes') {
      this.setState({checked: true});
    } else {
      this.setState({checked: true});
    }
    this.props.getProvinceList();
  }
  componentDidMount () {

  }
  render () {
    const {navigation, provinceList, cityList, setProvince, getCityList, getDistrictList, districtList, getSubDistrictList, subDistrictList, ccCheckpointData} = this.props;
    const pathRoute = result(navigation, 'state.params.pathRoute', '');
    const reward = result(navigation, 'state.params.reward', '');
    const transRefNum = result(navigation, 'state.params.transRefNum', '');
    const isEdit = result(navigation, 'state.params.isEdit', '');
    const isNew = result(navigation, 'state.params.isNew', false);
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
        isEdit={isEdit}
        isNew={isNew}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(FormFillAlfaAddressPage);
export default ConnectedFormPage;
