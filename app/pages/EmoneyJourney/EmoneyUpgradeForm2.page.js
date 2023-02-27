import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import UpgradeForm, {fields} from '../../components/EmoneyJourney/EmoneyUpgradeForm2.component';
import {NavigationActions} from 'react-navigation';
import {validateRequiredFields, validateNameEform, validateNumber} from '../../utils/validator.util';
import {connect} from 'react-redux';
import {receiveCity, receiveProvince, getDistrictList, getSubDistrictList} from '../../state/thunks/common.thunks';
import {isEmpty, result, split} from 'lodash';

const formConfig = {
  form: 'UpgradeEmoneySecondForm',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch) => {
    dispatch(NavigationActions.navigate({routeName: 'EmoneyUpgradeForm3'}));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.PROVINCE, fields.CITY, fields.DISTRICT, fields.SUBDISTRICT, fields.ADDRESS, fields.RT, fields.RW, fields.POSTAL
      ])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  country: result(state, 'form.UpgradeEmoneySecondForm.values.country', ''),
  province: result(state, 'form.UpgradeEmoneySecondForm.values.province', {}),
  city: result(state, 'form.UpgradeEmoneySecondForm.values.city', {}),
  district: result(state, 'form.UpgradeEmoneySecondForm.values.district', ''),
  subDistrict: result(state, 'form.UpgradeEmoneySecondForm.values.subDistrict', ''),
  address: result(state, 'form.UpgradeEmoneySecondForm.values.address', ''),
  rt: result(state, 'form.UpgradeEmoneySecondForm.values.rt', ''),
  rw: result(state, 'form.UpgradeEmoneySecondForm.values.rw', ''),
  postal: result(state, 'form.UpgradeEmoneySecondForm.values.postal', ''),
  provinceList: result(state, 'listProvince', []),
  cityList: result(state, 'listCity', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
});
const mapDispatchToProps = (dispatch) => ({
  setProvince: () => { 
    dispatch(receiveProvince());
  },
  setCity: () => { 
    dispatch(receiveCity());
  },
  setFieldCitytoClear: () => {
    dispatch(change('UpgradeEmoneySecondForm', 'city', ''));
    dispatch(change('UpgradeEmoneySecondForm', 'district', ''));
    dispatch(change('UpgradeEmoneySecondForm', 'subDistrict', ''));
    dispatch(change('UpgradeEmoneySecondForm', 'postal', ''));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('UpgradeEmoneySecondForm', 'city'));
    dispatch(change('UpgradeEmoneySecondForm', 'district', {}));
    dispatch(change('UpgradeEmoneySecondForm', 'subDistrict', {}));
    dispatch(change('UpgradeEmoneySecondForm', 'postal', ''));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('UpgradeEmoneySecondForm', 'district'));
    dispatch(change('UpgradeEmoneySecondForm', 'subDistrict', {}));
    dispatch(change('UpgradeEmoneySecondForm', 'postal', ''));
  },
  setPostalCode: (code) => {
    dispatch(change('UpgradeEmoneySecondForm', 'postal', code));
  },
});

const RegisterForm = reduxForm(formConfig)(UpgradeForm);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(RegisterForm);


class EmoneyUpgradeForm2 extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    cityList: PropTypes.array,
    provinceList: PropTypes.array,
    cityListSecond: PropTypes.array,
    provinceListSecond: PropTypes.array,
    receiveCity: PropTypes.func,
    receiveCitySecond: PropTypes.func,
    setProvince: PropTypes.func,
    setCity: PropTypes.func,
    province: PropTypes.object,
    city: PropTypes.object,
    district: PropTypes.string,
    rt: PropTypes.string,
    rw: PropTypes.string,
    postal: PropTypes.string,
    subDistrict: PropTypes.string,
    setFieldCitytoClear: PropTypes.func,
    onvalChangeProvinceAndCity: PropTypes.func,
    address: PropTypes.string,
    getDistrictList: PropTypes.func,
    districtList: PropTypes.array,
    getSubDistrictList: PropTypes.func,
    subDistrictList: PropTypes.array,
    setPostalCode: PropTypes.func,
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
    } else if ('address' === typeField) {
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
    } else if ('postal' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  componentWillMount () {
    this.props.setProvince();
  }

  onvalChangeProvinceAndCity = () => {
    const {city, province, setFieldCitytoClear} = this.props;
    this.props.setCity();
    if (split(province, '', 1) !== split(city, '', 1)) {
      setFieldCitytoClear();
    }
  }

  setPostalCode = () => {
    setTimeout(() => {
      const {setPostalCode, subDistrict} = this.props;
      const zipcode = result(subDistrict, 'zipCode', '');
      setPostalCode(zipcode);
    }, 1000);
  }

  render () {
    const {navigation, provinceList, cityList, setCity, getDistrictList, districtList,
      getSubDistrictList, subDistrictList} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        provinceList={provinceList}
        cityList={cityList}
        setCity={setCity}
        onvalChangeProvinceAndCity={this.onvalChangeProvinceAndCity}
        getDistrictList={getDistrictList}
        districtList={districtList}
        getSubDistrictList={getSubDistrictList}
        subDistrictList={subDistrictList}
        setZipCode={this.setPostalCode}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(EmoneyUpgradeForm2);
export default ConnectedFormPage;
