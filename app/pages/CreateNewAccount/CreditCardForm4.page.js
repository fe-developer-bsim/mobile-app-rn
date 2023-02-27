import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, change} from 'redux-form';
import CreditCard, {fields} from '../../components/CreateNewAccount/CreditCardForm4.component';
import {validateRequiredFields, validateNumber, validateNameEform} from '../../utils/validator.util';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import result from 'lodash/result';
import {createCreditCardForm, getProvinceList, getCityList, getDistrictList, getSubDistrictList} from '../../state/thunks/ccEform.thunks';

const formConfig = {
  form: 'CCForm4',
  destroyOnUnmount: false,
  onSubmit: (values, dispatch, {navigation}) => {
    const checkpoint = result(navigation, 'state.params.checkpoint', false);
    const existing = result(navigation, 'state.params.existing', false);
    const statusForm = 'NEXT';
    const pageName = existing ? 'CreditCardForm6' : 'CreditCardForm5';
    dispatch(createCreditCardForm(statusForm, pageName, checkpoint, existing));
  },
  validate: (values) => {
    const errors = {
      ...validateRequiredFields(values, [fields.WORK_TITLE, fields.WORK_POSITION, fields.INDUSTRY, fields.COMPANY_NAME,
        fields.COMPANY_ADDRESS, fields.COMPANY_PHONE_NUMBER, fields.COMPANY_PROVINCE,
        fields.COMPANY_CITY, fields.COMPANY_DISTRICT, fields.COMPANY_SUBDISTRICT,
        fields.COMPANY_POSTAL_CODE, fields.COMPANY_RT, fields.COMPANY_RW])
    };
    return {
      ...errors,
    };
  }
};

const mapStateToProps = (state) => ({
  workTitle: result(state, 'form.CCForm4.values.workTitle', ''),
  workPosition: result(state, 'form.CCForm4.values.workPosition', ''),
  industry: result(state, 'form.CCForm4.values.industry', ''),
  companyName: result(state, 'form.CCForm4.values.companyName', ''),
  companyAddress: result(state, 'form.CCForm4.values.companyAddress', ''),
  companyPhoneNumber: result(state, 'form.CCForm4.values.companyPhoneNumber', ''),
  listPosition: result(state, 'configEForm.listConfigEform.workTitle', []),
  provinceList: result(state, 'provinceList', []),
  cityList: result(state, 'cityList', []),
  districtList: result(state, 'districtList', []),
  subDistrictList: result(state, 'subDistrictList', []),
  companySubDistrict: result(state, 'form.CCForm4.values.companySubDistrict', {}),
});

const mapDispatchToProps = (dispatch) => ({
  getProvinceList: () => {
    dispatch(getProvinceList());
  },
  getCityList: () => {
    dispatch(getCityList('CCForm4', 'companyProvince'));
    dispatch(change('CCForm4', 'companyCity', {}));
    dispatch(change('CCForm4', 'companyDistrict', {}));
    dispatch(change('CCForm4', 'companySubDistrict', {}));
    dispatch(change('CCForm4', 'companyPostalCode', {}));
    dispatch(change('CCForm4', 'companyRT', {}));
    dispatch(change('CCForm4', 'companyRW', {}));
  },
  getDistrictList: () => {
    dispatch(getDistrictList('CCForm4', 'companyCity'));
    dispatch(change('CCForm4', 'companyDistrict', {}));
    dispatch(change('CCForm4', 'companySubDistrict', {}));
    dispatch(change('CCForm4', 'companyPostalCode', {}));
    dispatch(change('CCForm4', 'companyRT', {}));
    dispatch(change('CCForm4', 'companyRW', {}));
  },
  getSubDistrictList: () => {
    dispatch(getSubDistrictList('CCForm4', 'companyDistrict'));
    dispatch(change('CCForm4', 'companySubDistrict', {}));
    dispatch(change('CCForm4', 'companyPostalCode', {}));
    dispatch(change('CCForm4', 'companyRT', {}));
    dispatch(change('CCForm4', 'companyRW', {}));
  },
  setPostalCode: (code) => {
    dispatch(change('CCForm4', 'companyPostalCode', code));
  },
  setCountry: () => {
    dispatch(change('CCForm4', 'companyCountry', 'Indonesia'));
  }
});

const CreditCardForm = reduxForm(formConfig)(CreditCard);

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

class CreditCardForm4 extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    getProvinceList: PropTypes.func,
    getCityList: PropTypes.func,
    getDistrictList: PropTypes.func,
    getSubDistrictList: PropTypes.func,
    provinceList: PropTypes.array,
    cityList: PropTypes.array,
    districtList: PropTypes.array,
    subDistrictList: PropTypes.array,
    setPostalCode: PropTypes.func,
    companySubDistrict: PropTypes.object,
    listPosition: PropTypes.array,
    setCountry: PropTypes.func
  }

  componentWillMount () {
    this.props.getProvinceList();
    this.props.setCountry();
  }

  validationInput = () => (inputProps = {}, val = '') => {
    const {typeField} = inputProps;
    if ('workTitle' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('companyName' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('companyAddress' === typeField) {
      if (isEmpty(validateNameEform(val))) {
        return true;
      } else {
        return false;
      }
    } else if ('companyPhoneNumber' === typeField) {
      if (isEmpty(validateNumber(val))) {
        return true;
      } else {
        return false;
      }
    }
  }

  setPostalCode = () => {
    setTimeout(() => {
      const {setPostalCode, companySubDistrict} = this.props;
      const zipcode = result(companySubDistrict, 'zipCode', '');
      setPostalCode(zipcode);
    }, 1000);
  }

  render () {
    const {navigation, getCityList, getDistrictList, getSubDistrictList, listPosition} = this.props;
    return (
      <ConnectedForm
        navigation={navigation}
        validationInput={this.validationInput()}
        getCityList={getCityList}
        getDistrictList={getDistrictList}
        getSubDistrictList={getSubDistrictList}
        setZipCode={this.setPostalCode}
        listPosition={listPosition}
      />
    );
  }
}

const ConnectedFormPage = connect(mapStateToProps, mapDispatchToProps)(CreditCardForm4);
export default ConnectedFormPage;
