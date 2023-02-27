import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm9.component';
import {validateRequiredFields, validateNameEform, validateNumber, validateName} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {getDataOptions} from '../../utils/middleware.util';
import sortBy from 'lodash/sortBy';
import {createCreditCardForm, getProvinceList, getCityList, getDistrictList, getSubDistrictList} from '../../state/thunks/ccEform.thunks';
import split from 'lodash/split';

const formConfig = {
  form: 'CCForm9',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const statusForm = 'NEXT';
    const pageName = 'CreditCardDelivery';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.EMERGENCY_FULLNAME, fields.EMERGENCY_RELATIONSHIP, fields.EMERGENCY_PHONE,
        fields.EMERGENCY_PROVINCE, fields.EMERGENCY_CITY, fields.EMERGENCY_DISTRICT,
        fields.EMERGENCY_SUBDISTRICT, fields.EMERGENCY_POSTAL_CODE, fields.EMERGENCY_RT, fields.EMERGENCY_RW,
        fields.EMERGENCY_STREET_ADDRESS])
    };
    return {
      emergencyPostalCode: validateNumber(values.emergencyPostalCode),
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  locationOptions: sortBy(getDataOptions(result(state, 'configEmoney.emoneyConfig.listLocationConfig', {})), ['label']),
  emergencyProvinceList: result(state, 'listProvince2', []),
  emergencyCityList: result(state, 'listCity2', []),
  emergencyCity: result(state, 'form.CCForm9.values.emergencyCity.value', {}),
  emergencyProvince: result(state, 'form.CCForm9.values.emergencyProvince.value', {}),
  emergencyDistrict: result(state, 'form.CCForm9.values.emergencyDistrict', {}),
  emergencySubDistrict: result(state, 'form.CCForm9.values.emergencySubDistrict', {}),
  emergencyRT: result(state, 'form.CCForm9.values.emergencyRT', ''),
  emergencyRW: result(state, 'form.CCForm9.values.emergencyRW', ''),
  emergencyPostalCode: result(state, 'form.CCForm9.values.emergencyPostalCode', ''),
  emergencyStreetAddress: result(state, 'form.CCForm9.values.emergencyStreetAddress', ''),
  emergencyFullName: result(state, 'form.CCForm9.values.emergencyFullName', ''),
  emergencyRelationship: result(state, 'form.CCForm9.values.emergencyRelationship', ''),
  emergencyPhone: result(state, 'form.CCForm9.values.emergencyPhone', ''),
  emergencyList: result(state, 'configEForm.listConfigEform.relationshipEmergency', []),
  provinceList: result(state, 'provinceList', []),
  cityList: result(state, 'cityList', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', [])
});

const mapDispatchToProps = (dispatch) => ({
  setFieldCitytoClear: () => {
    dispatch(change('CCForm9', 'city', ''));
  },
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('CCForm9', 'emergencyProvince'));
    dispatch(change('CCForm9', 'emergencyCity', {}));
    dispatch(change('CCForm9', 'emergencyDistrict', {}));
    dispatch(change('CCForm9', 'emergencySubDistrict', {}));
    dispatch(change('CCForm9', 'emergencyPostalCode', {}));
    dispatch(change('CCForm9', 'emergencyRT', {}));
    dispatch(change('CCForm9', 'emergencyRW', {}));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('CCForm9', 'emergencyCity'));
    dispatch(change('CCForm9', 'emergencyDistrict', {}));
    dispatch(change('CCForm9', 'emergencySubDistrict', {}));
    dispatch(change('CCForm9', 'emergencyPostalCode', {}));
    dispatch(change('CCForm9', 'emergencyRT', {}));
    dispatch(change('CCForm9', 'emergencyRW', {}));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('CCForm9', 'emergencyDistrict'));
    dispatch(change('CCForm9', 'emergencySubDistrict', {}));
    dispatch(change('CCForm9', 'emergencyPostalCode', {}));
    dispatch(change('CCForm9', 'emergencyRT', {}));
    dispatch(change('CCForm9', 'emergencyRW', {}));
  },
  setPostalCode: (code) => {
    dispatch(change('CCForm9', 'emergencyPostalCode', code));
  },
  setCountry: () => {
    dispatch(change('CCForm9', 'companyCountry', 'Indonesia'));
  }
});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm9 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    emergencyProvince: PropTypes.object,
    emergencyProvinceList: PropTypes.array,
    onvalChangeProvinceAndCity: PropTypes.func,
    emergencyCity: PropTypes.object,
    emergencyCityList: PropTypes.array,
    setFieldCitytoClear: PropTypes.func,
    setCity: PropTypes.func,
    emergencyList: PropTypes.array,
    provinceList: PropTypes.array,
    cityList: PropTypes.array,
    districtList: PropTypes.array,
    subDistrictList: PropTypes.array,
    getProvinceList: PropTypes.func,
    getCityList: PropTypes.func,
    getDistrictList: PropTypes.func,
    getSubDistrictList: PropTypes.func,
    setPostalCode: PropTypes.func,
    emergencySubDistrict: PropTypes.object,
    setCountry: PropTypes.func
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('emergencyDistrict' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('emergencySubDistrict' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('emergencyPostalCode' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('emergencyFullName' === typeField) {
      if (isEmpty(validateNameEform(val)) || isEmpty(validateName(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  setPostalCode = () => {
    setTimeout(() => {
      const {setPostalCode, emergencySubDistrict} = this.props;
      const zipcode = result(emergencySubDistrict, 'zipCode', '');
      setPostalCode(zipcode);
    }, 1000);
  }

  componentWillMount () {
    this.props.getProvinceList();
    this.props.setCountry();
  }

  onvalChangeProvinceAndCity = () => {
    const {emergencyCity, emergencyProvince, setFieldCitytoClear} = this.props;
    this.props.setCity();
    if (split(emergencyProvince, '', 1) !== split(emergencyCity, '', 1)) {
      setFieldCitytoClear();
    }
  }

  render () {
    const {navigation, emergencyProvinceList, emergencyCityList, setCity, emergencyList, provinceList, cityList,
      districtList, subDistrictList, getCityList, getDistrictList, getSubDistrictList} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        emergencyProvinceList={emergencyProvinceList}
        emergencyCityList={emergencyCityList}
        setCity={setCity}
        onvalChangeProvinceAndCity={this.onvalChangeProvinceAndCity}
        emergencyList={emergencyList}
        provinceList={provinceList}
        cityList={cityList}
        districtList={districtList}
        subDistrictList={subDistrictList}
        getCityList={getCityList}
        getDistrictList={getDistrictList}
        getSubDistrictList={getSubDistrictList}
        setZipCode={this.setPostalCode}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm9);
export default ConnectedFormPage;
